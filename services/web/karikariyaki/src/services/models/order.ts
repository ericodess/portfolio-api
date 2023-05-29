import { PopulateOptions } from "mongoose";
import {
    EventOrderCreatableParams,
    EventOrderEditableParams,
    EventOrderQueryableParams,
} from "karikarihelper";

// Models
import { EventModel, OrderModel } from "@models";

// Services
import { DatabaseService, OperatorService, StringService } from "@services";

export class OrderService {
    public static visibleParameters = ["realm", "status", "client"];

    private static _populateOptions = [
        {
            path: "event",
            select: ["name", "date"],
        },
        {
            path: "operator",
            select: "displayName",
        },
        {
            path: "realm",
            select: "name",
        },
        {
            path: "items",
            select: "name",
        },
    ] as PopulateOptions[];

    public static async query(values: EventOrderQueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            query.push({
                _id: values.id,
            });
        }

        if (values.eventId) {
            query.push({ event: values.eventId });
        }

        if (values.status) {
            query.push({ status: values.status });
        }

        if (values.operatorId) {
            query.push({ operator: values.operatorId });
        }

        if (values.realmId) {
            query.push({ realm: values.realmId });
        }

        if (values.clientName) {
            query.push({ client: values.clientName });
        }

        if (values.itemsId) {
            query.push({ items: values.itemsId });
        }

        return await OrderModel.find(
            query.length === 0 ? null : { $and: query }
        )
            .select(OrderService.visibleParameters)
            .populate(OrderService._populateOptions);
    }

    public static async save(values: EventOrderCreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new OrderModel();

        newEntry.event = StringService.toObjectId(values.eventId);
        newEntry.status = newEntry.status;
        newEntry.operator = StringService.toObjectId(values.operatorId);

        const foundOperator = await OperatorService.query({
            id: newEntry.operator.toString(),
        });

        newEntry.realm = foundOperator[0].realm._id;

        newEntry.client = values.clientName?.trim();
        newEntry.items = StringService.toObjectIds(values.itemsId);

        await EventModel.findByIdAndUpdate(
            newEntry.event,
            {
                $push: {
                    orders: newEntry._id,
                },
            },
            { runValidators: true }
        );

        await newEntry.save();

        return OrderModel.findById(newEntry._id)
            .select(OrderService.visibleParameters)
            .populate(OrderService._populateOptions);
    }

    public static async update(id: string, values: EventOrderEditableParams) {
        await DatabaseService.getConnection();

        return OrderModel.findByIdAndUpdate(
            StringService.toObjectId(id),
            {
                $set: {
                    status: values.status,
                },
            },
            { new: true, runValidators: true }
        )
            .select(OrderService.visibleParameters)
            .populate(OrderService._populateOptions);
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        const orderId = StringService.toObjectId(id);

        await EventModel.findOneAndUpdate(
            {
                orders: orderId,
            },
            {
                $pull: {
                    orders: orderId,
                },
            }
        );

        return OrderModel.findByIdAndDelete(orderId)
            .select(OrderService.visibleParameters)
            .populate(OrderService._populateOptions);
    }
}
