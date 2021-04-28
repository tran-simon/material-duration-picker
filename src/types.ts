export type ValueFieldView = 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds';
export type Labels = {
  [key: string]: string;
}
export type DurationType = { [key in ValueFieldView]: number | undefined }
