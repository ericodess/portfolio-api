export class DateService {
    public static standarizeCurrentDate(targetDate = new Date()): Date {
        const standarizedDate = new Date(targetDate.getTime());

        standarizedDate.setHours(0, 0, 0, 0);

        return standarizedDate;
    }

    public static isSameDate(target: Date, current: Date): boolean {
        const broadTargetDate = new Date(target.toISOString().split("T")[0]);
        const broadCurrentDate = new Date(current.toISOString().split("T")[0]);

        return (
            broadTargetDate.getDate() === broadCurrentDate.getDate() &&
            broadTargetDate.getMonth() === broadCurrentDate.getMonth() &&
            broadTargetDate.getFullYear() === broadCurrentDate.getFullYear()
        );
    }
}
