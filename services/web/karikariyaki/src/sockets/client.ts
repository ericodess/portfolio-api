import { io } from "../setup";

// Services
import { OrderService } from "@services";

export class ClientSocket {
    public static namespace = io.of("/client");

    public static setup() {
        ClientSocket.namespace.on("connection", async (socket) => {
            const orderId = socket.handshake.query.order;

            if (!orderId || typeof orderId === "object") {
                socket.disconnect();

                return;
            }

            const order = await OrderService.query({
                id: orderId,
            });

            if (!order) {
                socket.disconnect();

                return;
            }

            socket.join(orderId);

            ClientSocket.namespace.to(orderId).emit("refresh", order);
        });
    }
}
