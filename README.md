# Material-Duration-Picker

Simple duration picker inspired by [Material-UI Pickers](https://material-ui-pickers.dev/)

![image](https://user-images.githubusercontent.com/8755930/116327819-96fc1280-a795-11eb-96a6-e10722fe5b56.png)


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


[demo](https://user-images.githubusercontent.com/8755930/116327648-41c00100-a795-11eb-9446-ec7d57fae7a4.mp4)



### Props

* value: (REQUIRED) The duration value in seconds
* onValueChange: (REQUIRED) On change callback
* formatDuration: function to customize the way that the duration is formatted
* views: Array of views to offer. **MUST BE FROM BIGGEST TO SMALLEST** ex: ['weeks', 'minutes', 'seconds']
* disableEditDialog: If should not enable the edit dialog on click of the field 
* DurationDialogProps: Props passed to the dialog

Remaining props are passed to the TextField component


### Localisation

https://github.com/tran-simon/material-duration-picker/issues/1#issuecomment-870100173

[Sandbox example](https://codesandbox.io/s/material-duration-picker-translation-example-3xnps?file=/src/App.tsx:0-897)
