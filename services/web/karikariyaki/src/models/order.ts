import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    eventId: {
        type: String,
        required: [true, "EventId is required"],
    },
    orderId: {
        type: Number,
        required: [true, "OrderId is required"],
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    isComplete: Boolean,
    operatorId: {
        type: String,
        required: [true, "OperatorId is required"],
    },
    clientName: {
        type: String,
        required: [true, "Client name is required"],
    },
    itemIds: [String],
});

const OrderModel = model("orders", OrderSchema);

export default OrderModel;
