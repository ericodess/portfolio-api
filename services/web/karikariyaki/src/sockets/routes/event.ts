import { Namespace, Socket } from "socket.io";

// Types
import { EventCreatableParams } from "karikarihelper";

// Services
import { EventService, ResponseService, SocketService } from "@services";

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

const joinEvent = (socket: Socket, realmId: string) =>
    socket.on("event:join", (eventId) => {
        if (!eventId || !realmId) {
            return;
        }

        EventService.query({
            id: eventId,
        }).then((foundEvent) => {
            if (foundEvent.length === 0) {
                return;
            }

            SocketService.leaveRooms(socket, "event");

            socket.join(`event/${eventId}/${realmId}`);

            socket.emit(
                "event:refresh",
                ResponseService.generateSucessfulResponse(foundEvent[0])
            );
        });
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
