import { Schema, Types, model } from "mongoose";

// Types
import { InHouseError, Statics } from "@types";

// Models
import { VariantModel } from "@models";

// Services
import { StringService } from "@services";

export enum ProductErrors {
    INVALID = "ERROR_PRODUCT_INVALID",
    NAME_DUPLICATED = "ERROR_PRODUCT_NAME_DUPLICATED",
    NAME_GREATER_THAN_MAX_LENGTH = "ERROR_PRODUCT_NAME_GREATER_THAN_MAX_LENGTH",
    NAME_LESS_THAN_MIN_LENGTH = "ERROR_PRODUCT_NAME_LESS_THAN_MIN_LENGTH",
    NAME_REQUIRED = "ERROR_PRODUCT_NAME_REQUIRED",
    NOT_FOUND = "ERRPR_PRODUCT_NOT_FOUND",
    VARIANT_DUPLICATED = "ERROR_PRODUCT_VARIANT_DUPLICATED",
    VARIANT_INVALID = "ERROR_PRODUCT_VARIANT_INVALID",
}

const validateProductName = async (name: string) => {
    if (
        StringService.isStringInsideBoundaries(
            name,
            Statics.PRODUCT_NAME_MIN_LENGTH,
            Statics.PRODUCT_NAME_MAX_LENGTH
        ) === false
    ) {
        if (name.trim().length < Statics.PRODUCT_NAME_MIN_LENGTH) {
            throw new InHouseError(ProductErrors.NAME_LESS_THAN_MIN_LENGTH);
        }

        throw new InHouseError(ProductErrors.NAME_GREATER_THAN_MAX_LENGTH);
    }

    const entry = await ProductModel.findOne({
        name: name.trim(),
    });

    if (entry) {
        throw new InHouseError(ProductErrors.NAME_DUPLICATED);
    }
};

const validateProductVariants = async (variantIds: Types.ObjectId[]) => {
    for (const variantId of variantIds) {
        const foundVariant = await VariantModel.findById(variantId);

        if (!foundVariant) {
            throw new InHouseError(ProductErrors.VARIANT_INVALID);
        }

        if (variantIds.filter((_) => _ !== variantId).length >= 1) {
            throw new InHouseError(ProductErrors.VARIANT_INVALID);
        }
    }
};

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, ProductErrors.VARIANT_INVALID],
        validate: validateProductName,
    },
    variants: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: Statics.VARIANT_COLLECTION_NAME,
            },
        ],
        default: [],
        validate: validateProductVariants,
    },
});

const ProductModel = model(Statics.PRODUCT_COLLECTION_NAME, ProductSchema);

export default ProductModel;
