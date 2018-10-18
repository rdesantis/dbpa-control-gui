import { Job } from './job';
import { ScriptArgument } from './script-argument';

export class JobWithName {
    constructor(public name: string, public job: Job) {}

    getArguments(fillTo: number = undefined): ScriptArgument[] {
        let currentLength: number = this.job["arguments"].length;
        if (fillTo == undefined || fillTo <= currentLength) {
            return this.job["arguments"];
        }
        else {
            let result: ScriptArgument[] = this.job["arguments"].slice(0);
            result.length = fillTo;
            result.fill({name: "", value: ""}, currentLength, fillTo);
            return result;
        }
    }

    setArguments(args: ScriptArgument[]): void {
        this.job["arguments"] = args;
    }
}
