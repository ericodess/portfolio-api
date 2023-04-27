import { PopulateOptions, Types } from "mongoose";

// Models
import { ProductModel } from "@models";

// Services
import { DatabaseService, RequestService } from "@services";

interface Params {
    id?: string;
    name?: string;
    variants?: Types.ObjectId[];
}

type EditableParams = Omit<Params, "id">;

export class ProductService {
    public static visibleParameters = ["name", "variants"];

    private static _populateOptions = {
        path: "variants",
        select: "name",
    } as PopulateOptions;

    public static async queryAll() {
        await DatabaseService.getConnection();

        return ProductModel.find().select(ProductService.visibleParameters);
    }

    public static async query(values: Params) {
        const query = [];

        await DatabaseService.getConnection();

        if (values.id) {
            return (
                await ProductModel.findById(values.id.trim()).select(
                    ProductService.visibleParameters
                )
            ).populate(ProductService._populateOptions);
        }

        if (values.name) {
            query.push({
                name: DatabaseService.generateBroadQuery(values.name),
            });
        }

        if (values.variants) {
            query.push({ variants: values.variants });
        }

        return await ProductModel.find(
            query.length === 0 ? null : { $or: query }
        )
            .select(ProductService.visibleParameters)
            .populate(ProductService._populateOptions);
    }

    public static async save(values: EditableParams) {
        await DatabaseService.getConnection();

        const newEntry = new ProductModel();

        newEntry.name = values.name.trim();
        newEntry.variants = values.variants;

        return newEntry.save();
    }

    public static async update(
        id: string,
        values: EditableParams,
        willAppendVariantIds = false
    ) {
        await DatabaseService.getConnection();

        values.name = values.name?.trim();

        if (values.variants && willAppendVariantIds) {
            const productToBeUpdated = await ProductModel.findById(id);

            values.variants = productToBeUpdated.variants.concat(
                values.variants
            );
        }

        return ProductModel.findByIdAndUpdate(
            id.trim(),
            { $set: values },
            { new: true, runValidators: true }
        )
            .select(ProductService.visibleParameters)
            .populate(ProductService._populateOptions);
    }

    //TODO Fix backwards deletion => Deletion of the entry at ref entry
    public static async delete(id: string) {
        await DatabaseService.getConnection();

        return ProductModel.findByIdAndDelete(id.trim());
    }
}
