import { Job } from './job';
import { ScriptArgument } from './script-argument';

export class JobWithName {
    constructor(public name: string, public job: Job) {}

    getArguments(): ScriptArgument[] {
        return this.job["arguments"];
    }

    setArguments(args: ScriptArgument[]): void {
        this.job["arguments"] = args;
    }
}
