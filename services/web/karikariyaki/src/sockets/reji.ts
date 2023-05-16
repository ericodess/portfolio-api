import cookie from "cookie";

// Socket
import { io } from "../setup";

// Services
import { EventService, JWTService } from "@services";

export class RejiSocket {
    public static namespace = io.of("/reji");

    public static setup() {
        RejiSocket.namespace.on("connection", async (socket) => {
            const cookies = cookie.parse(socket.handshake.headers.cookie);
            const accessToken = cookies[process.env["COOKIE_NAME"]];

            if (!accessToken) {
                socket.disconnect();

                return;
            }

            //console.log(JWTService.decodeAccessToken(accessToken));

            const events = await EventService.query({});
            console.log(events);
            //socket.join('orders');

            //PrompterNamespace.namespace.to(orderId).emit("refresh", orders);
        });
    }
}
