import CardInfo from './components/MuiCardHeader.jsx'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainNavBar from './components/MainNavBar.jsx'
import { useSelector } from 'react-redux';
import Form from './pages/Form.jsx'
import Home from './pages/Home.jsx'
function App() {
  const theme = useSelector((state) => state.theme);
  const lang = useSelector((state) => state.myLang.lang);
  return (
    <>
      <div
        dir={`${lang === "ar" ? "rtl" : "ltr"}`}
        className={`${
          theme === "light" ? "bg-light text-dark" : "bg-dark text-light"
          } min-vh-100` }
         style={{ paddingTop: "64px" }}
      >
      <BrowserRouter>
        <MainNavBar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/form" element={ <Form /> } />
     </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App