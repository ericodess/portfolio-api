import { Types } from "mongoose";

// Models
import { ProductModel } from "@models";

// Services
import { DatabaseService } from "@services";

interface Params {
    id?: string;
    name?: string;
    variants?: Types.ObjectId[];
}

interface EditableParams extends Omit<Params, "id"> {}

export class ProductService {
    public static visibleParameters = ["name", "variants"];

    private static _populateOptions = {
        paths: "variants",
        map: "name",
    };

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
            ).populate(
                ProductService._populateOptions.paths,
                ProductService._populateOptions.map
            );
        }

        if (values.name) {
            query.push({
                name: DatabaseService.generateCaseInsensivitySettings(
                    values.name
                ),
            });
        }

        if (values.variants) {
            query.push({ variants: values.variants });
        }

        return await ProductModel.find(
            query.length === 0 ? null : { $or: query }
        )
            .select(ProductService.visibleParameters)
            .populate(
                ProductService._populateOptions.paths,
                ProductService._populateOptions.map
            );
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
            .populate(
                ProductService._populateOptions.paths,
                ProductService._populateOptions.map
            );
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        return ProductModel.findByIdAndDelete(id.trim()).populate(
            ProductService._populateOptions.paths,
            ProductService._populateOptions.map
        );
    }
}
