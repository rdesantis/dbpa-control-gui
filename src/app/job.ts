import { ScriptArgument } from './script-argument';

export class Job {
    constructor(
        public scriptName: string,
        args: ScriptArgument[],         // Can't use reserved word "arguments" as an indentifier
        public scheduleNames: string[],
        public enabled: boolean
        ) {
            this["arguments"] = args;
    }

    public static emptyJob(): Job {
        return new Job("", new Array<ScriptArgument>(0), new Array<string>(0), false)
    }
}
