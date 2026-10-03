import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavLogo() {
  const myTheme = useSelector((state) => state.theme);
  const logo = myTheme === "light" ? "logo.png" : "white_on_trans.png";

  return (
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={`${import.meta.env.BASE_URL}${logo}`} alt="News Explorer home" height="56" />
    </Link>
  );
}
