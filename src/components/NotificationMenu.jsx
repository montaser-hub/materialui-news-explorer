import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotificationMenu({ anchor, onClose }) {
  const open = Boolean(anchor);
  const items = ["Action", "Another action", "Something else here"];

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
