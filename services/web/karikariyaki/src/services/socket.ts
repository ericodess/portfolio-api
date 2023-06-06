import { Socket } from "socket.io";

// Sockets
import { RejiSocket, PrompterSocket } from "@sockets";

// Services
import { OrderService } from "./models/order";
import { ResponseService } from "./response";

export class SocketService {
    public static leaveRooms(socket: Socket, roomPrefix: string) {
        Array.from(socket.rooms)
            .filter((room) => room.includes(roomPrefix))
            .forEach((room) => {
                socket.leave(room);
            });
    }

    public static async refreshOrders(eventId: string, realmId: string) {
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
    }
}
