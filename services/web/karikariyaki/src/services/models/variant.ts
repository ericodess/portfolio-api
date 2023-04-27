import { PopulateOptions, Types } from "mongoose";

// Models
import { VariantModel } from "@models";

// Services
import { DatabaseService, RequestService } from "@services";

interface Params {
    id?: string;
    name?: string;
    product?: string;
}

type EditableParams = Omit<Params, "id">;

export class VariantService {
    public static visibleParameters = ["name", "product"];

    private static _populateOptions = {
        path: "product",
        select: "name",
    } as PopulateOptions;

    public static async queryAll() {
        await DatabaseService.getConnection();

        return VariantModel.find().select(VariantService.visibleParameters);
    }

    public static async query(values: Params) {
        const query = [];

        await DatabaseService.getConnection();

        if (values.id) {
            return VariantModel.findById(values.id.trim())
                .select(VariantService.visibleParameters)
                .populate(VariantService._populateOptions);
        }

        if (values.name) {
            query.push({
                name: DatabaseService.generateBroadQuery(values.name),
            });
        }

        if (values.product) {
            query.push({ product: values.product.trim() });
        }

        return VariantModel.find(query.length === 0 ? null : { $or: query })
            .select(VariantService.visibleParameters)
            .populate(VariantService._populateOptions);
    }

    //TODO Fix backwards saving => Saving of the entry at ref entry
    public static async save(values: EditableParams) {
        await DatabaseService.getConnection();

        const newProductVariant = new VariantModel();

        newProductVariant.name = values.name.trim();
        newProductVariant.product = new Types.ObjectId(values.product.trim());

        return newProductVariant.save();
    }

    //TODO Fix backwards update => Update of the entry at ref entry
    public static async update(id: string, values: EditableParams) {
        await DatabaseService.getConnection();

        values.name = values.name?.trim();
        values.product = values.product?.trim();

        return VariantModel.findByIdAndUpdate(
            id.trim(),
            { $set: values },
            { new: true, runValidators: true }
        ).populate(VariantService._populateOptions);
    }

    //TODO Fix backwards deletion => Deletion of the entry at ref entry
    public static async delete(id: string) {
        await DatabaseService.getConnection();

        return VariantModel.findByIdAndDelete(id.trim());
    }
}
