import {Grid, GridProps} from '@material-ui/core';
import React, {Dispatch} from 'react'
import {DurationField, DurationFieldProps} from "./durationField";
import {DurationType, DurationView, Labels} from "./types";
import DefaultLabels from "./defaultLabelsEn.json";


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
        return (
          <Grid item key={i} {...GridItemProps}>
            <DurationField
              label={labels[view]}
              value={duration[view] || null}
              onConfirm={(v) => {
                setDuration({
                  ...duration,
                  [view]: v
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

