/**
 * Razorpay TypeScript definitions
 */

// Razorpay checkout options
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

// Razorpay payment response
export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Request to create a Razorpay order
export interface CreateOrderRequest {
  amount: number;
  currency?: string;
  order_id?: number;
}

// Response from creating a Razorpay order
export interface CreateOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  payment_id: number;
}

// Request to verify a Razorpay payment
export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Response from verifying a Razorpay payment
export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  payment_id?: number;
  status?: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      close: () => void;
    };
  }
}
