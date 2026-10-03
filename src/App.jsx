import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import MainNavBar from "./components/MainNavBar.jsx";
import Form from "./pages/Form.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const mode = useSelector((state) => state.theme);
  const lang = useSelector((state) => state.myLang.lang);
  const direction = lang === "ar" ? "rtl" : "ltr";

  // The Redux theme and language drive MUI's palette and text direction.
  const theme = useMemo(() => createTheme({ palette: { mode }, direction }), [mode, direction]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div dir={direction} style={{ paddingTop: "64px", minHeight: "100vh" }}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <MainNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
