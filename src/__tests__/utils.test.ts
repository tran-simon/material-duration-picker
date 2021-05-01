import {durationToTime, timeToDuration} from "../utils";


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
})
