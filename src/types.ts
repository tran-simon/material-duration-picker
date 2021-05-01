export type DurationView = 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds';
export type Labels = {
  [key: string]: string;
}
export type DurationType = { [key in DurationView]: number | undefined }
