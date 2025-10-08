import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { Typography } from "@mui/material";
import { AlignHorizontalLeft } from "@mui/icons-material";

const MuiRadioBtn = ({ TypoVariant, number, content, ChooseValues }) => {
  const [values, setValues] = useState(null);
  return (
    <>
      <FormControl>
        {console.log(values)}
        <FormLabel sx={{ mr: 12, mt: 2 }}>
          <Typography variant={TypoVariant}>
            {number}
            {content}
          </Typography>
        </FormLabel>
        <RadioGroup
          value={values}
          onChange={(e) => setValues(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "30px",
          }}
        >
          {ChooseValues.map((val) => (
            <FormControlLabel
              key={val}
              label={val}
              value={val}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default MuiRadioBtn;