import * as React from 'react'
import {render, waitFor, screen, fireEvent} from '@testing-library/react'
import {DurationFieldsContainer, DurationFieldsContainerProps} from "../durationFieldsContainer";

describe('DurationFieldsContainer', () => {
  const setDurationMock = jest.fn()
  const emptyDuration = {};

  const Comp = ({
    views = ['hours', 'minutes'],
    duration = {...emptyDuration, hours: 5, minutes: 2},
    setDuration = setDurationMock,
    ...props
  }: Partial<DurationFieldsContainerProps>) => {
    return (
      <DurationFieldsContainer
        {...{
          views,
          duration,
          setDuration,
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
        ...emptyDuration,
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

  it('can setDuration to smaller than views show', async () => {
    const utils = render(
      <Comp duration={{
        ...emptyDuration,
        hours: 1,
        minutes: 1
      }}/>
    );

    const fields: any[] = utils.getAllByTitle('fieldTitle')

    fireEvent.change(fields[0], {target: {value: '61'}})
    fireEvent.blur(fields[0])

    expect(fields[0].value).toBe('61')

    expect(setDurationMock).toHaveBeenCalledWith({
      weeks: undefined,
      days: undefined,
      hours: 61,
      minutes: 1,
      seconds: undefined
    })
  })

  it('can setDuration to smaller than views show', async () => {
    const utils = render(
      <Comp duration={{
        ...emptyDuration,
        hours: 1,
        minutes: 1
      }}/>
    );

    const fields: any[] = utils.getAllByTitle('fieldTitle')

    fireEvent.change(fields[1], {target: {value: '0.5'}})
    fireEvent.blur(fields[1])

    expect(fields[1].value).toBe('0.5')

    expect(setDurationMock).toHaveBeenCalledWith({
      weeks: undefined,
      days: undefined,
      hours: 1,
      minutes: 0.5,
      seconds: undefined
    })
  })
})
