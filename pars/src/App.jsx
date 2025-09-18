import "./App.css";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Services from "./components/Services";
import Layout from "./Layout/Layout";
import Blogs from "./components/Blogs";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import AdminServices from "./admin/Services";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./admin/Login";
import { ProtectedAdmin } from "./middleware/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import ContactsPage from "./admin/Contact";
import OTPVerificationPage from "./components/VerifyOtp";
import UsersPage from "./admin/Users";
import EmailVerificationPage from "./components/EmailVerify";
import ResetPassword from "./components/ForgotPassword";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="verify-otp" element={<OTPVerificationPage />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="about" element={<About />} />

          {/* Email Verification Routes */}
          <Route path="/forgot-password" element={<EmailVerificationPage />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
        </Route>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route path="services" element={<AdminServices />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
