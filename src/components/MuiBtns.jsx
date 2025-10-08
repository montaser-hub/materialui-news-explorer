import PlaylistAddCheckSharpIcon from "@mui/icons-material/PlaylistAddCheckSharp";
import SaveIcon from "@mui/icons-material/Save";
import { Button, ButtonGroup } from "@mui/material";
const MuiBtns = () => {
  return (
    <>
      <ButtonGroup variant="contained" sx={{ mt: 2, ml:90  }}>
        <Button variant="outlined">
            <SaveIcon />Save
        </Button>
        <Button variant="contained">
          <PlaylistAddCheckSharpIcon />
          Send
        </Button>
      </ButtonGroup>
    </>
  );
};

export default MuiBtns;
