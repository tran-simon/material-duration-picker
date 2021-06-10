import {Grid, GridProps} from '@material-ui/core';
import * as React from 'react'
import {Component, ComponentType, Dispatch} from 'react'
import {DurationField, DurationFieldProps} from "./durationField";
import {DurationType, DurationView, Labels} from "./types";
import DefaultLabels from "./defaultLabelsEn.json";
import {getDurationOverflow, getDurationUnderflow, getValueFromDuration} from "./utils";


export type DurationFieldsContainerProps = {
  views: DurationView[];
  duration: DurationType;
  setDuration: Dispatch<DurationType>
  labels?: Labels

  GridContainerProps?: GridProps;
  GridItemProps?: GridProps;
  DurationFieldProps?: Partial<DurationFieldProps>

  DurationFieldComp?: ComponentType<DurationFieldProps>;
}

export const DurationFieldsContainer = ({
  views = [],
  duration,
  setDuration,
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

  return (
    <Grid container spacing={2} justify='space-around' {...GridContainerProps}>
      {views.map((view, i) => {
        const {value, acc} = getValueFromDuration(duration, views, i)

        return (
          <Grid item key={i} xs {...GridItemProps}>
            <DurationFieldComp
              labels={labels}
              view={view}
              value={value}
              onConfirm={(v) => {
                setDuration({
                  ...duration,
                  [view]: v != null ? v - acc : v
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

