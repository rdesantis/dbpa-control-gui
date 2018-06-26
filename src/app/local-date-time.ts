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

    public static toDate(startDateTime: number[]): Date {
        return new Date(startDateTime[0], startDateTime[1] - 1, startDateTime[2], startDateTime[3], startDateTime[4], startDateTime[5], startDateTime[6] / 1000000);
    }

    public static until(startDateTime: number[], endDateTime: number[]): string {
        let millis: number = this.toDate(endDateTime).getTime() - this.toDate(startDateTime).getTime();

		let seconds: number = Math.floor(millis / 1000);
		let minutes: number = Math.floor(seconds / 60);
		let hours: number = Math.floor(minutes / 60);
		let days: number = Math.floor(hours / 24);

        let result: string =
                `${days} days ${this.twoDigits(hours % 24)}:${this.twoDigits(minutes % 60)}:${this.twoDigits(seconds % 60)}.${this.digits(3, millis % 1000)}`;
        return result;
    }

    private static digits(d: number, i: number): string {
        return ("000" + i).slice(-d);
    }

    private static twoDigits(i: number): string {
        return this.digits(2, i);
    }
}