import { Schema, model } from "mongoose";
import isBase64 from "is-base64";

// Types
import { Statics } from "@types";

// Services
import { DatabaseService, StringService } from "@services";

const validateOperatorUserName = async (name: string) => {
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
        ) === false
    ) {
        if (displayName.trim().length < Statics.DISPLAY_NAME_MIN_LENGTH) {
            throw Error(
                `Operator display name is shorter than ${Statics.DISPLAY_NAME_MIN_LENGTH} characters`
            );
        }

        throw Error(
            `Operator display name is longer than ${Statics.DISPLAY_NAME_MAX_LENGTH} characters`
        );
    }
};

const validateOperatorPhoto = async (photoInBase64: string) => {
    if (!photoInBase64 || photoInBase64.trim().length === 0) {
        return;
    }

    if (isBase64(photoInBase64, { allowEmpty: false }) === false) {
        throw Error("Operator photo is invalid");
    }
};

const OperatorSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, "Operator user name is required"],
            validate: validateOperatorUserName,
        },
        displayName: {
            type: String,
            required: [true, "Operator display name is required"],
            validate: validateOperatorDisplayName,
        },
        photo: {
            type: String,
            validate: validateOperatorPhoto,
            default: Statics.DEFAULT_USER_PHOTO_BASE64,
        },
    },
    {
        timestamps: true,
    }
);

const OperatorModel = model(Statics.OPERATOR_COLLECTION_NAME, OperatorSchema);

export default OperatorModel;
