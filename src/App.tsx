import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Profile } from './features/auth/Profile';
import { ProductList } from './features/products/List';
import { FilteredProductList } from './features/products/FilteredProductList';
import { SearchResults } from './features/products/SearchResults';
import { ProductDetail } from './features/products/Detail';
import { ProductFormWrapper } from './features/products/ProductFormWrapper';
import { CategoryFormWrapper } from './features/products/CategoryFormWrapper';
import { CategoriesList } from './features/products/CategoriesList';
import { ProductsList } from './features/products/ProductsList';
import { OrderList } from './features/orders/List';
import { OrderDetail } from './features/orders/Detail';
import { OrderCreate } from './features/orders/Create';
import Header from './components/Header';
import { CartPage } from './features/cart/CartPage';
import { RequireAuth } from './components/RequireAuth';
import { RequireAdmin } from './components/RequireAdmin';
import { LoginRegister } from './features/auth/LoginRegister';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import RefundPolicy from './pages/RefundPolicy';
import AboutPage from './pages/about';
import GalleryPage from './pages/gallery';
import ContactPage from './pages/contact';
import BenefitsPage from './pages/benefits';
import TestimonialsPage from './pages/testimonials';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import JourneyPage from './pages/journey';
import TermsPage from './pages/terms';
import DeliveryPage from './pages/delivery';
import Wishlist from './pages/Wishlist';
import NurseryPage from './pages/NurseryPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccess from './pages/OrderSuccess';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { AdminDashboard } from './features/admin/Dashboard';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderHistoryTestPage from './pages/OrderHistoryTestPage';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <WishlistProvider>
        <Router>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            // Allow vertical scrolling for sticky to work
            overflowY: 'auto',
            overflowX: 'hidden',
            width: '100%',
            maxWidth: '100vw',
            position: 'relative',
          }}
        >
          <Header />
          
          {/* Main content area with responsive container */}
          <Box
            component="main"
            sx={{
              flex: 1,
              width: '100%',
              maxWidth: '100vw',
              // Remove any potential horizontal scroll
              overflowX: 'hidden',
              // Ensure enough content height for proper layout
              minHeight: 'calc(100vh - 80px)', // Account for header height
              // Add top margin to account for fixed header height - responsive
              mt: { xs: '80px', sm: '100px', md: '120px', lg: '140px' },
              position: 'relative',
            }}
          >
            <Container
              maxWidth={false}
              sx={{
                px: { xs: 1, sm: 2, md: 3, lg: 4 },
                py: { xs: 1, sm: 2 },
                maxWidth: { xs: '100vw', sm: '100vw', md: '1400px' },
                width: '100%',
                mx: 'auto',
                overflowX: 'hidden',
              }}
            >
              <Routes>
                <Route path="/" element={<><ProductList /></>} />
                <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path="/products" element={<FilteredProductList />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
                <Route path="/admin/products" element={<RequireAdmin><ProductsList /></RequireAdmin>} />
                <Route path="/admin/products/new" element={<RequireAdmin><ProductFormWrapper /></RequireAdmin>} />
                <Route path="/admin/products/:productId/edit" element={<RequireAdmin><ProductFormWrapper /></RequireAdmin>} />
                <Route path="/admin/categories" element={<RequireAdmin><CategoriesList /></RequireAdmin>} />
                <Route path="/admin/categories/new" element={<RequireAdmin><CategoryFormWrapper /></RequireAdmin>} />
                <Route path="/admin/categories/:categoryId/edit" element={<RequireAdmin><CategoryFormWrapper /></RequireAdmin>} />
                <Route path="/orders" element={<RequireAuth><OrderList /></RequireAuth>} />
                <Route path="/order-history" element={<RequireAuth><OrderHistoryPage /></RequireAuth>} />
                <Route path="/order-history-test" element={<RequireAuth><OrderHistoryTestPage /></RequireAuth>} />
                <Route path="/orders/new" element={<OrderCreate />} />
                <Route path="/orders/:id" element={<RequireAuth><OrderDetail /></RequireAuth>} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* New Quick Link Pages */}
                <Route path="/benefits" element={<BenefitsPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/journey" element={<JourneyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
                <Route path="/nursery" element={<NurseryPage />} />
                <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
                <Route path="/order-success" element={<OrderSuccess />} />

                {/* Policy Pages */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/returns" element={<ReturnPolicy />} />
                <Route path="/refund" element={<RefundPolicy />} />
                {/* Add more routes as needed */}
              </Routes>
            </Container>
          </Box>
          
          <Footer />
        </Box>
        </Router>
        </WishlistProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
