import React, { useState } from 'react';
import { useCreateOrderMutation } from './api';
import { Button, TextField, Box } from '@mui/material';

export function OrderCreate() {
  const [addressId, setAddressId] = useState('');
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrder({ address_id: Number(addressId) });
    // Optionally redirect or show confirmation
  };

  return (
    <>
      <div className="tamil-motif" style={{ margin: '2rem auto' }} />
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', bgcolor: 'background.paper', p: 3, borderRadius: 3, boxShadow: 2 }}>
        <TextField
          label="Address ID"
          value={addressId}
          onChange={e => setAddressId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 2, fontWeight: 600, fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>Place Order</Button>
        {error && <div style={{ color: 'red', fontFamily: 'Inter, Lato, Manrope, sans-serif' }}>Order failed</div>}
      </Box>
    </>
  );
}