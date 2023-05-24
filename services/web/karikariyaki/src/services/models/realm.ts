import {
    RealmCreatableParams,
    RealmEditableParams,
    RealmQueryableParams,
} from "karikarihelper";

// Models
import { RealmModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

export class RealmService {
    public static visibleParameters = ["name"];

    public static async query(values: RealmQueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            query.push({
                _id: values.id,
            });
        }

        if (values.name) {
            query.push({
                name: DatabaseService.generateBroadQuery(values.name),
            });
        }

        return RealmModel.find(
            query.length === 0 ? null : { $or: query }
        ).select(RealmService.visibleParameters);
    }

    public static async save(values: RealmCreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new RealmModel();

        newEntry.name = values.name.trim();

        await newEntry.save();

        return RealmModel.findById(newEntry._id).select(
            RealmService.visibleParameters
        );
    }

    public static async update(id: string, values: RealmEditableParams) {
        await DatabaseService.getConnection();

        values.name = values.name?.trim();

        return RealmModel.findByIdAndUpdate(
            StringService.toObjectId(id),
            {
                $set: {
                    name: values.name?.trim(),
                },
            },
            { new: true, runValidators: true }
        ).select(RealmService.visibleParameters);
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        const realmObjectId = StringService.toObjectId(id);

        return RealmModel.findByIdAndDelete(realmObjectId).select(
            RealmService.visibleParameters
        );
    }
}
