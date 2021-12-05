import * as React from 'react'
import {ComponentType, useState} from "react";
import {TextField, TextFieldProps} from "@mui/material";
import {durationToTime, timeToDuration} from "./utils";
import {DurationDialog, DurationDialogProps} from "./durationDialog";
import {DurationType, DurationView} from "./types";


export type DurationPickerProps = Partial<TextFieldProps> & {
  value: number | undefined,
  onValueChange: (value: number | undefined) => void;
  formatDuration: (duration: DurationType) => string
  disableEditDialog?: boolean;
  views?: DurationView[]
  DurationDialogProps?: Partial<DurationDialogProps>
  DurationDialogComp?: ComponentType<DurationDialogProps>;

  TextFieldComp?: ComponentType<TextFieldProps>;
}

export const DurationPicker = ({
  DurationDialogProps,
  value,
  onValueChange,
  formatDuration,
  views = ['hours', 'minutes'],
  disableEditDialog,
  DurationDialogComp = DurationDialog,
  TextFieldComp = TextField,
  ...props
}: DurationPickerProps) => {
  const [open, setOpen] = useState(false)

  const duration = timeToDuration(value)

  return <>
    <TextFieldComp
      onClick={() => {
        !disableEditDialog && setOpen(true);
      }}
      value={formatDuration(duration)}

      {...props}

      InputLabelProps={{
        shrink: open || undefined,
        ...props.InputLabelProps
      }}
      inputProps={{
        readOnly: true,
        ...props?.inputProps
      }}
    />
    {!disableEditDialog && (
      <DurationDialogComp
        time={value}
        open={open}
        onDismiss={() => setOpen(false)}
        onAccept={(time) => {
          onValueChange(time)
        }}
        views={views}
        formatDuration={formatDuration}
        {...DurationDialogProps}
      />
    )}
  </>;
};
