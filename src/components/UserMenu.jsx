import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserMenu({ anchor, onClose }) {
  const open = Boolean(anchor);
  const items = ["Profile", "Settings", "Logout"];

  return (
    <Menu
      anchorEl={anchor}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {items.map((item) => (
        <MenuItem
          key={item}
          component={Link}
          to="#"
          onClick={onClose}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
}
