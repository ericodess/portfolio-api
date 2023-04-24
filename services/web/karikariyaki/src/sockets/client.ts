import { Socket } from "socket.io";
import { io } from "../setup";

// Services
import { JWTService } from "@services";

export class ClientSocket {
    public static namespace = io.of("/client");

    public static setup() {
        ClientSocket.namespace.on("connection", (socket) => {
            ClientSocket._setupCreateOrderTunnel(socket);
            ClientSocket._setupCheckOrderTunnel(socket);
            ClientSocket._setupPickOrderTunnel(socket);
        });
    }

    private static _setupMiddleware() {
        //ClientSocket.namespace.use();
    }

    private static _setupCreateOrderTunnel(socket: Socket) {
        socket.on("create_order", (arg, callback) => {
            callback("いらっしゃいませ");
        });
    }

    private static _setupCheckOrderTunnel(socket: Socket) {
        socket.on("check_order", (arg, callback) => {
            callback("いらっしゃいませ");
        });
    }

    private static _setupPickOrderTunnel(socket: Socket) {
        socket.on("pick_order", (arg, callback) => {
            callback("いらっしゃいませ");
        });
    }
}
