import { Namespace, Socket } from "socket.io";

// Types
import { EventCreatableParams, Event } from "karikarihelper";

// Services
import {
    EventService,
    OrderService,
    ResponseService,
    SocketService,
} from "@services";

const createEvent = (namespace: Namespace, socket: Socket) =>
    socket.on("event:create", (values: EventCreatableParams) => {
        EventService.save(values).then(() => {
            EventService.query({}, false).then((updatedEvents) => {
                namespace
                    .to("events")
                    .emit(
                        "events:refresh",
                        ResponseService.generateSucessfulResponse(updatedEvents)
                    );
            });
        });
    });

const joinEvent = (socket: Socket) =>
    socket.on("event:join", (eventId) => {
        const realmId = socket.data.realmId;

        if (!eventId || !realmId) {
            return;
        }

        EventService.query({
            id: eventId,
        })
            .then((foundEvent) => {
                if (foundEvent.length === 0) {
                    return;
                }

                let selectedEvent = foundEvent[0].toObject<Event>();

                selectedEvent.orders = [];

                SocketService.leaveRooms(socket, "event");

                socket.join(`event/${eventId}/${realmId}`);

                socket.emit(
                    "event:refresh",
                    ResponseService.generateSucessfulResponse(selectedEvent)
                );

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

const leaveEvent = (socket: Socket) =>
    socket.on("event:leave", () => {
        SocketService.leaveRooms(socket, "event");

        socket.emit(
            "event:refresh",
            ResponseService.generateSucessfulResponse()
        );
    });

export { createEvent, joinEvent, leaveEvent };
