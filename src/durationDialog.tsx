import * as React from 'react'
import {ComponentType, useEffect, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogProps, Toolbar, Typography, useTheme} from "@mui/material";
import {DurationType, DurationView, Labels} from "./types";
import {DurationFieldsContainer, DurationFieldsContainerProps} from "./durationFieldsContainer";
import DefaultLabels from './defaultLabelsEn.json'
import {timeToDuration} from "./utils";

export type DurationDialogProps = DialogProps & {
  time: number | undefined;
  onDismiss: () => void;
  onAccept: (time: number | undefined) => void

  views: DurationView[]
  labels?: Labels
  formatDuration: (duration: DurationType) => string;

  DurationFieldsContainerProps?: Partial<DurationFieldsContainerProps>
  DurationFieldsContainerComp?: ComponentType<DurationFieldsContainerProps>;
}

export const DurationDialog = ({
  time: _time,
  onDismiss,
  onAccept,
  views,
  labels: _labels,
  formatDuration,
  DurationFieldsContainerProps,
  DurationFieldsContainerComp = DurationFieldsContainer,
  ...props
}: DurationDialogProps) => {
  const theme = useTheme()
  const [time, setTime] = useState<number | undefined>(_time)

  useEffect(() => {
    setTime(_time)
  }, [_time])

  const duration = timeToDuration(time)

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
        <DurationFieldsContainerComp views={views} value={time} setValue={setTime} {...DurationFieldsContainerProps}/>
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
            onAccept(time)
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

