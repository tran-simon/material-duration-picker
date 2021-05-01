import React from 'react'
import {render, waitFor, screen, fireEvent} from '@testing-library/react'
import {DurationFieldsContainer, DurationFieldsContainerProps} from "../durationFieldsContainer";

describe('DurationFieldsContainer', () => {
  const setDurationMock = jest.fn()
  const emptyDuration = {};

  const Comp = ({
    views = ['minutes', 'seconds'],
    duration = {...emptyDuration, minutes: 5, seconds: 2},
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
        hours: 1,
        minutes: 1,
        seconds: 1
      }}/>
    );
    const fields: any[] = utils.getAllByTitle('fieldTitle')
    expect(fields[0].value).toBe("61")
    expect(fields[1].value).toBe("1")
  });

  it('can setDuration to greater than views show', async () => {
    const utils = render(
      <Comp duration={{
        ...emptyDuration,
        minutes: 1,
        seconds: 1
      }}/>
    );

    const fields: any[] = utils.getAllByTitle('fieldTitle')

    fireEvent.change(fields[0], {target: {value: '61'}})
    fireEvent.blur(fields[0])

    expect(fields[0].value).toBe('61')

    expect(setDurationMock).toHaveBeenCalledWith({
      weeks: undefined,
      days: undefined,
      hours: undefined,
      minutes: 61,
      seconds: 1
    })
  })
})
