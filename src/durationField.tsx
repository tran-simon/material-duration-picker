import {TextField, TextFieldProps} from "@material-ui/core";
import * as React from 'react'
import {useEffect, useState} from "react";

export type DurationFieldProps = TextFieldProps & {
  value: number | null
  onConfirm: (value: number | null) => void;
}

export const DurationField = ({value: _value, onConfirm, ...props}: DurationFieldProps) => {
  const [value, setValue] = useState(_value)
  useEffect(() => {
    setValue(_value)
  }, [_value, setValue])

  return (
    <TextField
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
