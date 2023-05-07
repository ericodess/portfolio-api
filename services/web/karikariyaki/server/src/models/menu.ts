import { Schema, model } from "mongoose";

// Types
import { Statics } from "@types";

// Service
import { DatabaseService, StringService } from "@services";

const validateMenuTitle = async (title: string) => {
    const foundMenu = await MenuModel.findOne({
        title: DatabaseService.generateExactInsensitiveQuery(title),
    });

    if (foundMenu) {
        throw Error("Menu title is duplicated");
    }
};

const validateMenuRoute = async (route: string) => {
    const foundMenu = await MenuModel.findOne({
        route: DatabaseService.generateExactInsensitiveQuery(
            StringService.removeLeadingAndTrailingSlashes(route)
        ),
    });

    if (foundMenu) {
        throw Error("Menu route is duplicated");
    }
};

const MenuSchema = new Schema({
    title: {
        type: String,
        required: [true, "Menu title is required"],
        validate: validateMenuTitle,
    },
    route: {
        type: String,
        required: [true, "Menu route is required"],
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
