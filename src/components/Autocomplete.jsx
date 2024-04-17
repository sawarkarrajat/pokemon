import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutocompleteDropDown(props) {
  const { options, selected} = props;
  const optionLabels = options.map((item) => item.name);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  if (props.options) {
    return (
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          console.log('newValue: ', newValue)
          setValue(newValue);
          if (newValue)
            selected(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          console.log('newInputValue: ', newInputValue)
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={optionLabels}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Pokemon" />}
      />
    );
  } else {
    return null;
  }
}
