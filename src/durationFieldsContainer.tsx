import {Grid, GridProps} from '@mui/material';
import * as React from 'react'
import {ComponentType, Dispatch} from 'react'
import {DurationField, DurationFieldProps} from "./durationField";
import {DurationType, DurationView, Labels} from "./types";
import DefaultLabels from "./defaultLabelsEn.json";
import {durationToTime, timeToDuration} from "./utils";

export type DurationFieldsContainerProps = {
  views: DurationView[];
  value: number | undefined;
  setValue: Dispatch<number | undefined>
  labels?: Labels

  GridContainerProps?: GridProps;
  GridItemProps?: GridProps;
  DurationFieldProps?: Partial<DurationFieldProps>

  DurationFieldComp?: ComponentType<DurationFieldProps>;
}

export const DurationFieldsContainer = ({
  views = [],
  value,
  setValue,
  labels: _labels,
  GridItemProps,
  GridContainerProps,
  DurationFieldProps,
  DurationFieldComp = DurationField,
}: DurationFieldsContainerProps) => {
  const labels = {
    ...DefaultLabels,
    ..._labels
  }

  const duration = timeToDuration(value, views)

  return (
    <Grid container spacing={2} justifyContent='space-around' {...GridContainerProps}>
      {views.map((view, i) => (
        <Grid key={i} item xs {...GridItemProps}>
          <DurationFieldComp
            labels={labels}
            view={view}
            duration={duration}
            onConfirm={(v) => {
              setValue(
                durationToTime({
                  ...duration,
                  [view]: v
                })
              )
            }}
            {...DurationFieldProps}
          />
        </Grid>
      ))}
    </Grid>
  );
}

