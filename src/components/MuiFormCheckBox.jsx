import {Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const CheckBox = ( { TypoVariant, CheckValues, number, content } ) => {
    const [ values, setValues ] = useState( [] );
    
    const handelChange = (e) => {
        let idx = values.indexOf( e.target.value );
        console.log(idx);
      if (idx === -1) {
        setValues([...values, e.target.value]);
      } else {
          setValues(values.filter((val) => val !== e.target.value));
        // setValues([...values.slice(0, idx), ...values.slice(idx + 1)]);
      }
    };

  return (
    <>
      <FormControl>
        {console.log(values)}
        <FormLabel sx={{ mr: 50 }}>
          <Typography variant={TypoVariant}>
            {number}
            {content}
          </Typography>
        </FormLabel>
        {CheckValues.map((val) => (
          <FormControlLabel sx={{ ml: 2 }}
            key={val}
            label={val}
            value={val}
            control={<Checkbox />}
            onChange={handelChange}
          />
        ))}
      </FormControl>
    </>
  );
};

export default CheckBox;