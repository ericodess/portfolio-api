import { PopulateOptions } from "mongoose";

// Models
import { MenuModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

// Enums
import { MenuRealm } from "@enums";

interface DefaultParams {
    id?: string;
    realm?: keyof typeof MenuRealm;
    title?: string;
    icon?: string;
    route?: string;
    parentId?: string;
}

type QueryableParams = Omit<DefaultParams, "route">;

type CreatableParams = Omit<DefaultParams, "id">;

type EditableParams = Omit<DefaultParams, "id" | "parentId">;

export class MenuService {
    public static visibleParameters = [
        "title",
        "realm",
        "icon",
        "route",
        "parent",
        "children",
    ];

    private static _populateOptions = [
        {
            path: "parent",
            select: "title",
        },
        {
            path: "children",
            select: "title icon route children",
            populate: {
                path: "children",
                select: "title icon route",
            },
        },
    ] as PopulateOptions[];

    public static async query(values: QueryableParams, isRootOnly = true) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            query.push({
                _id: values.id,
            });
        }

        if (values.realm) {
            query.push({
                realm: values.realm,
            });
        }

        if (values.title) {
            query.push({
                title: DatabaseService.generateBroadQuery(values.title),
            });
        }

        if (values.parentId) {
            query.push({
                parent: StringService.toObjectId(values.parentId),
            });
        }

        if (isRootOnly) {
            query.push({
                parent: null,
            });
        }

        return await MenuModel.find(
            query.length === 0
                ? null
                : {
                      $and: query,
                  }
        )
            .select(MenuService.visibleParameters)
            .sort("title")
            .populate(isRootOnly ? MenuService._populateOptions : null);
    }

    public static async save(values: CreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new MenuModel();

        newEntry.realm = values.realm;
        newEntry.title = values.title?.trim();
        newEntry.icon = values.icon?.trim();
        newEntry.route = StringService.removeLeadingAndTrailingSlashes(
            values.route
        );
        newEntry.parent = StringService.toObjectId(values.parentId);

        if (newEntry.parent) {
            const updatedParent = await MenuModel.findByIdAndUpdate(
                newEntry.parent,
                {
                    $push: {
                        children: newEntry._id,
                    },
                },
                { new: true, runValidators: true }
            );

            updatedParent.route = undefined;

            await updatedParent.save();

            newEntry.realm = updatedParent.realm as keyof typeof MenuRealm;
        }

        await newEntry.save();

        return MenuModel.findById(newEntry._id)
            .select(MenuService.visibleParameters)
            .populate(MenuService._populateOptions);
    }

    public static async update(id: string, values: EditableParams) {
        await DatabaseService.getConnection();

        values.title = values.title?.trim();
        values.icon = values.icon?.trim();
        values.route = StringService.removeLeadingAndTrailingSlashes(
            values.route
        );

        const menuId = StringService.toObjectId(id);

        const currentMenu = await MenuModel.findById(menuId);

        if (values.realm) {
            await MenuModel.updateMany(
                {
                    parent: menuId,
                },
                {
                    $set: {
                        realm: values.realm,
                    },
                }
            );
        }

        return MenuModel.findByIdAndUpdate(
            menuId,
            {
                $set: {
                    realm: values.realm ?? undefined,
                    title: values.title ?? undefined,
                    icon: values.icon ?? undefined,
                    route:
                        currentMenu.children.length > 0
                            ? undefined
                            : values.route ?? undefined,
                },
            },
            { new: true, runValidators: true }
        )
            .select(MenuService.visibleParameters)
            .populate(MenuService._populateOptions);
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        const menuId = StringService.toObjectId(id);

        await MenuModel.deleteMany({
            parent: menuId,
        });

        await MenuModel.updateMany(
            {
                children: menuId,
            },
            {
                $pull: {
                    children: menuId,
                },
            }
        );

        return MenuModel.findByIdAndDelete(menuId)
            .select(MenuService.visibleParameters)
            .populate(MenuService._populateOptions);
    }
}
