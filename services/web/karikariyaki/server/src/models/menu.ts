import { Schema, model } from "mongoose";

// Types
import { InHouseError, Statics } from "@types";

// Service
import { DatabaseService, StringService } from "@services";

// Enums
import { MenuRealm } from "@enums";

export enum MenuErrors {
    INVALID = "ERROR_MENU_INVALID",
    NOT_FOUND = "ERROR_MENU_NOT_FOUND",
    REALM_REQUIRED = "ERROR_MENU_REALM_REQUIRED",
    ROUTE_DUPLICATED = "ERROR_MENU_ROUTE_DUPLICATED",
    TITLE_DUPLICATED = "ERROR_MENU_TITLE_DUPLICATED",
    TITLE_REQUIRED = "ERROR_MENU_TITLE_REQUIRED",
}

const validateMenuTitle = async (title: string) => {
    const foundMenu = await MenuModel.findOne({
        title: DatabaseService.generateExactInsensitiveQuery(title),
    });

    if (foundMenu) {
        throw new InHouseError(MenuErrors.TITLE_DUPLICATED);
    }
};

const validateMenuRoute = async (route: string) => {
    if (!route) {
        return;
    }

    const foundMenu = await MenuModel.findOne({
        route: DatabaseService.generateExactInsensitiveQuery(
            StringService.removeLeadingAndTrailingSlashes(route)
        ),
    });

    if (foundMenu) {
        throw new InHouseError(MenuErrors.ROUTE_DUPLICATED);
    }
};

const MenuSchema = new Schema({
    title: {
        type: String,
        required: [true, MenuErrors.TITLE_REQUIRED],
        validate: validateMenuTitle,
    },
    realm: {
        type: String,
        enum: MenuRealm,
        required: [true, MenuErrors.REALM_REQUIRED],
    },
    route: {
        type: String,
        validate: validateMenuRoute,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: Statics.MENU_COLLECTION_NAME,
    },
    children: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: Statics.MENU_COLLECTION_NAME,
            },
        ],
        default: [],
    },
});

const MenuModel = model(Statics.MENU_COLLECTION_NAME, MenuSchema);

export default MenuModel;
