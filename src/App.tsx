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
import BlogPage from './pages/blog';
import JourneyPage from './pages/journey';
import TermsPage from './pages/terms';
import DeliveryPage from './pages/delivery';
import Wishlist from './pages/Wishlist';
import { WishlistProvider } from './contexts/WishlistContext';

export default function App() {
  return (
    <WishlistProvider>
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            // Prevent horizontal scroll
            overflowX: 'hidden',
            width: '100%',
          }}
        >
          <Header />
          
          {/* Main content area with responsive container */}
          <Box
            component="main"
            sx={{
              flex: 1,
              width: '100%',
              // Remove any potential horizontal scroll
              overflowX: 'hidden',
            }}
          >
            <Container
              maxWidth={false}
              sx={{
                px: { xs: 1, sm: 2, md: 3, lg: 4 },
                py: { xs: 1, sm: 2 },
                maxWidth: '1400px',
                width: '100%',
                mx: 'auto',
              }}
            >
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path="/products" element={<FilteredProductList />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/admin/products" element={<RequireAdmin><ProductsList /></RequireAdmin>} />
                <Route path="/admin/products/new" element={<RequireAdmin><ProductFormWrapper /></RequireAdmin>} />
                <Route path="/admin/products/:productId/edit" element={<RequireAdmin><ProductFormWrapper /></RequireAdmin>} />
                <Route path="/admin/categories" element={<RequireAdmin><CategoriesList /></RequireAdmin>} />
                <Route path="/admin/categories/new" element={<RequireAdmin><CategoryFormWrapper /></RequireAdmin>} />
                <Route path="/admin/categories/:categoryId/edit" element={<RequireAdmin><CategoryFormWrapper /></RequireAdmin>} />
                <Route path="/orders" element={<RequireAuth><OrderList /></RequireAuth>} />
                <Route path="/orders/new" element={<OrderCreate />} />
                <Route path="/orders/:id" element={<RequireAuth><OrderDetail /></RequireAuth>} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* New Quick Link Pages */}
                <Route path="/benefits" element={<BenefitsPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/journey" element={<JourneyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />

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
  );
}
