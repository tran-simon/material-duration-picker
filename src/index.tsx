import React, {useEffect, useState} from 'react'
import {DatePicker, Picker, } from "@material-ui/pickers";
import {Button, Dialog, DialogActions, DialogContent, DialogProps, Grid, TextField, TextFieldProps, Toolbar} from "@material-ui/core";
import {formatDuration, intervalToDuration, getMinutes, setMinutes,getSeconds, addSeconds, setSeconds} from 'date-fns'
import {DatePickerToolbar} from "@material-ui/pickers/DatePicker/DatePickerToolbar";

const zeroDate = new Date(0)

const valueToFormattedDuration = (value: Date | null) => {
  const duration = value && intervalToDuration({
    start: zeroDate,
    end: value
  });

  return duration && formatDuration(duration)
}

const DurationField = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date | null>(null)


  return <>
    <TextField
      onClick={() => {
        setOpen(true);
      }
      }
      inputProps={{
        readOnly: true

      }}
      value={valueToFormattedDuration(value)}
    />

    <DurationDialog date={value} open={open} onDismiss={() => setOpen(false)} onAccept={(v) => {

      setValue(v)
    }}/>
  </>;
}

const DurationDialog = ({date: _date, onDismiss, onAccept, ...props}: DialogProps & {
  date: Date | null,
  onDismiss: () => void;
  onAccept: (value: Date | null)=>void
}) => {
  const [value, setValue] = useState(_date)

  return (
    <Dialog
      fullWidth
      onClose={() => onDismiss()}
      {...props}
    >
      <DialogContent>
        <Toolbar>
          {valueToFormattedDuration(value)}
        </Toolbar>
        <Grid container spacing={2}>
          <Grid item>
            <ValueField
              label='min'
              value={value && getMinutes(value)}
              onConfirm={((v) => {
                setValue(setMinutes(value || zeroDate, v || 0));
              })}
            />
          </Grid>
          <Grid item>
            <ValueField
              label='seconds'
              value={value && getSeconds(value)}
              onConfirm={((v) => {
                setValue(setSeconds(value || zeroDate, v || 0));
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
  );
}

const ValueField = ({value: _value, onConfirm, ...props}: TextFieldProps & {
  value: number | null
  onConfirm: (value: number | null)=>void;
})=>{
  const [value, setValue] = useState(_value)
  useEffect(()=>{
    setValue(_value)
  }, [_value, setValue])

  return (
    <TextField
      type="number"
      onChange={({target})=>{
        const num = +target.value
        setValue(isNaN(num) ? null : num);
      }}
      onBlur={()=>{
        onConfirm(value)
      }}
      value={value}
      {...props}
    />
  )
}

export default DurationField
