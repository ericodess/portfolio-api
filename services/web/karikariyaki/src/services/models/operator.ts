import { PopulateOptions, Types } from "mongoose";

// Models
import { EventModel, OperatorModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

interface DefaultParams {
    id?: string;
    userName?: string;
    displayName?: string;
    photo?: string;
}

type QueryableParams = Omit<DefaultParams, "photo">;

type CreatableParams = Omit<DefaultParams, "id">;

type EditableParams = Omit<DefaultParams, "id" | "userName">;

export class OperatorService {
    public static visibleParameters = ["userName", "displayName", "photo"];

    public static async queryAll() {
        await DatabaseService.getConnection();

        return OperatorModel.find().select(OperatorService.visibleParameters);
    }

    public static async query(values: QueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            return await EventModel.findById(values.id.trim()).select(
                OperatorService.visibleParameters
            );
        }

        if (values.userName) {
            query.push({
                name: values.userName.trim(),
            });
        }

        if (values.displayName) {
            query.push({
                date: values.displayName.trim(),
            });
        }

        return await OperatorModel.find(
            query.length === 0 ? null : { $or: query }
        ).select(OperatorService.visibleParameters);
    }

    public static async save(values: CreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new OperatorModel();

        newEntry.userName = values.userName;
        newEntry.displayName = values.displayName;
        newEntry.photo = values.photo;

        return newEntry.save();
    }

    public static async update(id: string, values: EditableParams) {
        await DatabaseService.getConnection();

        values.displayName = values.displayName.trim();

        return EventModel.findByIdAndUpdate(
            StringService.toObjectId(id),
            { $set: values },
            { new: true, runValidators: true }
        ).select(OperatorService.visibleParameters);
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        return EventModel.findByIdAndDelete(StringService.toObjectId(id));
    }
}
