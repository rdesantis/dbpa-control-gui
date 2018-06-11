import { ScheduleConfig, RecurrenceMode, DateUnit, LogicalOrdinal, LogicalDay, TimeUnit } from './schedule-config';
import { timingSafeEqual } from 'crypto';

/**
 * Many of the fields of ScheduleConfig cannot be directly bound to the values of HTML elements
 * that would represent them.  For those fields, this class contains proxy fields that can
 * be bound to HTML elements.  Use the from(ScheduleConfig) and to(ScheduleConfig) methods
 * to convert ScheduleConfigBindable from and to ScheduleConfig.
 */
export class ScheduleConfigBindable {
  dateMode: boolean[] = new Array<boolean>(3);
  dateRecurrence: boolean[] = new Array<boolean>(3);

  onetimeDate: string;
  fromDate: string;
  toDate: string;

  dateUnit: string;
  logicalOrdinal: string;
  logicalDay: string;

  timeMode: boolean[] = new Array<boolean>(3);

  onetimeTime: string;
  fromTime: string;
  toTime: string;

  timeUnit: string;

  public from(config: ScheduleConfig) {
    this.dateMode.fill(false, 0, 3);
    this.dateMode[config.dateMode] = true;

    this.dateRecurrence.fill(false, 0, 3);
    this.dateRecurrence[config.dateRecurrence] = true;

    this.onetimeDate = this.valueFromDate(config.onetimeDate);
    this.fromDate = this.valueFromDate(config.fromDate);
    this.toDate = this.valueFromDate(config.toDate);

    this.dateUnit = DateUnit[config.dateUnit];
    this.logicalOrdinal = LogicalOrdinal[config.logicalOrdinal];
    this.logicalDay = LogicalDay[config.logicalDay];

    this.timeMode.fill(false, 0, 3);
    this.timeMode[config.timeMode] = true;

    this.onetimeTime = this.valueFromTime(config.onetimeTime);
    this.fromTime = this.valueFromTime(config.fromTime);
    this.toTime = this.valueFromTime(config.toTime);

    this.timeUnit = TimeUnit[config.timeUnit];
  }

  public to(config: ScheduleConfig) {
    // this.dateMode is a one-way binding; config.dateMode gets set directly.
    // this.dateRecurrence is a one-way binding; config.dateRecurrence gets set directly.

    config.onetimeDate = this.dateFromValue(this.onetimeDate);
    config.fromDate = this.dateFromValue(this.fromDate);
    config.toDate = this.dateFromValue(this.toDate);

    config.dateUnit = DateUnit[this.dateUnit];
    config.logicalOrdinal = LogicalOrdinal[this.logicalOrdinal];
    config.logicalDay = LogicalDay[this.logicalDay];

    // this.timeMode is a one-way binding; config.timeMode gets set directly.

    config.onetimeTime = this.timeFromValue(this.onetimeTime);
    config.fromTime = this.timeFromValue(this.fromTime);
    config.toTime = this.timeFromValue(this.toTime);

    config.timeUnit = TimeUnit[this.timeUnit];
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
