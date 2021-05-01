import React, {useState} from "react";
import {TextField, TextFieldProps} from "@material-ui/core";
import {durationToTime, timeToDuration} from "./utils";
import {DurationDialog, DurationDialogProps} from "./durationDialog";
import {DurationType, DurationView} from "./types";


export type DurationPickerProps = Partial<TextFieldProps> & {
  value: number | null,
  onValueChange: (value: number | null) => void;
  formatDuration: (duration: DurationType) => string
  disableEditDialog?: boolean;
  views?: DurationView[]
  DurationDialogProps?: Partial<DurationDialogProps>
}

export const DurationPicker = ({
  DurationDialogProps,
  value,
  onValueChange,
  formatDuration,
  views = ['hours', 'minutes'],
  disableEditDialog,
  ...props
}: DurationPickerProps) => {
  const [open, setOpen] = useState(false)

  const duration = timeToDuration(value)

  return <>
    <TextField
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
      <DurationDialog
        duration={duration}
        open={open}
        onDismiss={() => setOpen(false)}
        onAccept={(duration) => {
          onValueChange(durationToTime(duration))
        }}
        views={views}
        formatDuration={formatDuration}
        {...DurationDialogProps}
      />
    )}
  </>;
};
