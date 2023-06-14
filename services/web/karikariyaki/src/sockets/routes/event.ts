import { Socket } from "socket.io";
import { EventCreatableParams, Event, Operator } from "karikarihelper";

// Types
import { InHouseError } from "@types";
import { EventErrors } from "@models";

// Services
import {
    DateService,
    EventService,
    OrderService,
    ResponseService,
    SocketService,
} from "@services";

const joinEvent = (socket: Socket) =>
    socket.on("event:join", async (eventId) => {
        const operator = socket.data.operator as Operator;

        if (!eventId || !operator) {
            throw new InHouseError(EventErrors.INVALID);
        }

        try {
            let foundEvent = await EventService.queryById(eventId);

            if (!foundEvent) {
                throw new InHouseError(EventErrors.NOT_FOUND);
            }

            if (DateService.isFuture(foundEvent.date)) {
                throw new InHouseError(EventErrors.NOT_ACTIVE);
            }

            let selectedEvent = foundEvent.toObject<Event>();

            selectedEvent.orders = [];

            SocketService.leaveRooms(socket, "event");

            socket.join(`event/${eventId}/${operator.realm._id}`);

            socket.data.eventId = eventId;

            socket.emit(
                "event:refresh",
                ResponseService.generateSucessfulResponse(selectedEvent)
            );

            const eventOrders = await OrderService.query(operator, {
                eventId: eventId,
            });

            socket.data.eventId = eventId;

            socket.emit(
                "orders:refresh",
                ResponseService.generateSucessfulResponse(eventOrders)
            );
        } catch (error) {
            socket.emit(
                "event:error",
                ResponseService.generateFailedResponse(error.message)
            );
        }
    });

const leaveEvent = (socket: Socket) =>
    socket.on("event:leave", () => {
        socket.data.eventId = null;

        SocketService.leaveRooms(socket, "event");

        socket.emit(
            "event:refresh",
            ResponseService.generateSucessfulResponse()
        );
    });

export { joinEvent, leaveEvent };
