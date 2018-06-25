export class LocalDateTime {
    public static getYear(dateTime: number[]): number {
        return dateTime[0];
    }

    public static getMonth(dateTime: number[]): number {
        return dateTime[1];
    }

    public static getDayOfMonth(dateTime: number[]): number {
        return dateTime[2];
    }

    public static getHour(dateTime: number[]): number {
        return dateTime[3];
    }

    public static getMinute(dateTime: number[]): number {
        return dateTime[4];
    }

    public static getSecond(dateTime: number[]): number {
        return dateTime[5];
    }

    public static toString(dateTime: number[]): string {
        if (dateTime === null || dateTime.length < 6) {
            return "";
        }
        else {
            let hour: number = this.getHour(dateTime);
            let am_pm: string = (hour < 12) ? 'AM' : 'PM';
            if (hour === 0) {
                hour = 12;
            }
            else if (12 < hour) {
                hour -= 12;
            }
            let result: string =
                `${this.getYear(dateTime)}-${this.twoDigits(this.getMonth(dateTime))}-${this.twoDigits(this.getDayOfMonth(dateTime))} ` +
                `${this.twoDigits(hour)}:${this.twoDigits(this.getMinute(dateTime))}:${this.twoDigits(this.getSecond(dateTime))} ${am_pm}`;
            return result;
        }
    }

    private static twoDigits(i: number): string {
        return ("0" + i).slice(-2);
    }
}