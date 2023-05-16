import { Schema, Types, model } from "mongoose";

// Types
import { InHouseError, Statics } from "@types";

// Enums
import { OrderStatus } from "@enums";

// Models
import { EventModel, OperatorModel, ProductModel, VariantModel } from "@models";

// Services
import { StringService } from "@services";

export enum OrderErrors {
    CLIENT_NAME_GREATER_THAN_MAX_LENGTH = "ERROR_ORDER_CLIENT_NAME_GREATER_THAN_MAX_LENGTH",
    CLIENT_NAME_LESS_THAN_MIN_LENGTH = "ERROR_ORDER_CLIENT_NAME_LESS_THAN_MIN_LENGTH",
    CLIENT_NAME_REQUIRED = "ERROR_ORDER_CLIENT_NAME_REQUIRED",
    EVENT_INVALID = "ERROR_ORDER_EVENT_INVALID",
    EVENT_REQUIRED = "ERROR_ORDER_EVENT_REQUIRED",
    INVALID = "ERROR_ORDER_INVALID",
    ITEM_INVALID = "ERROR_ORDER_ITEM_INVALID",
    ITEM_REQUIRED = "ERROR_ORDER_ITEM_REQUIRED",
    ITEM_VARIANT_INVALID = "ERROR_ORDER_ITEM_VARIANT_INVALID",
    NOT_FOUND = "ERROR_ORDER_NOT_FOUND",
    OPERATOR_INVALID = "ERROR_ORDER_OPERATOR_INVALID",
    OPERATOR_REQUIRED = "ERROR_ORDER_OPERATOR_REQUIRED",
}

const validateOrderEvent = async (eventId: Types.ObjectId) => {
    const foundEvent = await EventModel.findById(eventId);

    if (!foundEvent) {
        throw new InHouseError(OrderErrors.EVENT_INVALID);
    }
};

const validateOrderOperator = async (operatorId: Types.ObjectId) => {
    const foundOperator = await OperatorModel.findById(operatorId);

    if (!foundOperator) {
        throw new InHouseError(OrderErrors.OPERATOR_INVALID);
    }
};

const validateOrderClient = async (client: string) => {
    if (
        StringService.isStringInsideBoundaries(
            client,
            Statics.ORDER_CLIENT_NAME_MIN_LENGTH,
            Statics.ORDER_CLIENT_NAME_MAX_LENGTH
        ) === false
    ) {
        if (client.trim().length < Statics.ORDER_CLIENT_NAME_MIN_LENGTH) {
            throw new InHouseError(
                OrderErrors.CLIENT_NAME_LESS_THAN_MIN_LENGTH
            );
        }

        throw new InHouseError(OrderErrors.CLIENT_NAME_GREATER_THAN_MAX_LENGTH);
    }
};

const validateOrderItem = async (itemId: Types.ObjectId) => {
    const foundItem = await ProductModel.findById(itemId);

    if (!foundItem) {
        throw new InHouseError(OrderErrors.ITEM_INVALID);
    }
};

const validateOrderItemVariant = async (variantId: Types.ObjectId) => {
    if (!variantId) {
        return;
    }

    const foundVariant = await VariantModel.findById(variantId);

    if (!foundVariant) {
        throw new InHouseError(OrderErrors.ITEM_VARIANT_INVALID);
    }
};

const OrderSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: Statics.EVENT_COLLECTION_NAME,
        required: [true, OrderErrors.EVENT_REQUIRED],
        validate: validateOrderEvent,
    },
    status: {
        type: String,
        enum: OrderStatus,
        default: OrderStatus.COOKING,
    },
    operator: {
        type: Schema.Types.ObjectId,
        ref: Statics.OPERATOR_COLLECTION_NAME,
        required: [true, OrderErrors.OPERATOR_REQUIRED],
        validate: validateOrderOperator,
    },
    client: {
        type: String,
        required: [true, OrderErrors.CLIENT_NAME_REQUIRED],
        validate: validateOrderClient,
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: Statics.PRODUCT_COLLECTION_NAME,
        required: [true],
        validate: validateOrderItem,
    },
    variant: {
        type: Schema.Types.ObjectId,
        ref: Statics.VARIANT_COLLECTION_NAME,
        validate: validateOrderItemVariant,
    },
});

const OrderModel = model(Statics.ORDER_COLLECTION_NAME, OrderSchema);

export default OrderModel;
