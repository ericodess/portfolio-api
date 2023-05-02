import { PopulateOptions } from "mongoose";

// Models
import { MenuModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

interface DefaultParams {
    id?: string;
    title?: string;
    route?: string;
    parentId?: string;
}

type QueryableParams = DefaultParams;

type CreatableParams = Omit<DefaultParams, "id">;

type EditableParams = Pick<DefaultParams, "title" | "route">;

export class MenuService {
    public static visibleParameters = ["title", "route", "parent", "children"];

    private static _populateOptions = [
        {
            path: "parent",
            select: "route",
        },
        {
            path: "children",
            select: "route",
        },
    ] as PopulateOptions[];

    public static async query(values: QueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            query.push({
                _id: StringService.toObjectId(values.id),
            });
        }

        if (values.title) {
            query.push({
                title: DatabaseService.generateBroadQuery(values.title),
            });
        }

        if (values.route) {
            query.push({
                route: DatabaseService.generateBroadQuery(values.route),
            });
        }

        if (values.parentId) {
            query.push({
                parent: StringService.toObjectId(values.parentId),
            });
        }

        return await MenuModel.find(query.length === 0 ? null : { $or: query })
            .select(MenuService.visibleParameters)
            .populate(MenuService._populateOptions);
    }

    public static async save(values: CreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new MenuModel();

        newEntry.title = values.title?.trim();
        newEntry.route = StringService.removeLeadingAndTrailingSlashes(
            values.route
        );
        newEntry.parent = StringService.toObjectId(values.parentId);

        if (newEntry.parent) {
            await MenuModel.findByIdAndUpdate(
                newEntry.parent,
                {
                    $push: {
                        children: newEntry._id,
                    },
                },
                { runValidators: true }
            );
        }

        await newEntry.save();

        return MenuModel.findById(newEntry._id)
            .select(MenuService.visibleParameters)
            .populate(MenuService._populateOptions);
    }

    public static async update(id: string, values: EditableParams) {
        await DatabaseService.getConnection();

        values.title = values.title?.trim();
        values.route = StringService.removeLeadingAndTrailingSlashes(
            values.route
        );

        const menuId = StringService.toObjectId(id);

        return MenuModel.findByIdAndUpdate(
            menuId,
            {
                $set: {
                    title: values.title ?? undefined,
                    route: values.route ?? undefined,
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
