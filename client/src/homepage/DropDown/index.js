import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown(props) {
    const [cabin, setCabin] = React.useState('');

    const handleChange = (event) => {
      setCabin(event.target.value);
      props.func(event.target.value);
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Cabin</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cabin}
            label="Cabin"
            onChange={handleChange}
            error={props.error}
          >
            <MenuItem value={"Economy"}>Economy</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
            <MenuItem value={"First Class"}>First Class</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }