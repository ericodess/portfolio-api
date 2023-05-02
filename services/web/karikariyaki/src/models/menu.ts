import { Schema, model } from "mongoose";

// Types
import { Statics } from "@types";
import { StringService } from "@services";

const validateMenuRoute = async (route: string) => {
    const foundMenu = await MenuModel.find({
        route: StringService.removeLeadingAndTrailingSlashes(route),
    });

    if (foundMenu) {
        throw Error("Menu route is duplicated");
    }
};

const MenuSchema = new Schema({
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
