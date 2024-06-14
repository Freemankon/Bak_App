import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "components/ProtectedRoute";
import Layout from "pages/Layout";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import MenuPage from "pages/MenuPage";
import OrderPage from "pages/OrderPage";
import AccountingPage from "pages/AccountingPage";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      navigate(location);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="menu"
          element={
            <ProtectedRoute>
              <MenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="order"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="accounting"
          element={
            <ProtectedRoute>
              <AccountingPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
