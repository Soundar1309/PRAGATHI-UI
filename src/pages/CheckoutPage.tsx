import {
  HelpOutline,
  Search
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../features/auth/userApi';
import { useGetCartQuery } from '../features/cart/api';
import { useRazorpay } from '../hooks/useRazorpay';
import { formatProductName } from '../utils/formatters';
import { PAYMENT_ENABLED, PAYMENT_DISABLED_MESSAGE, PAYMENT_DISABLED_ACTIONS } from '../config/payment';

// Indian states list
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

interface CheckoutFormData {
  // Contact
  email: string;
  emailNewsletter: boolean;
  
  // Delivery
  country: string;
  fullName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  saveInfo: boolean;
  
  // Billing
  billingSameAsShipping: boolean;
  billingFullName: string;
  billingAddress: string;
  billingApartment: string;
  billingCity: string;
  billingState: string;
  billingPinCode: string;
  billingPhone: string;
  
  // Discount
  discountCode: string;
}

const CheckoutPage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
  // API hooks
  const { data: cart, isLoading: cartLoading } = useGetCartQuery();
  const { data: userProfile, isLoading: profileLoading } = useGetProfileQuery();
  
  // Razorpay hook
  const { openRazorpay, isLoading: isPaymentLoading } = useRazorpay({
    onSuccess: (response) => {
      console.log('Payment successful:', response);
      // Redirect to success page or show success message
      navigate('/order-success', { state: { paymentId: response.razorpay_payment_id } });
    },
    onError: (error) => {
      console.error('Payment failed:', error);
    },
    onDismiss: () => {
      console.log('Payment cancelled by user');
    },
  });
  
  // Form state
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    emailNewsletter: true,
    country: 'India',
    fullName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Tamil Nadu',
    pinCode: '',
    phone: '',
    saveInfo: false,
    billingSameAsShipping: true,
    billingFullName: '',
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingState: '',
    billingPinCode: '',
    billingPhone: '',
    discountCode: '',
  });

  // Pre-fill form with user data
  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        email: userProfile.email || '',
        fullName: userProfile.name || '',
        phone: userProfile.phone || '',
      }));
    }
  }, [userProfile]);

  const handleInputChange = (field: keyof CheckoutFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // const handleBillingSameAsShipping = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const isSame = event.target.checked;
  //   setFormData(prev => ({
  //     ...prev,
  //     billingSameAsShipping: isSame,
  //     billingFullName: isSame ? prev.fullName : '',
  //     billingAddress: isSame ? prev.address : '',
  //     billingApartment: isSame ? prev.apartment : '',
  //     billingCity: isSame ? prev.city : '',
  //     billingState: isSame ? prev.state : '',
  //     billingPinCode: isSame ? prev.pinCode : '',
  //     billingPhone: isSame ? prev.phone : '',
  //   }));
  // };

  const calculateSubtotal = () => {
    if (!cart?.cart_items) return 0;
    return cart.cart_items.reduce((total, item) => total + item.subtotal, 0);
  };

  // const calculateTax = () => {
  //   return calculateSubtotal() * 0.11; // 11% tax
  // };

  const calculateTotal = () => {
    return calculateSubtotal();
  };


  const handlePayNow = () => {
    // Validate form data
    if (!formData.email || !formData.fullName || !formData.address || !formData.city || !formData.pinCode || !formData.phone) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return;
    }

    const totalAmount = calculateTotal();
    
    // Open Razorpay payment
    openRazorpay(
      {
        amount: totalAmount,
        currency: 'INR',
      },
      {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      }
    );
  };

  if (cartLoading || profileLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!cart?.cart_items?.length) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ textAlign: 'center' }}>
          Your cart is empty. Please add some items before checkout.
        </Alert>
      </Container>
    );
  }

  // If payment is disabled, show a simple message instead of the form
  if (!PAYMENT_ENABLED) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom textAlign="center" color="primary">
            Checkout
          </Typography>
          
          <Alert 
            severity="warning" 
            sx={{ 
              mb: 4,
              borderRadius: 2,
              textAlign: 'center',
              '& .MuiAlert-message': {
                fontSize: '1rem',
                width: '100%'
              }
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Payment Temporarily Disabled
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {PAYMENT_DISABLED_ACTIONS.showMessage}
            </Typography>
            {PAYMENT_DISABLED_ACTIONS.showContactInfo && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Contact Us for Orders:
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  📧 {PAYMENT_DISABLED_ACTIONS.showEmail}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  📞 {PAYMENT_DISABLED_ACTIONS.showPhone}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/products')}
                  sx={{ mt: 2 }}
                >
                  Continue Shopping
                </Button>
              </Box>
            )}
          </Alert>
        </Container>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center" color="primary">
          Checkout
        </Typography>
        
        <Grid container spacing={4}>
          {/* Left Column - Form */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              {/* Contact Section */}
              <Card elevation={2}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight={600}>
                      Contact
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    margin="normal"
                    required
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.emailNewsletter}
                        onChange={handleInputChange('emailNewsletter')}
                      />
                    }
                    label="Email me with news and offers"
                  />
                </CardContent>
              </Card>

              {/* Delivery Section */}
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={3}>
                    Delivery
                  </Typography>
                  
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Country/Region</InputLabel>
                    <Select
                      value={formData.country}
                      onChange={handleInputChange('country')}
                      label="Country/Region"
                    >
                      <MenuItem value="India">India</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange('fullName')}
                    margin="normal"
                    required
                  />

                  <TextField
                    fullWidth
                    label="Address"
                    value={formData.address}
                    onChange={handleInputChange('address')}
                    margin="normal"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange('apartment')}
                    margin="normal"
                  />

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        label="City"
                        value={formData.city}
                        onChange={handleInputChange('city')}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>State</InputLabel>
                        <Select
                          value={formData.state}
                          onChange={handleInputChange('state')}
                          label="State"
                        >
                          {INDIAN_STATES.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        label="PIN code"
                        value={formData.pinCode}
                        onChange={handleInputChange('pinCode')}
                        required
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    margin="normal"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <HelpOutline />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.saveInfo}
                        onChange={handleInputChange('saveInfo')}
                      />
                    }
                    label="Save this information for next time"
                  /> */}
                </CardContent>
              </Card>

              {/* Shipping Method Section */}
              {/* <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={3}>
                    Shipping method
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Enter your shipping address to view available shipping methods."
                    disabled
                    sx={{ bgcolor: 'grey.100' }}
                  />
                </CardContent>
              </Card> */}

              {/* Payment Section */}
              {/* <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={1}>
                    Payment
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    All transactions are secure and encrypted.
                  </Typography>
                  
                  <Paper
                    elevation={1}
                    sx={{
                      p: 3,
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={2}>
                      <Security color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" color="primary">
                        Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Chip label="UPI" size="small" />
                      <Chip label="VISA" size="small" />
                      <Chip label="Mastercard" size="small" />
                      <Chip label="+18" size="small" />
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Box sx={{ width: 40, height: 20, bgcolor: 'grey.300', borderRadius: 1 }} />
                      <ArrowForward />
                      <Box sx={{ width: 40, height: 20, bgcolor: 'primary.main', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Lock sx={{ color: 'white', fontSize: 12 }} />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      After clicking 'Pay now', you will be redirected to Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.
                    </Typography>
                  </Paper>
                </CardContent>
              </Card> */}

              {/* Billing Address Section */}
              {/* <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={3}>
                    Billing address
                  </Typography>
                  <RadioGroup
                    value={formData.billingSameAsShipping}
                    onChange={handleBillingSameAsShipping}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Same as shipping address"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Use a different billing address"
                    />
                  </RadioGroup>

                  {!formData.billingSameAsShipping && (
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={formData.billingFullName}
                        onChange={handleInputChange('billingFullName')}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Address"
                        value={formData.billingAddress}
                        onChange={handleInputChange('billingAddress')}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Apartment, suite, etc. (optional)"
                        value={formData.billingApartment}
                        onChange={handleInputChange('billingApartment')}
                        margin="normal"
                      />
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            label="City"
                            value={formData.billingCity}
                            onChange={handleInputChange('billingCity')}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <FormControl fullWidth>
                            <InputLabel>State</InputLabel>
                            <Select
                              value={formData.billingState}
                              onChange={handleInputChange('billingState')}
                              label="State"
                            >
                              {INDIAN_STATES.map((state) => (
                                <MenuItem key={state} value={state}>
                                  {state}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            label="PIN code"
                            value={formData.billingPinCode}
                            onChange={handleInputChange('billingPinCode')}
                          />
                        </Grid>
                      </Grid>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={formData.billingPhone}
                        onChange={handleInputChange('billingPhone')}
                        margin="normal"
                      />
                    </Box>
                  )}
                </CardContent>
              </Card> */}

              {/* Pay Now Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handlePayNow}
                disabled={isPaymentLoading}
                sx={{
                  py: 2,
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                {isPaymentLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Processing...
                  </>
                ) : (
                  'Pay now'
                )}
              </Button>
            </Stack>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card elevation={2} sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={3}>
                  Order Summary
                </Typography>

                {/* Cart Items */}
                <Stack spacing={2} mb={3}>
                  {cart?.cart_items?.map((item) => (
                    <Box key={item.id} display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: 'grey.200',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        {(item.item_image || item.product?.image) && (
                          <img
                            src={item.item_image || item.product?.image}
                            alt={item.item_name || item.product?.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: 4,
                            }}
                          />
                        )}
                        <Chip
                          label={item.quantity}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            minWidth: 20,
                            height: 20,
                            fontSize: 12,
                          }}
                        />
                      </Box>
                      <Box flex={1}>
                        <Typography variant="body2" fontWeight={500} noWrap>
                          {formatProductName(item.item_name || item.product?.title || '')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.effective_quantity} {item.effective_unit}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          ₹{item.subtotal.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Discount Code */}
                {/* <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Discount code"
                    value={formData.discountCode}
                    onChange={handleInputChange('discountCode')}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button size="small" onClick={handleApplyDiscount}>
                            Apply
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box> */}

                <Divider sx={{ my: 2 }} />

                {/* Order Totals */}
                <Stack spacing={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">
                      Subtotal ({cart?.cart_items?.length || 0} items)
                    </Typography>
                    <Typography variant="body2">
                      ₹{calculateSubtotal().toFixed(2)}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Shipping</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enter shipping address
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" fontWeight={600}>
                      Total
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      INR ₹{calculateTotal().toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default CheckoutPage;
