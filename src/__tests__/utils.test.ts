import {durationToTime, getDurationOverflow, getDurationUnderflow, getValue, timeToDuration} from "../utils";

describe('getValue', ()=>{
  it('can getValue', ()=>{
    expect(getValue(604800, 'weeks')).toEqual(1)
    expect(getValue(600000, 'weeks')).toEqual(0)
    expect(getValue(3600, 'hours')).toEqual(1)
    expect(getValue(3600, 'minutes')).toEqual(60)
    expect(getValue(75, 'minutes')).toEqual(1); //1.25 rounded down
    expect(getValue(75, 'seconds')).toEqual(75)
  })
  it('can getValue with negatives', ()=>{
    expect(getValue(-604800, 'weeks')).toEqual(-1)
    expect(getValue(-600000, 'weeks')).toEqual(0)
    expect(getValue(-3600, 'hours')).toEqual(-1)
    expect(getValue(-3600, 'minutes')).toEqual(-60)
    expect(getValue(-75, 'minutes')).toEqual(-1); //-1.25 rounded up
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

  it('can timeToDuration with null', ()=>{
    expect(timeToDuration(null)).toEqual({})
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

describe('getDurationOverflow', ()=>{
  it('can getDurationOverflow', ()=>{
    const duration = {
      weeks: undefined,
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5
    }

    const expected = 2 * 24 * 60 + 3 * 60

    expect(getDurationOverflow(duration, 'minutes')).toEqual(expected)
  })
})

describe('getDurationUnderflow', ()=>{
  it('can getDurationUnderflow', ()=>{
    const duration = {
      weeks: undefined,
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5
    }

    const expected = 4/60 + 5/60/60;

    expect(getDurationUnderflow(duration, 'hours')).toEqual(expected)

    expect(getDurationUnderflow({
      minutes: 1,
      seconds: 1
    }, 'minutes')).toEqual(1/60)

    expect(getDurationUnderflow({
      days:3,
      hours:2,
      minutes: undefined,
      seconds: 45
    }, 'days')).toEqual(2/24 + 45 / 60 / 60 / 24)
  })
})
