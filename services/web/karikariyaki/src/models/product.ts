import { Schema, Types, model } from "mongoose";

// Types
import { Statics } from "@types";

// Models
import { VariantModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

const validateProductName = async (name: string) => {
    if (
        StringService.isStringInsideBoundaries(
            name,
            Statics.PRODUCT_NAME_MIN_LENGTH,
            Statics.PRODUCT_NAME_MAX_LENGTH
        ) === false
    ) {
        if (name.trim().length < Statics.PRODUCT_NAME_MIN_LENGTH) {
            throw Error(
                `Product name is shorter ${Statics.PRODUCT_NAME_MIN_LENGTH} than characters`
            );
        }

        throw Error(
            `Product name is longer than ${Statics.PRODUCT_NAME_MAX_LENGTH} characters`
        );
    }

    const entry = await ProductModel.findOne({
        name: name.trim(),
    });

    if (entry) {
        throw Error("Product name is duplicated");
    }
};

const validateProductVariants = async (variantIds: Types.ObjectId[]) => {
    for (const variantId of variantIds) {
        const foundVariant = await VariantModel.findById(variantId);

        if (!foundVariant) {
            throw Error("Product variant ID is invalid");
        }

        if (variantIds.filter((_) => _ !== variantId).length >= 1) {
            throw Error("Product variant is duplicated");
        }
    }
};

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
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
