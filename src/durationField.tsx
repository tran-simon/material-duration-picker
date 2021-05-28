import {TextField, TextFieldProps} from "@material-ui/core";
import * as React from 'react'
import {ComponentType, useEffect, useState} from "react";
import {DurationView, Labels} from "./types";
import DefaultLabels from "./defaultLabelsEn.json";

export type DurationFieldProps = TextFieldProps & {
  value: number | null
  onConfirm: (value: number | null) => void;
  view: DurationView;
  labels?: Labels;
  TextFieldComp?: ComponentType<TextFieldProps>;
}

export const DurationField = ({
  value: _value,
  onConfirm,
  TextFieldComp = TextField,
  view,
  labels: _labels,
  ...props
}: DurationFieldProps) => {
  const labels = {
    ...DefaultLabels,
    ..._labels
  }

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
      label={labels[view]}
      {...props}
    />
  )
}
