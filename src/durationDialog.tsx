import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogProps, Grid, Toolbar, Typography, useTheme} from "@material-ui/core";
import {ValueField} from "./valueField";
import {DurationType, Labels, ValueFieldView} from "./types";

export type DurationDialogProps = DialogProps & {
  duration: DurationType
  onDismiss: () => void;
  onAccept: (duration: DurationType) => void

  views: ValueFieldView[]
  labels?: Labels
  formatDuration: (duration: DurationType) => string
}

const DefaultDurationDialogLabels: Labels = {
  cancel: 'CANCEL',
  ok: 'OK',
  weeks: 'Weeks',
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
}

export const DurationDialog = ({
  duration: _duration,
  onDismiss,
  onAccept,
  views,
  labels: _labels,
  formatDuration,
  ...props
}: DurationDialogProps) => {
  const theme = useTheme()
  const [duration, setDuration] = useState(_duration)

  useEffect(() => {
    setDuration(_duration)
  }, [_duration, setDuration])

  const labels = {
    ...DefaultDurationDialogLabels,
    ..._labels
  }

  return (
    <Dialog
      fullWidth
      onClose={() => onDismiss()}
      {...props}
    >
      <Toolbar style={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }}>
        <Typography variant='h4'>
          {duration && formatDuration(duration)}
        </Typography>
      </Toolbar>
      <DialogContent>
        <Grid container spacing={2} justify='space-around'>
          {views.map((view, i) => {
            const value = duration[view]
            return (
              <Grid item key={i}>
                <ValueField
                  label={labels[view]}
                  value={value || null}
                  onConfirm={(v) => {
                    setDuration({
                      ...duration,
                      [view]: v
                    })
                  }}/>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onDismiss()
          }}
          color='primary'
        >
          {labels.cancel}
        </Button>
        <Button
          onClick={() => {
            onAccept(duration)
            onDismiss();
          }}
          color='primary'
        >
          {labels.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

