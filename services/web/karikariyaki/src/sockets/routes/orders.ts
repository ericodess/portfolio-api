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
import { EventService, OrderService, ResponseService } from "@services";

// Sockets
import { PrompterSocket, RejiSocket } from "@sockets";

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

            const eventOrders = await OrderService.query({
                eventId: eventId,
                realmId: realmId,
            });

            RejiSocket.namespace
                .to(`event/${eventId}/${realmId}`)
                .emit(
                    "orders:refresh",
                    ResponseService.generateSucessfulResponse(eventOrders)
                );
            PrompterSocket.namespace
                .to(`event/${eventId}/${realmId}`)
                .emit(
                    "orders:refresh",
                    ResponseService.generateSucessfulResponse(eventOrders)
                );
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

                const eventOrders = await OrderService.query({
                    eventId: eventId,
                    realmId: realmId,
                });

                RejiSocket.namespace
                    .to(`event/${eventId}/${realmId}`)
                    .emit(
                        "orders:refresh",
                        ResponseService.generateSucessfulResponse(eventOrders)
                    );
            } catch (error) {
                socket.emit(
                    "order:error",
                    ResponseService.generateFailedResponse(error.message)
                );
            }
        }
    );

export { createOrder, editOrder };
