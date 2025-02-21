import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import PrivateRoute from "./routes/privateRoute.tsx";
import Home from "./pages/Home.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Protect the "/" route */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
