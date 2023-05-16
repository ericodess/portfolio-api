// Socket
import { io } from "../setup";

// Services
import { OrderService } from "@services";

export class PrompterSocket {
    public static namespace = io.of("/prompter");

    public static setup() {
        PrompterSocket.namespace.on("connection", async (socket) => {
            const orders = await OrderService.query({});

            //socket.join('orders');

            //PrompterNamespace.namespace.to(orderId).emit("refresh", orders);
        });
    }
}
