import { ScheduleConfig } from './schedule-config';

/**
 * Many of the fields of ScheduleConfig cannot be directly bound to the values of HTML elements
 * that would represent them.  For those fields, this class contains proxy fields that can
 * be bound to HTML elements.  Use the from(ScheduleConfig) and to(ScheduleConfig) methods
 * to convert ScheduleConfigBindable from and to ScheduleConfig.
 */
export class ScheduleConfigBindable {
  onetimeDate: string;
  fromDate: string;
  toDate: string;

  onetimeTime: string;
  fromTime: string;
  toTime: string;

  public from(config: ScheduleConfig) {
    this.onetimeDate = this.valueFromDate(config.onetimeDate);
    this.fromDate = this.valueFromDate(config.fromDate);
    this.toDate = this.valueFromDate(config.toDate);

    this.onetimeTime = this.valueFromTime(config.onetimeTime);
    this.fromTime = this.valueFromTime(config.fromTime);
    this.toTime = this.valueFromTime(config.toTime);
  }

  public to(config: ScheduleConfig) {
    config.onetimeDate = this.dateFromValue(this.onetimeDate);
    config.fromDate = this.dateFromValue(this.fromDate);
    config.toDate = this.dateFromValue(this.toDate);

    config.onetimeTime = this.timeFromValue(this.onetimeTime);
    config.fromTime = this.timeFromValue(this.fromTime);
    config.toTime = this.timeFromValue(this.toTime);
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
