import {Grid, GridProps} from '@material-ui/core';
import * as React from 'react'
import {Dispatch} from 'react'
import {DurationField, DurationFieldProps} from "./durationField";
import {DurationType, DurationView, Labels} from "./types";
import DefaultLabels from "./defaultLabelsEn.json";
import {getDurationOverflow} from "./utils";


export type DurationFieldsContainerProps = {
  views: DurationView[];
  duration: DurationType;
  setDuration: Dispatch<DurationType>
  labels?: Labels

  GridContainerProps?: GridProps;
  GridItemProps?: GridProps;
  DurationFieldProps?: Partial<DurationFieldProps>
}

export const DurationFieldsContainer = ({
  views = [],
  duration,
  setDuration,
  labels: _labels,
  GridItemProps,
  GridContainerProps,
  DurationFieldProps
}: DurationFieldsContainerProps)=>{
  const labels = {
    ...DefaultLabels,
    ..._labels
  }

  return (
    <Grid container spacing={2} justify='space-around' {...GridContainerProps}>
      {views.map((view, i) => {
        const acc = i === 0 ? getDurationOverflow(duration, view) : 0

        const value = ((duration[view] || 0) + acc) || null

        return (
          <Grid item key={i} {...GridItemProps}>
            <DurationField
              label={labels[view]}
              value={value}
              onConfirm={(v) => {
                setDuration({
                  ...duration,
                  [view]: (v || 0) - acc
                })
              }}
              {...DurationFieldProps}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

