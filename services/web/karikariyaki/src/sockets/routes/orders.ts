import { Socket } from "socket.io";
import {
    EventOrderCreatableParams,
    EventOrderEditableParams,
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
        const realmId = socket.data.realmId;
        const eventId = socket.data.eventId;
        const operatorId = socket.data.operatorId;
        const itemsIds = values.itemsId;
        const clientName = values.clientName;

        try {
            if (
                !eventId ||
                !realmId ||
                !operatorId ||
                !clientName ||
                itemsIds.length === 0
            ) {
                throw new InHouseError(OrderErrors.INVALID);
            }

            const foundEvent = await EventService.queryById(eventId);

            if (!foundEvent) {
                throw new InHouseError(EventErrors.NOT_FOUND);
            }

            if (foundEvent.isOpen === false) {
                throw new InHouseError(EventErrors.NOT_ACTIVE);
            }

            await OrderService.save({
                eventId: eventId,
                status: OrderStatus.COOKING,
                operatorId: operatorId,
                clientName: clientName,
                itemsId: itemsIds,
            });

            await SocketService.refreshOrders(eventId, realmId);
        } catch (error) {
            socket.emit(
                "order:error",
                ResponseService.generateFailedResponse(error.message)
            );
        }
    });

const deleteOrder = (socket: Socket) =>
    socket.on("order:delete", async (id: string) => {
        const realmId = socket.data.realmId;
        const eventId = socket.data.eventId;

        try {
            if (!eventId || !realmId) {
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

            await OrderService.delete(id);

            await SocketService.refreshOrders(eventId, realmId);
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
            const realmId = socket.data.realmId;
            const eventId = socket.data.eventId;

            try {
                if (!eventId || !realmId) {
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

                await OrderService.update(order.id, order.values);

                await SocketService.refreshOrders(eventId, realmId);
            } catch (error) {
                socket.emit(
                    "order:error",
                    ResponseService.generateFailedResponse(error.message)
                );
            }
        }
    );

export { createOrder, deleteOrder, editOrder };
