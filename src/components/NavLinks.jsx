import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Home } from "@mui/icons-material";

export default function NavLinks() {
  const links = [ { name:"Home",to:"/"},{ name:"About",to:"#"}, {name:"Contact",to:"#"},{name:"Form",to: "/form"}];
  return (
    <Box display="flex" gap={2}>
      {links.map((item,index) => (
        <Button
          key={index}
          component={Link}
          to={item.to}
          color="inherit"
          sx={{ textTransform: "none" }}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );
}
