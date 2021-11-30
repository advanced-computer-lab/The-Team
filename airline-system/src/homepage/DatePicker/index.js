import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

export default function DatePicker(props) {
  const [value, setValue] = React.useState([null, null]);

  props.func(value);

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <DateRangePicker
        startText="Departure"
        endText="Arrival"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} error ={props.error}/>
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} error = {props.error} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
        );
}