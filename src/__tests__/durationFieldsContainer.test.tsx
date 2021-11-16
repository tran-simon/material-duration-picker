import * as React from 'react'
import {render, waitFor, screen, fireEvent} from '@testing-library/react'
import {DurationFieldsContainer, DurationFieldsContainerProps} from "../durationFieldsContainer";
import {durationToTime, timeToDuration} from "../utils";
import {useState} from "react";

describe('DurationFieldsContainer', () => {
  const setValueMock = jest.fn()

  const Comp = ({
    views = ['hours', 'minutes'],
    duration = {hours: 5, minutes: 2},
    setValue= setValueMock,
    ...props
  }: any) => {
    return (
      <DurationFieldsContainer
        {...{
          views,
          value: durationToTime(duration),
          setValue,
          DurationFieldProps: {
            inputProps: {
              title: 'fieldTitle',
            },
            ...props.DurationFieldProps
          },
          ...props
        }}
      />
    )
  };

  it('can match snapshot', async () => {
    await waitFor(() => {
      expect(
        render(
          <Comp/>
        ).asFragment()
      ).toMatchSnapshot();
    });
  });

  it('can render less views with greater duration', async () => {
    const utils = render(
      <Comp duration={{
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 30,
      }}/>
    );
    const fields: any[] = utils.getAllByTitle('fieldTitle')
    expect(fields[0].value).toBe("25")
    expect(fields[1].value).toBe("1.5")
  });

  it('can render less views with greater duration when smaller views are undefined', async () => {
    const utils = render(
      <Comp duration={{
        days: 2,
      }}/>
    );
    const fields: any[] = utils.getAllByTitle('fieldTitle')
    expect(fields[0].value).toBe("48")
    expect(fields[1].value).toBe("")
  });

  it('can setDuration to smaller than views show', async () => {
    const utils = render(
      <Comp duration={{
        hours: 1,
        minutes: 1
      }}/>
    );

    const fields: any[] = utils.getAllByTitle('fieldTitle')

    fireEvent.change(fields[0], {target: {value: '61'}})
    fireEvent.blur(fields[0])

    expect(fields[0].value).toBe('61')

    expect(setValueMock).toHaveBeenCalledWith(durationToTime({
      hours: 61,
      minutes: 1,
    }));
  })

  it('can setDuration to smaller than views show', async () => {
    const utils = render(
      <Comp duration={{
        hours: 1,
        minutes: 1
      }}/>
    );

    const fields: any[] = utils.getAllByTitle('fieldTitle')

    fireEvent.change(fields[1], {target: {value: '0.5'}})
    fireEvent.blur(fields[1])

    expect(fields[1].value).toBe('0.5')

    expect(setValueMock).toHaveBeenCalledWith(durationToTime({
      hours: 1,
      minutes: 0.5,
    }));
  })

  it('can set a view to a value smaller than 0', async ()=>{

    const Comp = () => {

      const [value, setValue] = useState<number | undefined>(60)

      return <DurationFieldsContainer
        {...{
          views: ['days', 'minutes'],
          value: value,
          setValue,
          DurationFieldProps: {
            inputProps: {
              title: 'fieldTitle',
            },
          },
        }}
      />
    }

    const utils = render(
      <Comp/>
    );

    const fields: any[] = utils.getAllByTitle('fieldTitle')

    fireEvent.change(fields[0], {target: {value: '0.5'}})

    expect(fields[0].value).toBe('0.5')

    fireEvent.blur(fields[0])

    expect(fields[0].value).toBe('')
    expect(fields[1].value).toBe('721')
  })
})
