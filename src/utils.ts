import {DurationType, DurationView} from "./types";

export const VIEWS: DurationView[] = ['weeks', 'days', 'hours', 'minutes', 'seconds']

export const getValue = (secs: number | null, view: DurationView): number | undefined => {
  return secs === null ? undefined : Math.floor(secs / toSecondsMultipliers[view])
}

export const getRemainder = (secs: number | null, view: DurationView): number | undefined => {
  return secs === null ? undefined : secs % toSecondsMultipliers[view]
}

export const toSecondsMultipliers: { [key in DurationView]: number } = {
  seconds: 1,
  minutes: 60,
  hours: 60 * 60,
  days: 60 * 60 * 24,
  weeks: 60 * 60 * 24 * 7
}

export const timeToDuration = (time: number | null)=>{
  const duration: DurationType  = {
    weeks: undefined,
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
  }

  VIEWS.reduce((value, view)=>{
    if(value === null){
      return null
    }
    duration[view] = getValue(value, view) || undefined;
    return getRemainder(value, view) || 0
  }, time)

  return  duration
}

export const durationToTime = (duration: DurationType)=>{

  return VIEWS.reduce((time, view) =>{
    const v = duration[view] || 0
    return time + v * toSecondsMultipliers[view]
  }, 0)
}
