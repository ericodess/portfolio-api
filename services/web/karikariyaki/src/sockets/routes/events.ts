import { Socket } from "socket.io";

// Services
import {
    DateService,
    EventService,
    ResponseService,
    SocketService,
} from "@services";

const joinEvents = (socket: Socket) =>
    socket.on("events:join", async () => {
        let events = await EventService.query({}, false);

        for (const event of events) {
            if (event.isOpen !== DateService.isToday(event.date)) {
                await EventService.update(event._id.toString(), {
                    isOpen: !event.isOpen,
                });
            }
        }

        events = await EventService.query({}, false);

        SocketService.leaveRooms(socket, "event");

        socket.join("events");

        socket.emit(
            "events:refresh",
            ResponseService.generateSucessfulResponse(events)
        );
    });

const leaveEvents = (socket: Socket) =>
    socket.on("events:leave", () => {
        SocketService.leaveRooms(socket, "event");

        socket.emit(
            "events:refresh",
            ResponseService.generateSucessfulResponse(null)
        );
    });

export { joinEvents, leaveEvents };
