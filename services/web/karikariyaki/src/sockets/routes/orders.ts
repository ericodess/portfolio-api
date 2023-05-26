import { Socket } from "socket.io";
import { EventOrderCreatableParams } from "karikarihelper";

// Types
import { OrderStatus } from "@enums";

// Services
import { OrderService, ResponseService, SocketService } from "@services";

const createOrder = (socket: Socket) =>
    socket.on("orders:create", (values: EventOrderCreatableParams) => {
        const realmId = socket.data.realmId;
        const eventId = socket.data.eventId;
        const operatorId = socket.data.operatorId;
        const itemsIds = values.itemsId;
        const clientName = values.clientName;

        if (
            !eventId ||
            !realmId ||
            !operatorId ||
            !clientName ||
            itemsIds.length === 0
        ) {
            return;
        }

        OrderService.save({
            eventId: eventId,
            status: OrderStatus.COOKING,
            operatorId: operatorId,
            clientName: clientName,
            itemsId: itemsIds,
        })
            .then(() => {
                OrderService.query({
                    eventId: eventId,
                    realmId: realmId,
                })
                    .then((eventOrders) => {
                        socket.data.eventId = eventId;

                        socket.emit(
                            "orders:refresh",
                            ResponseService.generateSucessfulResponse(
                                eventOrders
                            )
                        );
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    });

const editOrder = (socket: Socket) =>
    socket.on("orders:edit", () => {
        socket.emit(
            "orders:refresh",
            ResponseService.generateSucessfulResponse(null)
        );
    });

export { createOrder, editOrder };
