import { PopulateOptions } from "mongoose";
import {
    OperatorCreatableParams,
    OperatorEditableParams,
    OperatorQueryableParams,
} from "karikarihelper";

// Models
import { OperatorModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

export class OperatorService {
    public static visibleParameters = ["displayName", "realm", "photo"];

    private static _populateOptions = {
        path: "realm",
        select: "name",
    } as PopulateOptions;

    public static async query(values: OperatorQueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            query.push({
                _id: StringService.toObjectId(values.id),
            });
        }

        if (values.displayName) {
            query.push({
                displayName: DatabaseService.generateBroadQuery(
                    values.displayName
                ),
            });
        }

        if (values.realmId) {
            query.push({
                realm: StringService.toObjectId(values.realmId),
            });
        }

        return await OperatorModel.find(
            query.length === 0 ? null : { $or: query }
        )
            .select(OperatorService.visibleParameters)
            .populate(OperatorService._populateOptions);
    }

    public static async queryByUserName(userName: string) {
        await DatabaseService.getConnection();

        return await OperatorModel.findOne({ userName: userName }).select(
            OperatorService.visibleParameters
        );
    }

    public static async save(values: OperatorCreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new OperatorModel();

        newEntry.userName = values.userName;
        newEntry.displayName = values.displayName;
        newEntry.realm = StringService.toObjectId(values.realmId);
        newEntry.photo = values.photo;

        await newEntry.save();

        return OperatorModel.findById(newEntry._id)
            .select(OperatorService.visibleParameters)
            .populate(OperatorService._populateOptions);
    }

    public static async update(id: string, values: OperatorEditableParams) {
        await DatabaseService.getConnection();

        values.displayName = values.displayName?.trim();
        values.photo = values.photo ?? undefined;

        return OperatorModel.findByIdAndUpdate(
            StringService.toObjectId(id),
            {
                $set: {
                    displayName: values.displayName,
                    photo: values.photo,
                },
            },
            { new: true, runValidators: true }
        )
            .select(OperatorService.visibleParameters)
            .populate(OperatorService._populateOptions);
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        return OperatorModel.findByIdAndDelete(StringService.toObjectId(id))
            .select(OperatorService.visibleParameters)
            .populate(OperatorService._populateOptions);
    }
}
