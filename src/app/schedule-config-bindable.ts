import { ScheduleConfig, RecurrenceMode, DateUnit, DateRecurrence, LogicalOrdinal, LogicalDay, TimeUnit } from './schedule-config';
import { timingSafeEqual } from 'crypto';

/**
 * Many of the fields of ScheduleConfig cannot be directly bound to the values of HTML elements
 * that would represent them.  For those fields, this class contains proxy fields that can
 * be bound to HTML elements.  Use the from(ScheduleConfig) and to(ScheduleConfig) methods
 * to convert ScheduleConfigBindable from and to ScheduleConfig.
 */
export class ScheduleConfigBindable {
  dateMode: boolean[] = new Array<boolean>(3);

  onetimeDate: string;

  dateFrequency: number;
  dateUnit: string;
  dateRecurrence: boolean[] = new Array<boolean>(3);

  days: boolean[];

  numericOrdinal: number;

  logicalOrdinal: string;
  logicalDay: string;

  fromDate: string;
  toDate: string;

  timeMode: boolean[] = new Array<boolean>(3);

  onetimeTime: string;

  timeFrequency: number;
  timeUnit: string;
  fromTime: string;
  toTime: string;

  public from(config: ScheduleConfig) {
    this.setDateMode(config.dateMode);

    this.onetimeDate = this.valueFromDate(config.onetimeDate);

    this.dateFrequency = config.dateFrequency;
    this.dateUnit = DateUnit[config.dateUnit];
    this.setDateRecurrence(config.dateRecurrence);

    this.days = config.days;

    this.numericOrdinal = config.numericOrdinal;

    this.logicalOrdinal = LogicalOrdinal[config.logicalOrdinal];
    this.logicalDay = LogicalDay[config.logicalDay];

    this.fromDate = this.valueFromDate(config.fromDate);
    this.toDate = this.valueFromDate(config.toDate);

    this.setTimeMode(config.timeMode);

    this.onetimeTime = this.valueFromTime(config.onetimeTime);

    this.timeFrequency = config.timeFrequency;
    this.timeUnit = TimeUnit[config.timeUnit];
    this.fromTime = this.valueFromTime(config.fromTime);
    this.toTime = this.valueFromTime(config.toTime);
  }

  public to(config: ScheduleConfig) {
    config.dateMode = this.dateMode.findIndex(function(x){return x});

    config.onetimeDate = this.dateFromValue(this.onetimeDate);

    config.dateFrequency = this.dateFrequency;
    config.dateUnit = DateUnit[this.dateUnit];
    config.dateRecurrence = this.dateRecurrence.findIndex(function(x){return x});

    config.days = this.days;

    config.numericOrdinal = this.numericOrdinal;

    config.logicalOrdinal = LogicalOrdinal[this.logicalOrdinal];
    config.logicalDay = LogicalDay[this.logicalDay];

    config.fromDate = this.dateFromValue(this.fromDate);
    config.toDate = this.dateFromValue(this.toDate);

    config.timeMode = this.timeMode.findIndex(function(x){return x});

    config.onetimeTime = this.timeFromValue(this.onetimeTime);

    config.timeFrequency = this.timeFrequency;
    config.timeUnit = TimeUnit[this.timeUnit];
    config.fromTime = this.timeFromValue(this.fromTime);
    config.toTime = this.timeFromValue(this.toTime);
  }

  public setDateMode(dateMode: RecurrenceMode): void {
    this.dateMode.fill(false, 0, 3);
    this.dateMode[dateMode] = true;
  }

  public setDateRecurrence(dateRecurrence: DateRecurrence): void {
    this.dateRecurrence.fill(false, 0, 3);
    this.dateRecurrence[dateRecurrence] = true;
  }

  public setTimeMode(timeMode: RecurrenceMode): void {
    this.timeMode.fill(false, 0, 3);
    this.timeMode[timeMode] = true;
  }

  private twoDigits(value: number): string {
    return ("0" + value.toString()).slice(-2);
  }

  private valueFromDate(date: Date): string {
    return (date !== null) ? `${(date.getFullYear()).toString()}-${this.twoDigits(date.getMonth() + 1)}-${this.twoDigits(date.getDate())}` : ``;
  }

  private valueFromTime(time: Date): string {
    return (time !== null) ? `${this.twoDigits(time.getHours())}:${this.twoDigits(time.getMinutes())}` : ``;
  }

  private dateFromValue(value: string): Date {
    return (value !== "") ? new Date(parseInt(value.substring(0, 4)), parseInt(value.substring(5, 7)) - 1, parseInt(value.substring(8, 10))) : null;
  }

  private timeFromValue(value: string): Date {
    return (value !== "") ? new Date(0, 0, 0, parseInt(value.substring(0, 2)), parseInt(value.substring(3, 5))) : null;
  }
}
