import { Schema, Types, model } from "mongoose";

// Types
import { Statics } from "@types";

// Enums
import { OrderStatus } from "@enum";

// Models
import { EventModel, OperatorModel, ProductModel, VariantModel } from "@models";

// Services
import { StringService } from "@services";

const validateEvent = async (eventId: Types.ObjectId) => {
    const foundEvent = await EventModel.findById(eventId);

    if (!foundEvent) {
        throw Error("Order event ID is invalid");
    }
};

const validateOperator = async (operatorId: Types.ObjectId) => {
    const foundOperator = await OperatorModel.findById(operatorId);

    if (!foundOperator) {
        throw Error("Order operator ID is invalid");
    }
};

const validateClient = async (client: string) => {
    if (
        StringService.isStringInsideBoundaries(
            client,
            Statics.ORDER_CLIENT_NAME_MIN_LENGTH,
            Statics.ORDER_CLIENT_NAME_MAX_LENGTH
        ) === false
    ) {
        if (client.trim().length < Statics.ORDER_CLIENT_NAME_MIN_LENGTH) {
            throw Error(
                `Order client name is shorter than ${Statics.ORDER_CLIENT_NAME_MIN_LENGTH} characters`
            );
        }

        throw Error(
            `Order client name is longer than ${Statics.ORDER_CLIENT_NAME_MAX_LENGTH} characters`
        );
    }
};

const validateItem = async (itemId: Types.ObjectId) => {
    const foundItem = await ProductModel.findById(itemId);

    if (!foundItem) {
        throw Error("Order product ID is invalid");
    }
};

const validateVariant = async (variantId: Types.ObjectId) => {
    if (!variantId) {
        return;
    }

    const foundVariant = await VariantModel.findById(variantId);

    if (!foundVariant) {
        throw Error("Order product variant ID is invalid");
    }
};

const OrderSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: Statics.EVENT_COLLECTION_NAME,
        required: [true, "Event data is required"],
        validate: validateEvent,
    },
    status: {
        type: String,
        enum: OrderStatus,
        default: OrderStatus.COOKING,
    },
    operator: {
        type: Schema.Types.ObjectId,
        ref: Statics.OPERATOR_COLLECTION_NAME,
        required: [true, "Operator data is required"],
        validate: validateOperator,
    },
    client: {
        type: String,
        required: [true, "Client data is required"],
        validate: validateClient,
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: Statics.PRODUCT_COLLECTION_NAME,
        required: [true, "Item data is required"],
        validate: validateItem,
    },
    variant: {
        type: Schema.Types.ObjectId,
        ref: Statics.VARIANT_COLLECTION_NAME,
        validate: validateVariant,
    },
});

const OrderModel = model(Statics.ORDER_COLLECTION_NAME, OrderSchema);

export default OrderModel;
