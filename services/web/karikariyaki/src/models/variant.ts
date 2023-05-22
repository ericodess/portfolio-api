import { Schema, Types, model } from "mongoose";

// Types
import { InHouseError, Statics } from "@types";

// Models
import { ProductModel, RealmModel } from "@models";

// Services
import { StringService } from "@services";

export enum VariantErrors {
    INVALID = "ERROR_VARIANT_INVALID",
    NAME_DUPLICATED = "ERROR_VARIANT_NAME_DUPLICATED",
    NAME_GREATER_THAN_MAX_LENGTH = "ERROR_VARIANT_NAME_GREATER_THAN_MAX_LENGTH",
    NAME_REQUIRED = "ERROR_VARIANT_NAME_REQUIRED",
    NAME_LESS_THAN_MIN_LENGTH = "ERROR_VARIANT_NAME_LESS_THAN_MIN_LENGTH",
    NOT_FOUND = "ERROR_VARIANT_NOT_FOUND",
    PRODUCT_INVALID = "ERROR_VARIANT_PRODUCT_INVALID",
    PRODUCT_REQUIRED = "ERROR_VARIANT_PRODUCT_REQUIRED",
    REALM_INVALID = "ERROR_VARIANT_PRODUCT_REALM_INVALID",
    REALM_REQUIRED = "ERROR_VARIANT_PRODUCT_REALM_REQUIRED",
}

const validateVariantName = async (name: string) => {
    if (
        StringService.isStringInsideBoundaries(
            name,
            Statics.VARIANT_NAME_MIN_LENGTH,
            Statics.VARIANT_NAME_MAX_LENGTH
        ) === false
    ) {
        if (name.trim().length < Statics.VARIANT_NAME_MIN_LENGTH) {
            throw new InHouseError(VariantErrors.NAME_LESS_THAN_MIN_LENGTH);
        }

        throw new InHouseError(VariantErrors.NAME_GREATER_THAN_MAX_LENGTH);
    }

    const entry = await VariantModel.findOne({ name: name.trim() });

    if (entry) {
        throw new InHouseError(VariantErrors.NAME_DUPLICATED);
    }
};

const validateVariantProduct = async (productId: Schema.Types.ObjectId) => {
    const foundProduct = await ProductModel.findById(productId);

    if (!foundProduct) {
        throw new InHouseError(VariantErrors.PRODUCT_INVALID);
    }
};

const validateOperatorRealm = async (realmId: Types.ObjectId) => {
    const foundRealm = await RealmModel.findById(realmId);

    if (!foundRealm) {
        throw new InHouseError(VariantErrors.REALM_INVALID);
    }
};

const VariantSchema = new Schema({
    name: {
        type: String,
        required: [true, VariantErrors.NAME_REQUIRED],
        validate: validateVariantName,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: Statics.PRODUCT_COLLECTION_NAME,
        required: [true, VariantErrors.PRODUCT_REQUIRED],
        validate: validateVariantProduct,
    },
    realm: {
        type: Schema.Types.ObjectId,
        ref: Statics.REALM_COLLECTION_NAME,
        required: [true, VariantErrors.REALM_REQUIRED],
        validate: validateOperatorRealm,
    },
});

const VariantModel = model(Statics.VARIANT_COLLECTION_NAME, VariantSchema);

export default VariantModel;
