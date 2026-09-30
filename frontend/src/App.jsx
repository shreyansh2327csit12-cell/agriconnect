import Home from "./Pages/App";
import Navbar from "./App/Navbar";
import Footer from "./App/Footer";
import { Button } from "@/src/components/ui/button";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Marketplace from "./Pages/Marketplace";
import ProductListForm from "./Pages/ProductListForm";
import { ErrorBoundary } from "react-error-boundary";
import ProductOrderPage from "./Pages/ProductOrderPage";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import { Toaster } from "@/src/components/ui/sonner";
import { createContext, useContext } from "react";
import { toast } from "sonner";
import Message from "./Pages/Message";
import ProductPage from "./Pages/ProductPage";
import AboutUs from "./Pages/AboutUs";
import FarmerProfile from "./Pages/FarmerProfile";
import FarmerProductPage from "./Pages/farmerProductPage";
import QuestionPage from "./Pages/QuestionPage";
import Admin from "./Pages/admin";
import Profile from "./Pages/Profile";
// Create a toast context for application-wide error notifications
export const ToastContext = createContext({
  showError: (message) => {},
  showSuccess: (message) => {},
});

export const ToastProvider = ({ children }) => {
  const showError = (message) => toast.error(message || "An error occurred");
  const showSuccess = (message) => toast.success(message || "Success");

  return (
    <ToastContext.Provider value={{ showError, showSuccess }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
import CommunityForum from "./Pages/CommunityForum";
import AskQuestionForm from "./Pages/AskQuestionForm";
// import FarmerProfile from "./Pages/FarmerProfile";

// Create a Layout component that includes Navbar and Footer
const Layout = () => (
  <>
    <Navbar />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>
);

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.error("Error caught by ErrorBoundary:", error);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong
      </h2>
      <p className="mb-4 text-gray-700">
        {error.message || "An unexpected error occurred"}
      </p>
      <pre className="bg-gray-100 p-4 rounded mb-4 max-w-full overflow-auto text-sm">
        {error.stack}
      </pre>
      <div className="flex gap-4">
        <Button onClick={resetErrorBoundary}>Try Again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "product-form", element: <ProductListForm /> },
      { path: "product-order/:id", element: <ProductOrderPage /> },
      { path: "contactus", element: <Message /> },
      { path: "products", element: <ProductPage /> },
      { path: "community-forum", element: <CommunityForum /> },
      { path: "ask-question-form", element: <AskQuestionForm /> },
      { path: "question/:id", element: <QuestionPage /> },
      { path: "profile", element: <Profile /> },
      { path:"farmer-product/:id", element: <FarmerProductPage />},
      { path:"admin", element: <Admin /> },
    ],
  },
]);

export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the app state here if needed
        console.log("Error boundary reset");
      }}
      onError={(error, info) => {
        // Log the error to your error reporting service
        console.error("Caught an error:", error, info);
      }}
    >
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ErrorBoundary>
  );
}
