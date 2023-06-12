import { PopulateOptions } from "mongoose";
import {
    MenuCreatableParams,
    MenuEditableParams,
    MenuQueryableParams,
    Operator,
    OperatorRole,
} from "karikarihelper";

// Models
import { MenuModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

export class MenuService {
    public static visibleParameters = [
        "title",
        "icon",
        "roles",
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
            select: ["title", "icon", "roles", "route", "children"],
            populate: {
                path: "children",
                select: ["title", "icon", "route"],
            },
        },
    ] as PopulateOptions[];

    public static async query(operator: Operator, values: MenuQueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            query.push({
                _id: values.id,
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

        query.push({
            roles: {
                $in:
                    operator.role === OperatorRole.ADMIN
                        ? ["", ...Object.values(OperatorRole)]
                        : ["", operator.role],
            },
        });

        return await MenuModel.find(
            query.length === 0
                ? null
                : {
                      $and: query,
                  }
        )
            .select(MenuService.visibleParameters)
            .sort("title")
            .populate(MenuService._getPopulateOptions(operator));
    }

    public static async querySelf(operator: Operator) {
        await DatabaseService.getConnection();

        const query = [];

        query.push({
            parent: null,
        });

        query.push({
            roles: {
                $in:
                    operator.role === OperatorRole.ADMIN
                        ? ["", ...Object.values(OperatorRole)]
                        : ["", operator.role],
            },
        });

        return await MenuModel.find({
            $and: query,
        })
            .select(MenuService.visibleParameters)
            .sort("title")
            .populate(MenuService._getPopulateOptions(operator));
    }

    public static async save(values: MenuCreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new MenuModel();

        newEntry.title = values.title?.trim();
        newEntry.icon = values.icon?.trim();
        newEntry.route = StringService.removeLeadingAndTrailingSlashes(
            values.route
        );
        newEntry.parent = StringService.toObjectId(values.parentId);

        if (newEntry.parent) {
            await MenuModel.findByIdAndUpdate(
                newEntry.parent,
                {
                    route: undefined,
                    $push: {
                        children: newEntry._id,
                    },
                },
                { new: true, runValidators: true }
            );
        }

        await newEntry.save();

        return MenuModel.findById(newEntry._id)
            .select(MenuService.visibleParameters)
            .populate(MenuService._populateOptions);
    }

    public static async update(id: string, values: MenuEditableParams) {
        await DatabaseService.getConnection();

        values.title = values.title?.trim();
        values.icon = values.icon?.trim();
        values.route = StringService.removeLeadingAndTrailingSlashes(
            values.route
        );

        const menuId = StringService.toObjectId(id);

        const currentMenu = await MenuModel.findById(menuId);

        return MenuModel.findByIdAndUpdate(
            menuId,
            {
                $set: {
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

    private static _getPopulateOptions(operator: Operator) {
        return [
            {
                path: "parent",
                select: "title",
            },
            {
                path: "children",
                select: ["title", "icon", "roles", "route", "children"],
                match: {
                    roles: {
                        $in: ["", operator.role],
                    },
                },
                populate: {
                    path: "children",
                    select: ["title", "icon", "roles", "route"],
                    match: {
                        roles: {
                            $in: ["", operator.role],
                        },
                    },
                },
            },
        ] as PopulateOptions[];
    }
}
