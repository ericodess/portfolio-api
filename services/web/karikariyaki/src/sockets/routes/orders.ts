import { Socket } from "socket.io";
import { EventOrderCreatableParams } from "karikarihelper";

// Types
import { OrderStatus } from "@enums";
import { InHouseError } from "@types";
import { EventErrors, OrderErrors } from "@models";

// Services
import {
    DateService,
    EventService,
    OrderService,
    ResponseService,
} from "@services";

// Sockets
import { PrompterSocket, RejiSocket } from "@sockets";

const createOrder = (socket: Socket) =>
    socket.on("orders:create", async (values: EventOrderCreatableParams) => {
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

            const eventDate = foundEvent.date;

            if (DateService.isToday(eventDate) === false) {
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
                "orders:error",
                ResponseService.generateFailedResponse(error.message)
            );
        }
    });

const editOrder = (socket: Socket) =>
    socket.on("orders:edit", () => {
        socket.emit(
            "orders:refresh",
            ResponseService.generateSucessfulResponse(null)
        );
    });

export { createOrder, editOrder };
