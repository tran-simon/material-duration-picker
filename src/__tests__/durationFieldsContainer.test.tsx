
import React from 'react'
import {render, waitFor, screen} from '@testing-library/react'
import {DurationFieldsContainer, DurationFieldsContainerProps} from "../durationFieldsContainer";

describe('DurationFieldsContainer', ()=>{
  const emptyDuration = {
    weeks: undefined,
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
  }

  const Comp = ({
    views = ['minutes', 'seconds'],
    duration = {...emptyDuration, minutes: 5, seconds: 2},
    setDuration = jest.fn(),
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

  //todo
  // it('can match snapshot', async ()=>{
  //   await waitFor(() => {
  //     expect(
  //       render(
  //         <Comp/>
  //       ).asFragment()
  //     ).toMatchSnapshot();
  //   });
  // });
  //
  // it('can render less views with greater duration', async ()=>{
  //   const utils = render(
  //     <Comp duration={{
  //       ...emptyDuration,
  //       hours: 1,
  //       minutes: 1,
  //       seconds: 1
  //     }}/>
  //   );
  //   const fields:any[] = utils.getAllByTitle('fieldTitle')
  //   expect(fields[0].value).toBe("61")
  //   expect(fields[1].value).toBe("1")
  // });
})
