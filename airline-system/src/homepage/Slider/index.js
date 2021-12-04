import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider(props) {
  const handleSliderChange = (event, newValue) => {
    props.func(newValue);
  };
  return (
    <Box sx={{ width: 400, leftAlign: true }}>
      <Typography id="input-slider" gutterBottom={true}>
        {props.text}
      </Typography>
      <br />
      <Slider
        style={{ marginLeft: "15px" }}
        onChange={handleSliderChange}
        aria-label="Passengers"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        step={1}
        min={0}
        max={10}
        marks
      />
    </Box>
  );
}
