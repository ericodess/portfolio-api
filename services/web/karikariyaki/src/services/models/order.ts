import { PopulateOptions } from "mongoose";
import {
    EventOrderCreatableParams,
    EventOrderEditableParams,
    EventOrderQueryableParams,
} from "karikarihelper";

// Models
import { EventModel, OrderModel } from "@models";

// Services
import { DatabaseService, StringService } from "@services";

export class OrderService {
    public static visibleParameters = ["status", "client"];

    private static _populateOptions = [
        {
            path: "event",
            select: "name date",
        },
        {
            path: "operator",
            select: "displayName",
        },
        {
            path: "item",
            select: "name",
        },
        {
            path: "variant",
            select: "name",
        },
    ] as PopulateOptions[];

    public static async query(values: EventOrderQueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            return (
                await OrderModel.findById(values.id).select(
                    OrderService.visibleParameters
                )
            ).populate(OrderService._populateOptions);
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

        if (values.clientName) {
            query.push({ client: values.clientName });
        }

        if (values.itemId) {
            query.push({ item: values.itemId });
        }

        if (values.variantId) {
            query.push({ variant: values.variantId });
        }

        return await OrderModel.find(query.length === 0 ? null : { $or: query })
            .select(OrderService.visibleParameters)
            .populate(OrderService._populateOptions);
    }

    public static async save(values: EventOrderCreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new OrderModel();

        newEntry.event = StringService.toObjectId(values.eventId);
        newEntry.status = newEntry.status;
        newEntry.operator = StringService.toObjectId(values.operatorId);
        newEntry.client = values.clientName?.trim();
        newEntry.item = StringService.toObjectId(values.itemId);
        newEntry.variant = StringService.toObjectId(values.variantId);

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
