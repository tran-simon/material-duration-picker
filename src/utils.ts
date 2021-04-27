import {formatDuration, intervalToDuration} from "date-fns";

export const DATE_ZERO = new Date(0)

export const valueToFormattedDuration = (value: Date | null) => {
  const duration = value && intervalToDuration({
    start: DATE_ZERO,
    end: value
  });

  return duration && formatDuration(duration)
}
