import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";

const Layout = () => (
  <div>
    <Navigation />
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
    <ToastContainer
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
);

export default Layout;
