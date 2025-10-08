import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
export default function NavLogo() {
  const myTheme = useSelector((state) => state.theme);

  const logoSrc =
    myTheme === "light"
      ? '/logo.png'
      : '/white_on_trans.png';

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <img
        src={logoSrc}
        alt="Logo"
        height="80px"
        loading="lazy"
        style={{ transition: "filter 0.3s ease" }}
      />
    </Box>
  );
}
