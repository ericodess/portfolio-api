export class DateService {
    public static standarizeCurrentDate(targetDate = new Date()): Date {
        const standarizedDate = new Date(targetDate.getTime());

        standarizedDate.setHours(0, 0, 0, 0);

        return standarizedDate;
    }
}
