import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogProps, Grid, Toolbar, Typography} from "@material-ui/core";
import {getMinutes, getSeconds, setMinutes, setSeconds} from "date-fns";
import {ValueField} from "./valueField";
import {DATE_ZERO, valueToFormattedDuration} from "./utils";

export type DurationDialogProps = DialogProps & {
  date: Date | null,
  onDismiss: () => void;
  onAccept: (value: Date | null) => void
}


export const DurationDialog = ({date: _date, onDismiss, onAccept, ...props}: DurationDialogProps) => {
  const [value, setValue] = useState(_date)

  return (
    <Dialog
      fullWidth
      onClose={
        () => onDismiss()
      }
      {...props}
    >
      <DialogContent>
        <Toolbar>
          <Typography variant='h4'>
            {valueToFormattedDuration(value)}
          </Typography>
        </Toolbar>
        <Grid container spacing={2}>
          <Grid item>
            <ValueField
              label='min'
              value={value && getMinutes(value)}
              onConfirm={((v) => {
                setValue(setMinutes(value || DATE_ZERO, v || 0));
              })}
            />
          </Grid>
          <Grid item>
            <ValueField
              label='seconds'
              value={value && getSeconds(value)}
              onConfirm={((v) => {
                setValue(setSeconds(value || DATE_ZERO, v || 0));
              })}
            />
          </Grid>
        </Grid>


      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          onDismiss()
        }}>
          CANCEL
        </Button>
        <Button onClick={() => {
          onAccept(value)
          onDismiss();
        }}>
          OK
        </Button>
      </DialogActions>


    </Dialog>
  )
    ;
}

