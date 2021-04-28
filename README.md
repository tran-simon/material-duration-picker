# Material-Duration-Picker

Simple duration picker inspired by [Material-UI Pickers](https://material-ui-pickers.dev/)

## To install

```bash
npm install --save material-duration-picker
```

or

```bash
yarn add material-duration-picker
```

### Dependencies:

* [Material-UI](https://material-ui.com/)
* [React](https://github.com/facebook/react)

## To use:

*This example uses [date-fns](https://github.com/date-fns/date-fns) to format the duration*

```typescript jsx
import {DurationPicker} from "./durationPicker";
import {formatDuration} from 'date-fns'

const Comp = () => {
  const [value, setValue] = useState(0)
  return (
    <div>
      <DurationPicker
        label='Duration'
        value={value}
        onValueChange={(v) => setValue(v)}
        formatDuration={formatDuration}
      />
    </div>
  );
}
```

### Props

* value: (REQUIRED) The duration value in seconds
* onValueChange: (REQUIRED) On change callback
* formatDuration: function to customize the way that the duration is formatted
* views: Array of field views to offer. **MUST BE FROM BIGGEST TO SMALLEST** ex: ['weeks', 'minutes', 'seconds']
* DurationDialogProps: Props passed to the dialog

Remaining props are passed to the TextField component
