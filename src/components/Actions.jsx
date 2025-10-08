import { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotificationMenu from "./NotificationMenu";
import UserMenu from "./UserMenu";

export default function NavActions({
  myTheme,
  currentLang,
  onLangChange,
  onThemeChange,
}) {
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);

  const openNotif = (e) => setNotifAnchor(e.currentTarget);
  const closeNotif = () => setNotifAnchor(null);
  const openUser = (e) => setUserAnchor(e.currentTarget);
  const closeUser = () => setUserAnchor(null);

  return (
    <Box display="flex" alignItems="center" gap={1.5}>

      {/* Notifications */}
      <IconButton color="inherit" onClick={openNotif}>
        <Badge badgeContent={1} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <NotificationMenu anchor={notifAnchor} onClose={closeNotif} />

      {/* Lang */}
      <Button onClick={onLangChange} color="inherit" size="small">
        {currentLang}
      </Button>

      {/* Theme */}
      <IconButton onClick={onThemeChange} color="inherit">
        {myTheme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>

      {/* User */}
      <IconButton onClick={openUser}>
        <Avatar
          src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>
      <UserMenu anchor={userAnchor} onClose={closeUser} />
    </Box>
  );
}
