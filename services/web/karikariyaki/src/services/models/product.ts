import { PopulateOptions } from "mongoose";
import {
    ProductCreatableParams,
    ProductEditableParams,
    ProductQueryableParams,
} from "karikarihelper";

// Models
import { ProductModel, VariantModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

export class ProductService {
    public static visibleParameters = ["name", "variants"];

    private static _populateOptions = [
        {
            path: "variants",
            select: "name",
        },
        {
            path: "realm",
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

        return await ProductModel.find(
            query.length === 0 ? null : { $or: query }
        )
            .select(ProductService.visibleParameters)
            .populate(ProductService._populateOptions);
    }

    public static async save(values: ProductCreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new ProductModel();

        newEntry.name = values.name.trim();
        newEntry.realm = StringService.toObjectId(values.realmId);

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

        await VariantModel.deleteMany({
            product: productId,
        });

        return ProductModel.findByIdAndDelete(productId)
            .select(ProductService.visibleParameters)
            .populate(ProductService._populateOptions);
    }
}
