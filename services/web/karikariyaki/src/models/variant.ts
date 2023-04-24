import { Schema, model } from "mongoose";

// Types
import { Statics } from "@types";

const validateVariantName = async (name: string) => {
    if (
        name.trim().length < Statics.VARIANT_NAME_MIN_LENGTH ||
        name.trim().length > Statics.VARIANT_NAME_MAX_LENGTH
    ) {
        if (name.trim().length < Statics.VARIANT_NAME_MIN_LENGTH) {
            throw Error("Variant name is shorter than 5 characters");
        }

        throw Error("Variant name is longer than 25 characters");
    }

    const entry = await VariantModel.findOne({ name });

    if (entry) {
        throw Error("Variant name is duplicated");
    }
};

const VariantSchema = new Schema({
    name: {
        type: String,
        required: [true, "Variant name is required"],
        validate: validateVariantName,
    },
    containsMeat: Boolean,
});

const VariantModel = model("variants", VariantSchema);

export default VariantModel;
