export class DateService {
    public static standarizeCurrentDate(targetDate = new Date()): Date {
        return new Date(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate()
        );
    }
}
