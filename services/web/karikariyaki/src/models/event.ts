import { Schema, Types, model } from "mongoose";

// Types
import { Statics } from "@types";

import { OrderModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

const validateEventDate = async (date: Date) => {
    const entry = await EventModel.findOne({
        date: DatabaseService.generateStandarizedDateQuery(date),
    });

    if (entry) {
        throw Error("Event date is duplicated");
    }
};

const validateEventOrders = async (orderIds: Types.ObjectId[]) => {
    for (const orderId of orderIds) {
        const foundOrder = await OrderModel.findById(
            StringService.toString(orderId)
        );

        if (!foundOrder) {
            throw Error("Order ID is invalid");
        }

        if (orderIds.filter((_) => _ !== orderId).length >= 1) {
            throw Error("Order is duplicated");
        }
    }
};

const EventSchema = new Schema({
    name: {
        type: String,
        required: [true, "Event name is required"],
    },
    date: {
        type: Date,
        required: [true, "Event date is required"],
        validate: validateEventDate,
    },
    orders: {
        type: [
            { type: Schema.Types.ObjectId, ref: Statics.ORDER_COLLECTION_NAME },
        ],
        default: [],
        validate: validateEventOrders,
    },
});

const EventModel = model(Statics.EVENT_COLLECTION_NAME, EventSchema);

export default EventModel;
