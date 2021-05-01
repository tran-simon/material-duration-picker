import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogProps, Toolbar, Typography, useTheme} from "@material-ui/core";
import {DurationType, DurationView, Labels} from "./types";
import {DurationFieldsContainer, DurationFieldsContainerProps} from "./durationFieldsContainer";
import DefaultLabels from './defaultLabelsEn.json'

export type DurationDialogProps = DialogProps & {
  duration: DurationType
  onDismiss: () => void;
  onAccept: (duration: DurationType) => void

  views: DurationView[]
  labels?: Labels
  formatDuration: (duration: DurationType) => string;

  DurationFieldsContainerProps?: Partial<DurationFieldsContainerProps>
}

export const DurationDialog = ({
  duration: _duration,
  onDismiss,
  onAccept,
  views,
  labels: _labels,
  formatDuration,
  DurationFieldsContainerProps,
  ...props
}: DurationDialogProps) => {
  const theme = useTheme()
  const [duration, setDuration] = useState(_duration)

  useEffect(() => {
    setDuration(_duration)
  }, [_duration, setDuration])

  const labels = {
    ...DefaultLabels,
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
        <DurationFieldsContainer views={views} duration={duration} setDuration={setDuration} {...DurationFieldsContainerProps}/>
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

