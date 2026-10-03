import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { NAV_LINKS } from "./navItems";

export default function NavLinks() {
  return (
    <Box display="flex" gap={2}>
      {NAV_LINKS.map((item) => (
        <Button key={item.to} component={Link} to={item.to} color="inherit" sx={{ textTransform: "none" }}>
          {item.name}
        </Button>
      ))}
    </Box>
  );
}
