export enum RecurrenceMode { onetime, recurring, immediate }
export enum DateUnit { day, weekday, week, month }
export enum DateRecurrence { daysOfWeek, ordinalDay, logicalDay }
export enum LogicalOrdinal { first, second, third, fourth, last }
export enum LogicalDay { day = -1, sunday, monday, tuesday, wednesday, thursday, friday, saturday, weekday }
export enum TimeUnit { hour, minute, second }

export class ScheduleConfig {
    dateMode: RecurrenceMode;

    onetimeDate: Date;

    dateFrequency: number;
    dateUnit: DateUnit;
    dateRecurrence: DateRecurrence;

    days: boolean[];

    numericOrdinal: number;

    logicalOrdinal: LogicalOrdinal;
    logicalDay: LogicalDay;

    fromDate: Date;
    toDate: Date;

    timeMode: RecurrenceMode;

    onetimeTime: Date;

    timeFrequency: number;
    timeUnit: TimeUnit;
    fromTime: Date;
    toTime: Date;

    constructor() {
        this.dateMode = RecurrenceMode.recurring;
        this.onetimeDate = new Date();
        this.dateFrequency = 1;
        this.dateUnit = DateUnit.day;
        this.dateRecurrence = null;
        this.days = [false, false, false, false, false, false, false];
        this.numericOrdinal = 1;
        this.logicalOrdinal = LogicalOrdinal.first;
        this.logicalDay = LogicalDay.day;
        this.fromDate = null;
        this.toDate = null;
        this.timeMode = RecurrenceMode.onetime;
        this.onetimeTime = new Date(1970, 0, 1, 12, 0, 0);
        this.timeFrequency = 1;
        this.timeUnit = TimeUnit.hour;
        this.fromTime = null;
        this.toTime = null;
    }

    public render(): string {
        let result: string = ``;
        switch (this.dateMode) {
            case RecurrenceMode.onetime:
                result = `Date '${this.renderDate(this.onetimeDate)}'`;
                break;
            case RecurrenceMode.recurring:
                result = `Every ${this.renderFrequency(this.dateFrequency) + this.renderDateUnit(this.dateFrequency, this.dateUnit)}`;
                if (this.dateRecurrence !== null) {
                    result += ` on `;
                    switch (this.dateRecurrence) {
                        case DateRecurrence.daysOfWeek:
                            result += this.renderDaysOfWeek(this.days); break;
                        case DateRecurrence.ordinalDay:
                            result += `day ${this.numericOrdinal}`; break;
                        case DateRecurrence.logicalDay:
                            result += `${this.renderLogicalOrdinal(this.logicalOrdinal) + this.renderLogicalDay(this.logicalDay)}`; break;
                    }
                }
                result
                        += ((this.fromDate !== null) ? ` from '${this.renderDate(this.fromDate)}'` : ``)
                        + ((this.toDate !== null) ? ` to '${this.renderDate(this.toDate)}'` : ``);
                break;
            case RecurrenceMode.immediate:
                result = `Today`;
                break;
        }
        result += ` `;
        switch (this.timeMode) {
            case RecurrenceMode.onetime:
                result += `at '${this.renderTime(this.onetimeTime)}'`;
                break;
            case RecurrenceMode.recurring:
                result +=
                        `every ${this.renderFrequency(this.timeFrequency) + this.renderTimeUnit(this.timeFrequency, this.timeUnit)}`
                        + ((this.fromTime !== null) ? ` from '${this.renderTime(this.fromTime)}'` : ``)
                        + ((this.toTime !== null) ? ` to '${this.renderTime(this.toTime)}'` : ``);
                break;
            case RecurrenceMode.immediate:
                result += `now`;
                break;
        }
        return result;
    }

    private renderDate(date: Date): string {
        return `${(date.getMonth() + 1).toString()}/${date.getDate().toString()}/${date.getFullYear().toString()}`;
    }

    private renderTime(time: Date): string {
        let hours: number = time.getHours();
        let minutes: number = time.getMinutes();
        let ampm: string = `AM`;
        if (0 === hours) {
            hours = 12;
        }
        else if (12 <= hours) {
            ampm = `PM`;
            if (12 < hours) {
                hours -= 12;
            }
        }
        return `${hours}:${this.twoDigits(minutes)} ${ampm}`;
    }

    private renderFrequency(frequency: number): string {
        return (frequency !== 1) ? frequency.toString() + ` `: ``;
    }

    private renderDateUnit(dateFrequency: number, dateUnit: DateUnit): string {
        let result: string;
        switch (dateUnit) {
            case DateUnit.day: result = `day`; break;
            case DateUnit.weekday: result = `weekday`; break;
            case DateUnit.week: result = `week`; break;
            case DateUnit.month: result = `month`; break;
        }
        if (dateFrequency !== 1) {
            result += `s`;
        }
        return result;
    }

    private renderTimeUnit(timeFrequency: number, timeUnit: TimeUnit): string {
        let result: string;
        switch (timeUnit) {
            case TimeUnit.hour: result = `hour`; break;
            case TimeUnit.minute: result = `minute`; break;
            case TimeUnit.second: result = `second`; break;
        }
        if (timeFrequency !== 1) {
            result += `s`;
        }
        return result;
    }

    private renderDaysOfWeek(days: boolean[]): string {
        let result: string = ``;
        let delimiter: string = ``;
        for (let i = 0; i < 7; ++i) {
            if (days[i]) {
                result += delimiter + this.renderDayOfWeek(i);
                delimiter = `, `;
            }
        }
        return result;
    }

    private renderDayOfWeek(day: number): string {
        switch (day) {
            case 0: return `Sunday`;
            case 1: return `Monday`;
            case 2: return `Tuesday`;
            case 3: return `Wednesday`;
            case 4: return `Thursday`;
            case 5: return `Friday`;
            case 6: return `Saturday`;
        }
    }

    private renderLogicalOrdinal(ordinal: LogicalOrdinal): string {
        let result: string;
        switch (ordinal) {
            case LogicalOrdinal.first: result = `first`; break;
            case LogicalOrdinal.second: result = `second`; break;
            case LogicalOrdinal.third: result = `third`; break;
            case LogicalOrdinal.fourth: result = `fourth`; break;
            case LogicalOrdinal.last: result = `last`; break;
        }
        return result + ` `;
    }

    private renderLogicalDay(day: LogicalDay): string {
        let result: string;
        switch (day) {
            case LogicalDay.day: return `day`;
            case LogicalDay.weekday: return `weekday`;
            default: return this.renderDayOfWeek(day);
        }
    }

    private twoDigits(value: number): string {
        return ("0" + value.toString()).slice(-2);
    }
}
