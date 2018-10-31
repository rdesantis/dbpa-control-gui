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
        return (dateTime.length < 4) ? 0 : dateTime[3];
    }

    public static getMinute(dateTime: number[]): number {
        return (dateTime.length < 5) ? 0 : dateTime[4];
    }

    public static getSecond(dateTime: number[]): number {
        return (dateTime.length < 6) ? 0 : dateTime[5];
    }

    public static getMs(dateTime: number[]): number {
        return (dateTime.length < 7) ? 0 : dateTime[6] / 1000000;
    }

    public static toString(dateTime: number[]): string {
        if (dateTime === null || dateTime.length < 3) {
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

    public static toDate(dateTime: number[]): Date {
        return new Date(
                this.getYear(dateTime), this.getMonth(dateTime) - 1, this.getDayOfMonth(dateTime),
                this.getHour(dateTime),this.getMinute(dateTime), this.getSecond(dateTime), this.getMs(dateTime));
    }

    public static until(startDateTime: number[], endDateTime: number[]): string {
        if (startDateTime === null || endDateTime === null) {
            return ``;
        }

        let hasMilliPrecision: boolean = (startDateTime.length === 7) || (endDateTime.length === 7);
        let millis: number = this.toDate(endDateTime).getTime() - this.toDate(startDateTime).getTime();

		let seconds: number = Math.floor(millis / 1000);
		let minutes: number = Math.floor(seconds / 60);
		let hours: number = Math.floor(minutes / 60);
		let days: number = Math.floor(hours / 24);

        let result: string =
                `${days} days ${this.twoDigits(hours % 24)}:${this.twoDigits(minutes % 60)}:${this.twoDigits(seconds % 60)}` +
                (hasMilliPrecision ? `.${this.digits(3, millis % 1000)}` : ``);
        return result;
    }

    public static now(): number[] {
        const now: Date = new Date();
        let nowDateTime: number[] = [
                now.getFullYear(),
                now.getMonth() + 1,
                now.getDate(),
                now.getHours(),
                now.getMinutes(),
                now.getSeconds(),
                now.getMilliseconds()];
        return nowDateTime;
    }

    private static digits(d: number, i: number): string {
        return ("000" + i).slice(-d);
    }

    private static twoDigits(i: number): string {
        return this.digits(2, i);
    }
}