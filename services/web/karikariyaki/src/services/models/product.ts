import { PopulateOptions } from "mongoose";
import {
    ProductCreatableParams,
    ProductEditableParams,
    ProductQueryableParams,
} from "karikarihelper";

// Models
import { ProductModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

export class ProductService {
    public static visibleParameters = ["name", "realm", "parent", "variants"];

    private static _populateOptions = [
        {
            path: "realm",
            select: "name",
        },
        {
            path: "parent",
            select: "name",
        },
        {
            path: "variants",
            select: "name",
        },
    ] as PopulateOptions[];

    public static async query(values: ProductQueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            query.push({
                _id: StringService.toObjectId(values.id),
            });
        }

        if (values.name) {
            query.push({
                name: DatabaseService.generateBroadQuery(values.name),
            });
        }

        if (values.realmId) {
            query.push({
                realm: StringService.toObjectId(values.realmId),
            });
        }

        if (values.parentId) {
            query.push({
                parent: StringService.toObjectId(values.parentId),
            });
        }

        return ProductModel.find(query.length === 0 ? null : { $or: query })
            .select(ProductService.visibleParameters)
            .populate(ProductService._populateOptions);
    }

    public static async save(values: ProductCreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new ProductModel();

        newEntry.name = values.name.trim();
        newEntry.realm = StringService.toObjectId(values.realmId);
        newEntry.parent = StringService.toObjectId(values.parentId);

        if (values.parentId) {
            const foundProduct = await ProductModel.findByIdAndUpdate(
                newEntry.parent,
                {
                    $push: {
                        variants: newEntry._id,
                    },
                },
                { new: true, runValidators: true }
            );

            newEntry.realm = foundProduct.realm;
        }

        await newEntry.save();

        return ProductModel.findById(newEntry._id)
            .select(ProductService.visibleParameters)
            .populate(ProductService._populateOptions);
    }

    public static async update(id: string, values: ProductEditableParams) {
        await DatabaseService.getConnection();

        values.name = values.name?.trim();

        return ProductModel.findByIdAndUpdate(
            StringService.toObjectId(id),
            {
                $set: {
                    name: values.name,
                },
            },
            { new: true, runValidators: true }
        )
            .select(ProductService.visibleParameters)
            .populate(ProductService._populateOptions);
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        const productId = StringService.toObjectId(id);

        await ProductModel.deleteMany({
            parent: productId,
        });

        await ProductModel.updateMany(
            {
                variants: productId,
            },
            {
                $pull: {
                    variants: productId,
                },
            }
        );

        return ProductModel.findByIdAndDelete(productId)
            .select(ProductService.visibleParameters)
            .populate(ProductService._populateOptions);
    }
}
