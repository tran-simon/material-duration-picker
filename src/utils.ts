import {DurationType, DurationView} from "./types";

export const VIEWS: DurationView[] = ['weeks', 'days', 'hours', 'minutes', 'seconds']

/**
 * Converts a number of seconds into a whole number of units of type view
 *
 * Ex:
 * 75 seconds to minutes = 1.25 minutes. Rounded down = 1 minutes
 *
 * This works with negative numbers
 * -75 seconds to minutes = -1.25 minutes. Rounded up = -1 minutes
 *
 * @param secs The number of seconds
 * @param view The view
 */
export const getValue = (secs: number | null, view: DurationView): number | undefined => {
  /*
     The bitwise operator is used to get the whole number.
     https://stackoverflow.com/a/4228528/6592293
   */

  return secs === null ?
    undefined :
    secs / toSecondsMultipliers[view] | 0
};

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
 * Return them time value from the duration and a list of views for the view at index i
 * @param duration The duration
 * @param views List of views
 * @param i Index of the view to use
 * @return Object containing the value and 'acc', the amount added to the time from views that are greater or smaller than the targetted view.
 */
export const getValueFromDuration = (duration: DurationType, views: DurationView[], i: number): {
  value: number | null;
  acc: number;
}=>{
  const acc = i === 0 ?
    getDurationOverflow(duration, views[i]) :
    i === views.length - 1 ?
      getDurationUnderflow(duration, views[i]) :
      0

  const value = duration[views[i]]

  return {
    acc,
    value: value != null ? value + acc : null
  };
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
