import { PopulateOptions } from "mongoose";

// Models
import { ProductModel, VariantModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

interface DefaultParams {
    id?: string;
    name?: string;
    productId?: string;
}

type QueryableParams = DefaultParams;

type CreatableParams = Omit<DefaultParams, "id">;

type EditableParams = Pick<DefaultParams, "name">;

export class VariantService {
    public static visibleParameters = ["name", "product"];

    private static _populateOptions = {
        path: "product",
        select: "name",
    } as PopulateOptions;

    public static async query(values: QueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            return VariantModel.findById(StringService.toObjectId(values.id))
                .select(VariantService.visibleParameters)
                .populate(VariantService._populateOptions);
        }

        if (values.name) {
            query.push({
                name: DatabaseService.generateBroadQuery(values.name),
            });
        }

        if (values.productId) {
            query.push({ product: StringService.toObjectId(values.productId) });
        }

        return VariantModel.find(query.length === 0 ? null : { $or: query })
            .select(VariantService.visibleParameters)
            .populate(VariantService._populateOptions);
    }

    public static async save(values: CreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new VariantModel();

        newEntry.name = values.name.trim();
        newEntry.product = StringService.toObjectId(values.productId);

        await ProductModel.findByIdAndUpdate(
            newEntry.product,
            {
                $push: {
                    variants: newEntry._id,
                },
            },
            { runValidators: true }
        );

        await newEntry.save();

        return VariantModel.findById(newEntry._id)
            .select(VariantService.visibleParameters)
            .populate(VariantService._populateOptions);
    }

    public static async update(id: string, values: EditableParams) {
        await DatabaseService.getConnection();

        values.name = values.name?.trim();

        return VariantModel.findByIdAndUpdate(
            StringService.toObjectId(id),
            {
                $set: {
                    name: values.name?.trim(),
                },
            },
            { new: true, runValidators: true }
        ).populate(VariantService._populateOptions);
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        const variantObjectId = StringService.toObjectId(id);

        await ProductModel.findOneAndUpdate(
            {
                variants: variantObjectId,
            },
            {
                $pull: {
                    variants: variantObjectId,
                },
            }
        );

        return VariantModel.findByIdAndDelete(variantObjectId)
            .select(VariantService.visibleParameters)
            .populate(VariantService._populateOptions);
    }
}
