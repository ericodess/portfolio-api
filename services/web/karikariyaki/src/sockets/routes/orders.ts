import { Socket } from "socket.io";
import {
    EventOrderCreatableParams,
    EventOrderEditableParams,
    EventOrderQueryableParams,
    Operator,
} from "karikarihelper";

// Types
import { OrderStatus } from "@enums";
import { InHouseError } from "@types";
import { EventErrors, OrderErrors } from "@models";

// Services
import {
    EventService,
    OrderService,
    ResponseService,
    SocketService,
} from "@services";

const createOrder = (socket: Socket) =>
    socket.on("order:create", async (values: EventOrderCreatableParams) => {
        const operator = socket.data.operator as Operator;
        const eventId = socket.data.eventId;
        const itemsIds = values.itemsId;
        const clientName = values.clientName;

        try {
            if (!operator || !eventId || !clientName || itemsIds.length === 0) {
                throw new InHouseError(OrderErrors.INVALID);
            }

            const foundEvent = await EventService.queryById(eventId);

            if (!foundEvent) {
                throw new InHouseError(EventErrors.NOT_FOUND);
            }

            if (foundEvent.isOpen === false) {
                throw new InHouseError(EventErrors.NOT_ACTIVE);
            }

            await OrderService.save(operator, {
                eventId: eventId,
                status: OrderStatus.COOKING,
                clientName: clientName,
                itemsId: itemsIds,
            });

            await SocketService.refreshOrders(eventId, operator);
        } catch (error) {
            socket.emit(
                "order:error",
                ResponseService.generateFailedResponse(error.message)
            );
        }
    });

const deleteOrder = (socket: Socket) =>
    socket.on("order:delete", async (id: string) => {
        const operator = socket.data.operator as Operator;
        const eventId = socket.data.eventId;

        try {
            if (!operator || !eventId) {
                throw new InHouseError(OrderErrors.INVALID);
            }

            const foundEvent = await EventService.queryById(eventId);

            if (!foundEvent) {
                throw new InHouseError(EventErrors.NOT_FOUND);
            }

            if (foundEvent.isOpen === false) {
                throw new InHouseError(EventErrors.NOT_ACTIVE);
            }

            const foundOrder = await OrderService.queryById(id);

            if (!foundOrder) {
                throw new InHouseError(OrderErrors.NOT_FOUND);
            }

            if (foundOrder.status !== OrderStatus.COOKING) {
                throw new InHouseError(OrderErrors.INVALID);
            }

            await OrderService.delete(operator, id);

            await SocketService.refreshOrders(eventId, operator);

            await SocketService.refreshOrder(id);
        } catch (error) {
            socket.emit(
                "order:error",
                ResponseService.generateFailedResponse(error.message)
            );
        }
    });

const editOrder = (socket: Socket) =>
    socket.on(
        "order:edit",
        async (order: { id: string; values: EventOrderEditableParams }) => {
            const operator = socket.data.operator as Operator;
            const eventId = socket.data.eventId;

            try {
                if (!operator || !eventId) {
                    throw new InHouseError(OrderErrors.INVALID);
                }

                const foundEvent = await EventService.queryById(eventId);

                if (!foundEvent) {
                    throw new InHouseError(EventErrors.NOT_FOUND);
                }

                if (foundEvent.isOpen === false) {
                    throw new InHouseError(EventErrors.NOT_ACTIVE);
                }

                const foundOrder = await OrderService.queryById(order.id);

                if (!foundOrder) {
                    throw new InHouseError(OrderErrors.NOT_FOUND);
                }

                if (foundOrder.status === OrderStatus.PICKED_UP) {
                    throw new InHouseError(OrderErrors.PICKED_UP);
                }

                await OrderService.update(operator, order.id, order.values);

                await SocketService.refreshOrders(eventId, operator);

                await SocketService.refreshOrder(order.id);
            } catch (error) {
                socket.emit(
                    "order:error",
                    ResponseService.generateFailedResponse(error.message)
                );
            }
        }
    );

const joinOrder = (socket: Socket) => {
    socket.on("order:join", async (id: string) => {
        try {
            const foundOrder = await OrderService.queryById(id);

            if (!foundOrder) {
                throw new InHouseError(OrderErrors.NOT_FOUND);
            }

            SocketService.leaveRooms(socket, "event");

            socket.join(
                `event/${foundOrder.event._id.toString()}/${foundOrder.realm._id.toString()}/${foundOrder._id.toString()}`
            );

            socket.emit(
                "order:refresh",
                ResponseService.generateSucessfulResponse(foundOrder)
            );
        } catch (error) {
            socket.emit(
                "order:error",
                ResponseService.generateFailedResponse(error.message)
            );
        }
    });
};

export { createOrder, deleteOrder, editOrder, joinOrder };
