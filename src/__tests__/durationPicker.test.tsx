import * as React from 'react'
import {render, waitFor} from "@testing-library/react";
import {DurationPicker} from "../durationPicker";
import * as DurationDialog from '../durationDialog'
import {DurationField} from "../durationField";
import {timeToDuration} from "../utils";


jest.spyOn(DurationDialog, 'DurationDialog')
  .mockImplementation(({time}: any)=> <div>{JSON.stringify(timeToDuration(time))}</div>)

describe('durationPicker', () => {
  const onValueChange = jest.fn()
  const formatDuration = jest.fn()
  //1 week + 2 days + 3 hours + 4 min + 5 secs
  const time = 604800 + 172800 + 10800 + 240 + 5;

  it('can match snapshot', async () => {
    await waitFor(() => {
      expect(
        render(
          <DurationPicker
            value={time}
            onValueChange={onValueChange}
            formatDuration={formatDuration}/>
        ).asFragment()
      ).toMatchSnapshot();
    })
  })
})
