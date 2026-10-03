import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { toggleLang, toggleTheme } from "../Redux-Toolkit/Store";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import { NAV_LINKS } from "./navItems";
import NavActions from "./Actions";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const myTheme = useSelector((state) => state.theme);
  const currentLang = useSelector((state) => state.myLang.lang);
  const content = useSelector((state) => state.myLang.content);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const changeTheme = () => dispatch(toggleTheme());
  const changeLang = () => dispatch(toggleLang());

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundColor: myTheme === "light" ? "#f8f9fa" : "#212121",
        color: myTheme === "light" ? "#000" : "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            aria-label="Open menu"
            sx={{ display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <NavLogo />
        </Box>

        {/*  Links on mobile) */}
        <Box sx={{ display: { xs: "none", lg: "flex" } }}>
          <NavLinks content={content} />
        </Box>

        {/* Actions */}
        <NavActions
          myTheme={myTheme}
          currentLang={currentLang}
          onLangChange={changeLang}
          onThemeChange={changeTheme}
          content={content}
        />
      </Toolbar>
      {/* Phone and tablet menu */}
      <Drawer open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { lg: "none" } }}>
        <List sx={{ width: 220, pt: 9 }}>
          {NAV_LINKS.map((item) => (
            <ListItemButton key={item.to} component={Link} to={item.to} onClick={handleDrawerToggle}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
