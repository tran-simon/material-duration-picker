import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import * as React from "react";
import {DurationField} from "../durationField";

describe('durationField', ()=>{

  it('can match snapshot', async () => {
    await waitFor(() => {
      expect(
        render(
          <DurationField
            view={"minutes"}
            duration={{minutes: 30}}
            onConfirm={() => {
            }}
          />
        ).asFragment()
      ).toMatchSnapshot();
    });
  })

  it('can match snapshot with custom labels', async () => {
    await waitFor(() => {
      expect(
        render(
          <DurationField
            labels={{
              minutes: 'CUSTOM_LABEL'
            }}
            view={"minutes"}
            duration={{minutes: 30}}
            onConfirm={() => {
            }}
          />
        ).asFragment()
      ).toMatchSnapshot();
    });
  })


  it('can confirm value when value is invalid', async () => {

    const mockOnConfirm = jest.fn()

    const utils = render(
      <DurationField
        view={"minutes"}
        duration={{minutes: 30}}
        onConfirm={mockOnConfirm}
        inputProps={{
          title: 'fieldTitle'
        }}
        />
    )

    const field: any= utils.getByTitle('fieldTitle')

    expect(field.value).toBe('30')
    fireEvent.change(field, {target: {value: NaN}})
    fireEvent.blur(field)
    expect(field.value).toBe('')
    expect(mockOnConfirm).toHaveBeenCalledWith(undefined)
  })
})
