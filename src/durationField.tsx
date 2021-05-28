import {TextField, TextFieldProps} from "@material-ui/core";
import * as React from 'react'
import {ComponentType, useEffect, useState} from "react";

export type DurationFieldProps = TextFieldProps & {
  value: number | null
  onConfirm: (value: number | null) => void;
  TextFieldComp?: ComponentType<TextFieldProps>;
}

export const DurationField = ({value: _value, onConfirm, TextFieldComp = TextField, ...props}: DurationFieldProps) => {
  const [value, setValue] = useState(_value)
  useEffect(() => {
    setValue(_value)
  }, [_value, setValue])

  return (
    <TextFieldComp
      type="number"
      onChange={({target}) => {
        const num = +target.value
        setValue(isNaN(num) || !target.value ? null : num);
      }}
      onBlur={() => {
        onConfirm(value)
      }}
      value={value ?? ''}
      fullWidth
      {...props}
    />
  )
}
