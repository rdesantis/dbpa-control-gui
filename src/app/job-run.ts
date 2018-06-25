import { JobState } from './job-state';

export class JobRun {
    runId: number;
    jobName: string;
    state: JobState;
}