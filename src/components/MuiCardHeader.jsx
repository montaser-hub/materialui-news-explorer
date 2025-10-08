import PlaylistAddCheckSharpIcon from "@mui/icons-material/PlaylistAddCheckSharp";
import { CardHeader, Icon } from "@mui/material";

const CardInfo = () => {
  return (
    <>
      <CardHeader
        sx={{
          textAlign: "left",
          borderBottom: "solid green",
          "& .MuiCardHeader-title": { fontWeight: "bold", fontSize: "50px" },
        }}
        avatar={<PlaylistAddCheckSharpIcon sx={{ marginTop: "-20px", fontSize: "50px", bgcolor: "greenyellow" }} />}
        title="Evaluaton Form"
        subheader="Please answer the following questions"
      />
    </>
  );
};

export default CardInfo;
