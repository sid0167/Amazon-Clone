import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import NotFound from "./pages/NotFound";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<HomePage />} />
<Route path="/product/:id" element={<ProductDetailPage />} />

<Route 
  path="/cart" 
  element={
    <ProtectedRoute>
      <CartPage />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/checkout" 
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/orders" 
  element={
    <ProtectedRoute>
      <OrderHistoryPage />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/wishlist" 
  element={
    <ProtectedRoute>
      <WishlistPage />
    </ProtectedRoute>
  } 
/>

<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />
<Route path="*" element={<NotFound />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
