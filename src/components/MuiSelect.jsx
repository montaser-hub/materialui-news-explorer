import { MenuItem, TextField, FormLabel, Typography } from "@mui/material";
import { useState } from "react";

const MuiSelect = ({ TypoVariant, number, content, Months }) => {
  const [values, setValues] = useState(null);
  return (
    <>
      <FormLabel>
        <Typography variant={TypoVariant} sx={{ mr: 55, mt: 4 }}>
          {number}
          {content}
        </Typography>
      </FormLabel>
      <TextField
        select
        label="Select the next Month scehdule"
        variant="standard"
        sx={{ mr: 73, mt: 2, width: "300px" }}
        value={values}
        onChange={(e) => setValues(e.target.value)}
        slotProps={{ select: {multiple: true} }}
      >
        {Months.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default MuiSelect;   
