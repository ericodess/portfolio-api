import { Socket } from "socket.io";
import { EventCreatableParams, Event } from "karikarihelper";

// Types
import { InHouseError } from "@types";
import { EventErrors } from "@models";

// Socktes
import { PrompterSocket, RejiSocket } from "@sockets";

// Services
import {
    EventService,
    OrderService,
    ResponseService,
    SocketService,
} from "@services";

const createEvent = (socket: Socket) =>
    socket.on("event:create", async (values: EventCreatableParams) => {
        try {
            await EventService.save(values);

            const updatedEvents = await EventService.query({}, false);

            RejiSocket.namespace
                .to("events")
                .emit(
                    "events:refresh",
                    ResponseService.generateSucessfulResponse(updatedEvents)
                );
            PrompterSocket.namespace
                .to("events")
                .emit(
                    "events:refresh",
                    ResponseService.generateSucessfulResponse(updatedEvents)
                );
        } catch (error) {
            socket.emit(
                "event:error",
                ResponseService.generateFailedResponse(error.message)
            );
        }
    });

const joinEvent = (socket: Socket) =>
    socket.on("event:join", async (eventId) => {
        const realmId = socket.data.realmId;

        if (!eventId || !realmId) {
            throw new InHouseError(EventErrors.INVALID);
        }

        try {
            const foundEvent = await EventService.queryById(eventId);

            if (!foundEvent) {
                throw new InHouseError(EventErrors.NOT_FOUND);
            }

            if (foundEvent.isOpen === false) {
                throw new InHouseError(EventErrors.NOT_ACTIVE);
            }

            let selectedEvent = foundEvent.toObject<Event>();

            selectedEvent.orders = [];

            SocketService.leaveRooms(socket, "event");

            socket.join(`event/${eventId}/${realmId}`);

            socket.data.eventId = eventId;

            socket.emit(
                "event:refresh",
                ResponseService.generateSucessfulResponse(selectedEvent)
            );

            const eventOrders = await OrderService.query({
                eventId: eventId,
                realmId: realmId,
            });

            socket.data.eventId = eventId;

            socket.emit(
                "orders:refresh",
                ResponseService.generateSucessfulResponse(eventOrders)
            );
        } catch (error) {
            console.log(error);
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

export { createEvent, joinEvent, leaveEvent };
