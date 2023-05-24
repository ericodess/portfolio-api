import { Socket } from "socket.io";

export class SocketService {
    public static leaveRooms(socket: Socket, roomPrefix: string) {
        Array.from(socket.rooms)
            .filter((room) => room.includes(roomPrefix))
            .forEach((room) => {
                socket.leave(room);
            });
    }
}
