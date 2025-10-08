<img width="1246" height="870" alt="image" src="https://github.com/user-attachments/assets/629f1f36-fa86-4ebc-ac62-d65534111034" />
<img width="1253" height="866" alt="image" src="https://github.com/user-attachments/assets/ea21a9e8-1c64-4ee9-a306-57b06b774644" />

## 📰 Project: **Material UI News Explorer**

### 📋 Overview

This React project is a **News Explorer App** built with **Material UI (MUI)** and **Redux Toolkit**.
It fetches live articles from the [NewsAPI](https://newsapi.org/) and allows users to:

* Search topics dynamically
* View filtered suggestions
* Share or bookmark news
* Toggle between **light/dark theme**
* Switch between **English and Arabic** languages

---

### ⚙️ Tech Stack

| Category         | Tools / Libraries          |
| ---------------- | -------------------------- |
| Frontend         | React 19, Vite             |
| UI Framework     | MUI v7, Emotion            |
| State Management | Redux Toolkit              |
| HTTP Client      | Axios                      |
| Routing          | React Router DOM v7        |
| Language Support | Custom Redux slice (EN/AR) |
| Build Tools      | Vite + ESLint              |

---

### 📁 Folder Structure

```
materialui/
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Main news page
│   │   └── Form.jsx          # Example form page
│   │
│   ├── components/
│   │   ├── MainNavBar.jsx    # Navbar with theme/lang toggles
│   │   └── MuiCardHeader.jsx # Optional card header demo
│   │
│   ├── AxiosInstance/
│   │   └── AxiosInstance.js  # Axios setup with interceptors
│   │
│   ├── store/
│   │   └── store.js          # Redux store (theme + language slices)
│   │
│   ├── Locals/
│   │   ├── en.js             # English text
│   │   └── ar.js             # Arabic text
│   │
│   ├── App.jsx               # Root component with router
│   ├── App.css
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

### 🚀 Getting Started

#### 1️⃣ Install Dependencies

```bash
npm install
```

#### 2️⃣ Run Development Server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

#### 3️⃣ Build for Production

```bash
npm run build
```

---

### 🧠 Features Explained

#### 🔍 **Home Page (News Search)**

* Uses `useState`, `useEffect`, and `useRef` for dynamic search.
* Fetches from `https://newsapi.org/v2/everything`.
* Filters results by title in real time.
* Displays results using responsive MUI `<Grid>` + `<Card>` components.

#### 🌐 **Axios Interceptor**

```js
axoinstance.interceptors.request.use((request) => {
  request.params = { ...request.params, apiKey: "YOUR_API_KEY" };
  return request;
});
```

👉 Automatically attaches your API key to every request.

#### 🌓 **Theme & Language Redux Slices**

* `themeSlice` toggles between `light` and `dark` UI.
* `langSlice` toggles between English and Arabic text (RTL/LTR layout).

#### 🧭 **Routing**

* `/` → Home
* `/form` → Sample Form Page

---

### 🧩 Example Redux Store Setup

```js
const myStore = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    myLang: langSlice.reducer,
  },
});
```

Dispatch actions from UI buttons:

```js
dispatch(toggleTheme());
dispatch(toggleLang());
```

---

### 🧱 Example MUI Styling Highlights

```jsx
<Card
  sx={{
    width: "100%",
    borderRadius: 3,
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
    transition: "transform 0.25s, box-shadow 0.25s",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    },
  }}
>
```

---

### 🔑 API Reference

Uses **NewsAPI.org** (requires API key).

Replace the default key in:
`src/AxiosInstance/AxiosInstance.js`

```js
apiKey: "YOUR_NEWSAPI_KEY",
```

---

### 🧰 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run dev server           |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---
