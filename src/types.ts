export type DurationView = 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds';
export type Labels = {
  [key: string]: string;
}
export type DurationType = {
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
