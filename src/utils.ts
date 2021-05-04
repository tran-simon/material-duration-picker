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

export const timeToDuration = (time: number | null) => {
  const duration: DurationType = {};

  VIEWS.reduce((value, view) => {
    if (value === null) {
      return null
    }
    duration[view] = getValue(value, view) || undefined;
    return getRemainder(value, view) || 0
  }, time)

  return duration
}

/**
 * Convert a duration to a time value of a view
 * If no view is specified, will convert to seconds
 *
 * Ex:
 * duration: {
 *   hours: 1,
 *   minutes: 2
 *   seconds: 30
 * }
 * view: minutes
 *
 * res: 62.5
 */
export const durationToTime = (duration: DurationType, view?: DurationView) => {

  const seconds = VIEWS.reduce((time, view) => {
    const v = duration[view] || 0
    return time + v * toSecondsMultipliers[view]
  }, 0)

  return view ? seconds / toSecondsMultipliers[view] : seconds
}

/**
 * Get the time value from a duration by adding the values of the views greater than 'view'
 *
 * Ex:
 * duration: {
 *   days: 1,
 *   hours: 1,
 *   minutes: 1,
 *   seconds: 1,
 * }
 * view: 'minutes'
 *
 * res:
 *     (days * 24 * 60) + (hours * 60)
 *     = 24 * 60 + 60 = 1500
 *
 * @param duration The duration object
 * @param view The view up to it will add
 */
export const getDurationOverflow = (duration: DurationType, view: DurationView): number => {
  let acc = 0;
  for (const key of VIEWS) {
    if (key === view) {
      break;
    }

    acc += (duration[key] || 0) * toSecondsMultipliers[key] / toSecondsMultipliers[view]
  }
  return acc
}

/**
 * Get the time value from a duration by adding the values of the views smaller than 'view'
 *
 * Ex:
 * duration: {
 *   minutes: 1,
 *   seconds: 1,
 * }
 * view: 'minutes'
 *
 * res:
 *     (seconds)
 *     = 1 * 1/60 = 0.016666
 *
 * @param duration The duration object
 * @param view The view up to it will add
 */
export const getDurationUnderflow = (duration: DurationType, view: DurationView): number => {
  let acc = 0;
  const reversedViews = [...VIEWS].reverse()
  for (const key of reversedViews) {
    if (key === view) {
      break;
    }

    acc += (duration[key] || 0) / toSecondsMultipliers[view] * toSecondsMultipliers[key]
  }
  return acc
}
