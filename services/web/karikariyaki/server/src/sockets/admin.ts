// Socket
import { io } from "../setup";

// Models
import { ProductModel } from "@models";

// Services
import { DatabaseService } from "@services";

export class AdminNamespace {
    public static namespace = io.of("/admin");

    public static setup() {
        AdminNamespace.namespace.on("connection", (socket) => {
            socket.on("create_order", (arg, callback) => {
                DatabaseService.getConnection().then(() => {
                    const ClassicOkonomiyaki = new ProductModel();

                    ClassicOkonomiyaki.name = "Classic Okonomiyaki";

                    ClassicOkonomiyaki.save()
                        .then(() => {
                            callback("よしゃがんばて！");
                        })
                        .catch(() => {
                            callback("ヤバ。");
                        });
                });
            });

            socket.on("check_order", (arg, callback) => {
                callback("はい、5分おまたせします");
            });

            socket.on("pick_order", (arg, callback) => {
                callback("ありがとうございました");
            });
        });
    }
}
