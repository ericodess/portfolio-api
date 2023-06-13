import { PopulateOptions } from "mongoose";
import {
    Operator,
    OperatorCreatableParams,
    OperatorEditableParams,
    OperatorQueryableParams,
    OperatorRole,
} from "karikarihelper";

// Models
import { OperatorErrors, OperatorModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";
import { InHouseError } from "@types";

export class OperatorService {
    public static visibleParameters = ["displayName", "role", "realm", "photo"];

    private static _populateOptions = {
        path: "realm",
        select: "name",
    } as PopulateOptions;

    public static async query(
        operator: Operator,
        values: OperatorQueryableParams
    ) {
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

        let realmQuery = {
            realm: StringService.toObjectId(operator.realm._id),
        };

        if (operator.role === OperatorRole.ADMIN) {
            realmQuery = null;

            if (values.realmId) {
                realmQuery = {
                    realm: StringService.toObjectId(values.realmId),
                };
            }
        }

        if (realmQuery) {
            query.push(realmQuery);
        }

        return await OperatorModel.find(
            query.length === 0 ? null : { $and: query }
        )
            .select(OperatorService.visibleParameters)
            .populate(OperatorService._populateOptions);
    }

    public static async queryId(id: string) {
        await DatabaseService.getConnection();

        return await OperatorModel.findById(id)
            .select(OperatorService.visibleParameters)
            .populate(OperatorService._populateOptions);
    }

    public static async queryByUserName(userName: string) {
        await DatabaseService.getConnection();

        return await OperatorModel.findOne({ userName: userName })
            .select(OperatorService.visibleParameters)
            .populate(OperatorService._populateOptions);
    }

    public static async save(
        operator: Operator,
        values: OperatorCreatableParams
    ) {
        await DatabaseService.getConnection();

        const newEntry = new OperatorModel();

        newEntry.userName = values.userName;
        newEntry.displayName = values.displayName;
        newEntry.realm = StringService.toObjectId(
            operator.role === OperatorRole.ADMIN
                ? values.realmId
                : operator.realm._id
        );
        newEntry.photo = values.photo;

        await newEntry.save();

        return OperatorModel.findById(newEntry._id)
            .select(OperatorService.visibleParameters)
            .populate(OperatorService._populateOptions);
    }

    public static async update(
        operator: Operator,
        id: string,
        values: OperatorEditableParams
    ) {
        await DatabaseService.getConnection();

        if (operator.role !== OperatorRole.ADMIN) {
            const foundOperator = await OperatorModel.findById(id);

            if (operator.realm._id !== foundOperator.realm._id.toString()) {
                throw new InHouseError(OperatorErrors.FORBIDDEN, 403);
            }
        }

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

    public static async delete(operator: Operator, id: string) {
        await DatabaseService.getConnection();

        if (operator.role !== OperatorRole.ADMIN) {
            const foundOperator = await OperatorModel.findById(id);

            if (operator.realm._id !== foundOperator.realm._id.toString()) {
                throw new InHouseError(OperatorErrors.FORBIDDEN, 403);
            }
        }

        return OperatorModel.findByIdAndDelete(StringService.toObjectId(id))
            .select(OperatorService.visibleParameters)
            .populate(OperatorService._populateOptions);
    }
}
