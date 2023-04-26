import { Schema, model } from "mongoose";

// Types
import { Statics } from "@types";

// Enums
import { OrderStatus } from "@enum";

const OrderSchema = new Schema({
    eventId: {
        type: String,
        required: [true, "Event ID is required"],
    },
    orderId: {
        type: Number,
        required: [true, "Order ID is required"],
    },
    date: {
        type: Date,
        required: [true, "Order date is required"],
    },
    status: {
        type: String,
        enum: OrderStatus,
        default: OrderStatus.COOKING,
        required: [true, "Order status is required"],
    },
    operatorId: {
        type: String,
        required: [true, "Operator ID is required"],
    },
    clientName: {
        type: String,
        required: [true, "Client name is required"],
    },
    itemIds: [String],
});

const OrderModel = model(Statics.ORDER_COLLECTION_NAME, OrderSchema);

export default OrderModel;
