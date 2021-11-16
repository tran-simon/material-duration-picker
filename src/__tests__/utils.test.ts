import {durationToTime, getValue, timeToDuration} from "../utils";
import {toSecondsMultipliers} from "../constants";

describe('getValue', ()=>{
  it('can getValue', ()=>{
    expect(getValue(604800, 'weeks')).toEqual(1)
    expect(getValue(600000, 'weeks')).toEqual(0)
    expect(getValue(3600, 'hours')).toEqual(1)
    expect(getValue(3600, 'minutes')).toEqual(60)
    expect(getValue(75, 'minutes')).toEqual(1); //1.25 rounded down
    expect(getValue(75, 'minutes', false)).toEqual(1.25); //1.25 rounded down
    expect(getValue(75, 'seconds')).toEqual(75)
  })
  it('can getValue with negatives', ()=>{
    expect(getValue(-604800, 'weeks')).toEqual(-1)
    expect(getValue(-600000, 'weeks')).toEqual(0)
    expect(getValue(-3600, 'hours')).toEqual(-1)
    expect(getValue(-3600, 'minutes')).toEqual(-60)
    expect(getValue(-75, 'minutes')).toEqual(-1); //-1.25 rounded up
    expect(getValue(-75, 'minutes', false)).toEqual(-1.25); //-1.25 rounded up
    expect(getValue(-75, 'seconds')).toEqual(-75)
  })
})

describe('timeToDuration', ()=>{
  it('can timeToDuration',()=>{
    const expected = {
      weeks: 1,
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5
    }
    const time = 604800 + 172800 + 10800 + 240 + 5;

    expect(timeToDuration(time)).toEqual(expected)
  })

  it('can timeToDuration with undefined', ()=>{
    expect(timeToDuration(undefined)).toEqual({})
  })

  it('can get timeToDuration with 0 values', ()=>{
    const expected = {
      weeks: 1,
      days: undefined,
      hours: 3,
      minutes: undefined,
      seconds: 5
    }
    const time = 604800 + 10800 + 5;

    expect(timeToDuration(time)).toEqual(expected)
  })

  it('can timeToDuration with negative values',()=>{
    const expected = {
      weeks: -1,
      days: -2,
      hours: -3,
      minutes: -4,
      seconds: -5
    }
    const time = -(604800 + 172800 + 10800 + 240 + 5);

    expect(timeToDuration(time)).toEqual(expected)
  })

  it('can timeToDuration and keep zeroes', ()=>{
    expect(timeToDuration(0, ['hours', 'seconds'], true)).toEqual({
      hours: 0,
      seconds: 0
    })
  })

  it('can timeToDuration with custom views', ()=>{
    expect(timeToDuration(toSecondsMultipliers.days * 30, ['days'])).toEqual({days: 30})

    expect(timeToDuration(durationToTime({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 30
    }) || 0 , ['hours', 'minutes'])).toEqual({
      hours: 26,
      minutes: 3.5
    })

    expect(timeToDuration(durationToTime({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 30
    }) || 0, ['days', 'minutes'])).toEqual({
      days: 1,
      minutes: 123.5
    })

    expect(timeToDuration(durationToTime({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 30
    }) || 0, ['hours', 'minutes'])).toEqual({
      hours: 26,
      minutes: 3.5
    })

    expect(timeToDuration(durationToTime({
      minutes: 1.5,
      seconds: 30.5
    }) || 0, ['hours', 'seconds'])).toEqual({
      seconds: 120.5
    });

    expect(timeToDuration(durationToTime({
      minutes: 3,
      seconds: 30
    }) || 0, ['hours', 'minutes'])).toEqual({
      minutes: 3.5
    });

    expect(timeToDuration(durationToTime({
      hours: 1,
      minutes: 30,
    }) || 0, ['days'])).toEqual({
      days: 0.0625
    });

    expect(timeToDuration(durationToTime({
      hours: 1,
      minutes: 30,
    }) || 0, [])).toEqual({
    });
  })
})

describe('durationToTime', ()=>{
  it('can durationToTime', ()=>{
    const duration = {
      weeks: 1,
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5
    }
    const expected = 604800 + 172800 + 10800 + 240 + 5;

    expect(durationToTime(duration)).toEqual(expected)
  })

  it('can durationToTime with undefined values', ()=>{
    const duration = {
      weeks: 1,
      days: undefined,
      hours: 3,
      minutes: undefined,
      seconds: 5
    }
    const expected = 604800 + 10800 + 5;

    expect(durationToTime(duration)).toEqual(expected)
  })

  it('can durationToTime with a view', ()=>{
    const duration = {
      weeks: undefined,
      days: undefined,
      hours: 1,
      minutes: 2,
      seconds: 30,
    }
    const expected = 62.5

    expect(durationToTime(duration, 'minutes')).toEqual(expected)
  })

  it('can durationToTime with negative values', ()=>{
    const duration = {
      weeks: -1,
      days: -2,
      hours: -3,
      minutes: -4,
      seconds: -5
    }
    const expected = -(604800 + 172800 + 10800 + 240 + 5);

    expect(durationToTime(duration)).toEqual(expected)
  })


  it('can durationToTime with undefined values', ()=>{
    expect(durationToTime({})).toEqual(undefined)
  })
})
