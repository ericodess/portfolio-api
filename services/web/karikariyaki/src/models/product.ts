import { Schema, model } from "mongoose";

// Types
import { Statics } from "@types";

const validateProductName = async (name: string) => {
    if (
        name.trim().length < Statics.PRODUCT_NAME_MIN_LENGTH ||
        name.trim().length > Statics.PRODUCT_NAME_MAX_LENGTH
    ) {
        if (name.trim().length < Statics.PRODUCT_NAME_MIN_LENGTH) {
            throw Error("Product name is shorter than 5 characters");
        }

        throw Error("Product name is longer than 25 characters");
    }

    const entry = await ProductModel.findOne({ name });

    if (entry) {
        throw Error("Product name is duplicated");
    }
};

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        validate: validateProductName,
    },
    variantIds: [String],
});

const ProductModel = model("products", ProductSchema);

export default ProductModel;
