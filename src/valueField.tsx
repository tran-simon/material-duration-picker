import {TextField, TextFieldProps} from "@material-ui/core";
import React, {useEffect, useState} from "react";

export type ValueFieldProps = TextFieldProps & {
  value: number | null
  onConfirm: (value: number | null) => void;
}

export const ValueField = ({value: _value, onConfirm, ...props}: ValueFieldProps) => {
  const [value, setValue] = useState(_value)
  useEffect(() => {
    setValue(_value)
  }, [_value, setValue])

  return (
    <TextField
      type="number"
      onChange={({target}) => {
        const num = +target.value
        setValue(isNaN(num) ? null : num);
      }}
      onBlur={() => {
        onConfirm(value)
      }}
      value={value ?? ''}
      {...props}
    />
  )
}
