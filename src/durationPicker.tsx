import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import {valueToFormattedDuration} from "./utils";
import {DurationDialog} from "./durationDialog";

export const DurationPicker = () => {
  const [value, setValue] = useState<Date | null>(null)
  const [open, setOpen] = useState(false)

  return <>
    <TextField
      onClick={(e) => {
        setOpen(true)
      }}
      inputProps={{
        readOnly: true

      }}
      value={valueToFormattedDuration(value)}
    />

    <DurationDialog date={value} open={open}  onDismiss={() => setOpen(false)} onAccept={(v) => {
      setValue(v)
    }}/>
  </>;
}
