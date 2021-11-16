import {DurationType, DurationView} from "./types";
import {converters, toSecondsMultipliers, VIEWS} from "./constants";

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
 * @param round if should round
 */
export const getValue = (secs: number | undefined, view: DurationView, round = true): number | undefined => {
  if (secs == null) {
    return undefined
  }

  /*
     The bitwise operator is used to get the whole number.
     https://stackoverflow.com/a/4228528/6592293
   */
  const res = secs * converters['seconds'][view]

  return round ? res | 0 : res;
};

export const getRemainder = (secs: number | undefined, view: DurationView): number | undefined => {
  return secs == null ? undefined : secs % converters[view]['seconds']
}

/**
 * Converts a time in seconds to a duration
 * @param time time in seconds
 * @param views Views included in the duration
 * @param zeroes If false, views that have a value of zero will be set to undefined
 */
export const timeToDuration = (time: number | undefined, views = VIEWS, zeroes = false) => {
  let i = 0;
  let view = views[i]
  if (!view || time == null) {
    return {}
  }

  return VIEWS.reduce<DurationType>((acc, curr) => {
    const value = getValue(time, curr, curr !== 'seconds')
    const remainder = getRemainder(time, curr)
    const a = value != null ? value * converters[curr][view] : 0

    time = remainder ?? undefined

    acc[view] =((acc[view] || 0) + a) || (zeroes ? 0 : undefined);

    if (view === curr && i + 1 < views.length) {
      i++;
      view = views[i]
    }

    return acc;
  }, {});
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
export const durationToTime = (duration: DurationType, view?: DurationView): number | undefined => {

  const seconds = VIEWS.reduce<undefined | number>((time, view) => {
    const v = duration[view]
    if (v == null) {
      return time
    }
    return (time ?? 0) + v * toSecondsMultipliers[view];
  }, undefined)

  return view && seconds != null ? seconds / toSecondsMultipliers[view] : seconds
}
