import { FormLabel, TextField } from "@mui/material";
import { Typography } from "@mui/material";

const MuiInput = ({ TypoVariant , number, content}) => {
  return (
    <>
      <FormLabel>
        <Typography variant={TypoVariant} sx={{ mr: 65, mt: 2 }}>
          {number}
          {content}
        </Typography>
      </FormLabel>
      <TextField label="at least 5 characters" variant="standard" sx={{ mr: 50, mt: 2, width: "500px" }} />
    </>
  );
};

export default MuiInput;