import { Schema, Types, model } from "mongoose";

// Types
import { InHouseError, Statics } from "@types";

// Models
import { OrderModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

export enum EventErrors {
    DATE_REQUIRED = "ERROR_EVENT_DATE_REQUIRED",
    DATE_DUPLICATED = "ERROR_EVENT_DATE_DUPLICATED",
    INVALID = "ERROR_EVENT_INVALID",
    NOT_FOUND = "ERROR_EVENT_NOT_FOUND",
    NAME_REQUIRED = "ERROR_EVENT_NAME_REQUIRED",
    ORDER_INVALID = "ERROR_EVENT_ORDER_INVALID",
    ORDER_DUPLICATED = "ERROR_EVENT_ORDER_DUPLICATED",
}

const validateEventDate = async (date: Date) => {
    const entry = await EventModel.findOne({
        date: DatabaseService.generateStandarizedDateQuery(date),
    });

    if (entry) {
        throw new InHouseError(EventErrors.DATE_DUPLICATED);
    }
};

const validateEventOrders = async (orderIds: Types.ObjectId[]) => {
    for (const orderId of orderIds) {
        const foundOrder = await OrderModel.findById(
            StringService.toString(orderId)
        );

        if (!foundOrder) {
            throw new InHouseError(EventErrors.ORDER_INVALID);
        }

        if (orderIds.filter((_) => _ !== orderId).length >= 1) {
            throw new InHouseError(EventErrors.ORDER_DUPLICATED);
        }
    }
};

const EventSchema = new Schema({
    name: {
        type: String,
        required: [true, EventErrors.NAME_REQUIRED],
    },
    date: {
        type: Date,
        required: [true, EventErrors.DATE_REQUIRED],
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
