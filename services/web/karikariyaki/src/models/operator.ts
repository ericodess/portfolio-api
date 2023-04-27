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
        ) === false
    ) {
        if (name.trim().length < Statics.USER_NAME_MIN_LENGTH) {
            throw Error(
                `Operator user name is shorter than ${Statics.USER_NAME_MIN_LENGTH} characters`
            );
        }

        throw Error(
            `Operator user name is longer than ${Statics.USER_NAME_MAX_LENGTH} characters`
        );
    }

    const entry = await OperatorModel.findOne({
        userName: DatabaseService.generateBroadQuery(name),
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
            required: [true, "User name is required"],
        },
        displayName: {
            type: String,
            validate: validateOperatorDisplayName,
            required: [true, "Display name is required"],
        },
        photo: Buffer,
    },
    {
        timestamps: true,
    }
);

const OperatorModel = model(Statics.OPERATOR_COLLECTION_NAME, OperatorSchema);

export default OperatorModel;
