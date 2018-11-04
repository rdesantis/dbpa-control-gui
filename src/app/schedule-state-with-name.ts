import {ScheduleState } from './schedule-state';

export class ScheduleStateWithName {
    constructor(public name: string, public state: ScheduleState) {}
}
