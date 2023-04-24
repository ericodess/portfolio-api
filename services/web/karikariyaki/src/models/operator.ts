import { Schema, model } from "mongoose";

// Types
import { Statics } from "@types";

const validateOperatorOperatorName = async (name: string) => {
    if (
        name.trim().length < Statics.USER_NAME_MIN_LENGTH ||
        name.trim().length > Statics.USER_NAME_MAX_LENGTH
    ) {
        if (name.trim().length < Statics.USER_NAME_MIN_LENGTH) {
            throw Error("Operator user name is shorter than 5 characters");
        }

        throw Error("Operator user name is longer than 25 characters");
    }

    const entry = await OperatorModel.findOne({ userName: name });

    if (entry) {
        throw Error("Operator user name is duplicated");
    }
};

const validateOperatorDisplayName = async (name: string) => {
    if (
        name.trim().length < Statics.DISPLAY_NAME_MIN_LENGTH ||
        name.trim().length > Statics.DISPLAY_NAME_MAX_LENGTH
    ) {
        if (name.trim().length < Statics.DISPLAY_NAME_MIN_LENGTH) {
            throw Error("Operator display name is shorter than 5 characters");
        }

        throw Error("Operator display name is longer than 25 characters");
    }
};

const OperatorSchema = new Schema(
    {
        userName: {
            type: String,
            validate: validateOperatorOperatorName,
        },
        displayName: {
            type: String,
            validate: validateOperatorDisplayName,
        },
        photo: Buffer,
    },
    {
        timestamps: true,
    }
);

const OperatorModel = model("operators", OperatorSchema);

export default OperatorModel;
