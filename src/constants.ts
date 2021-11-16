import {DurationView} from "./types";

export const VIEWS: DurationView[] = ['weeks', 'days', 'hours', 'minutes', 'seconds']

export const toSecondsMultipliers: { [key in DurationView]: number } = {
  seconds: 1,
  minutes: 60,
  hours: 60 * 60,
  days: 60 * 60 * 24,
  weeks: 60 * 60 * 24 * 7
}


export type Converter = {
  [key in DurationView]: number
}

const createConverter = (from: DurationView)=>{
  const converter: Converter = {} as Converter

  for (let i = 0; i < VIEWS.length; i++) {
    const to = VIEWS[i]
    converter[to] = toSecondsMultipliers[from] / toSecondsMultipliers[to]
  }
  return converter
}

export type Converters = {
  [key in DurationView]: Converter
}

export const converters = VIEWS.reduce((converters, view)=>{
  converters[view] = createConverter(view);
  return converters
}, {} as Converters)

