import { Schema, model } from "mongoose";

// Types
import { Statics } from "@types";

// Services
import { DatabaseService, StringService } from "@services";

const validateOperatorOperatorName = async (name: string) => {
    if (
        StringService.isStringInsideBoundaries(
            name,
            Statics.USER_NAME_MIN_LENGTH,
            Statics.USER_NAME_MAX_LENGTH
        )
    ) {
        if (name.trim().length < Statics.USER_NAME_MIN_LENGTH) {
            throw Error("Operator user name is shorter than 5 characters");
        }

        throw Error("Operator user name is longer than 25 characters");
    }

    const entry = await OperatorModel.findOne({
        userName: DatabaseService.generateCaseInsensivitySettings(name),
    });

    if (entry) {
        throw Error("Operator user name is duplicated");
    }
};

const validateOperatorDisplayName = async (displayName: string) => {
    if (
        StringService.isStringInsideBoundaries(
            displayName,
            Statics.DISPLAY_NAME_MIN_LENGTH,
            Statics.DISPLAY_NAME_MAX_LENGTH
        )
    ) {
        if (displayName.trim().length < Statics.DISPLAY_NAME_MIN_LENGTH) {
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
