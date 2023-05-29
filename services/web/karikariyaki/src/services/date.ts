import { DateTime } from "luxon";

export class DateService {
    public static standarizeCurrentDate(targetDate = new Date()): Date {
        const standarizedDate = new Date(targetDate.getTime());

        standarizedDate.setHours(0, 0, 0, 0);

        return standarizedDate;
    }

    public static isToday(target: Date): boolean {
        const targetMoment = DateTime.fromISO(
            target.toISOString().split("T")[0]
        ).setZone("America/Danmarkshavn");
        const nowMoment = DateTime.fromISO(
            DateTime.now().toISO().split("T")[0]
        ).setZone("America/Danmarkshavn");

        return targetMoment.diff(nowMoment, "days").days === 0;
    }
}
