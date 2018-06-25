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
        if (dateTime.length < 6) {
            return "";
        }
        else {
            let result: string =
                `${dateTime[0]}-${this.twoDigits(dateTime[1])}-${this.twoDigits(dateTime[2])} ` +
                `${this.twoDigits(dateTime[3])}:${this.twoDigits(dateTime[4])}:${this.twoDigits(dateTime[5])}`;

            return result;
        }
    }

    private static twoDigits(i: number): string {
        return ("0" + i).slice(-2);
    }
}