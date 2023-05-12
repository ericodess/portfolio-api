import { Schema, model } from "mongoose";
import isBase64 from "is-base64";

// Types
import { InHouseError, Statics } from "@types";

// Services
import { DatabaseService, StringService } from "@services";

export enum OperatorErrors {
    DISPLAY_NAME_GREATER_THAN_MAX_LENGTH = "ERROR_OPERATOR_DISPLAY_NAME_GREATER_THAN_MAX_LENGTH",
    DISPLAY_NAME_LESS_THAN_MIN_LENGTH = "ERROR_OPERATOR_DISPLAY_NAME_GREATER_THAN_MIN_LENGTH",
    DISPLAY_NAME_REQUIRED = "ERROR_OPERATOR_DISPLAY_NAME_REQUIRED",
    INVALID = "ERROR_OPERATOR_INVALID",
    NOT_FOUND = "ERROR_OPERATOR_NOT_FOUND",
    USER_NAME_DUPLICATED = "ERROR_OPERATOR_USER_NAME_DUPLICATED",
    USER_NAME_GREATER_THAN_MAX_LENGTH = "ERROR_OPERATOR_USER_NAME_GREATER_THAN_MAX_LENGTH",
    USER_NAME_LESS_THAN_MIN_LENGTH = "ERROR_OPERATOR_USER_NAME_LESS_THAN_MIN_LENGTH",
    USER_NAME_REQUIRED = "ERROR_OPERATOR_USER_NAME_REQUIRED",
    PHOTO_INVALID = "ERROR_OPERATOR_PHOTO_INVALID",
}

const validateOperatorUserName = async (name: string) => {
    if (
        StringService.isStringInsideBoundaries(
            name,
            Statics.USER_NAME_MIN_LENGTH,
            Statics.USER_NAME_MAX_LENGTH
        ) === false
    ) {
        if (name.trim().length < Statics.USER_NAME_MIN_LENGTH) {
            throw new InHouseError(
                OperatorErrors.USER_NAME_GREATER_THAN_MAX_LENGTH
            );
        }

        throw new InHouseError(OperatorErrors.USER_NAME_LESS_THAN_MIN_LENGTH);
    }

    const entry = await OperatorModel.findOne({
        userName: DatabaseService.generateBroadQuery(name),
    });

    if (entry) {
        throw new InHouseError(OperatorErrors.USER_NAME_DUPLICATED);
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
            throw new InHouseError(
                OperatorErrors.DISPLAY_NAME_LESS_THAN_MIN_LENGTH
            );
        }

        throw new InHouseError(
            OperatorErrors.DISPLAY_NAME_GREATER_THAN_MAX_LENGTH
        );
    }
};

const validateOperatorPhoto = async (photoInBase64: string) => {
    if (!photoInBase64 || photoInBase64.trim().length === 0) {
        return;
    }

    if (isBase64(photoInBase64, { allowEmpty: false }) === false) {
        throw new InHouseError(OperatorErrors.PHOTO_INVALID);
    }
};

const OperatorSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, OperatorErrors.USER_NAME_REQUIRED],
            validate: validateOperatorUserName,
        },
        displayName: {
            type: String,
            required: [true, OperatorErrors.DISPLAY_NAME_REQUIRED],
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
