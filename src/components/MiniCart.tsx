import React from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Divider, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetCartQuery, useRemoveItemMutation } from '../features/cart/api';
import { useNavigate } from 'react-router-dom';

const MiniCart: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { data, isLoading } = useGetCartQuery();
  const [removeItem] = useRemoveItemMutation();
  const navigate = useNavigate();

  const handleRemove = async (id: number) => {
    await removeItem(id);
  };

  const total = data?.cart_items?.reduce((sum: number, item: { product: { price: string }; quantity: number }) => sum + parseFloat(item.product.price) * item.quantity, 0) || 0;

  return (
    <Box sx={{ width: { xs: 320, sm: 400 }, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" fontWeight={700} mb={2}>My Cart</Typography>
      <Divider />
      {isLoading ? (
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      ) : !data?.cart_items?.length ? (
        <Typography sx={{ mt: 2 }}>Your cart is empty.</Typography>
      ) : (
        <List sx={{ flexGrow: 1 }}>
          {data.cart_items.map((item: { id: number; product: { title: string; price: string; image: string }; quantity: number }) => (
            <ListItem key={item.id} secondaryAction={
              <IconButton edge="end" onClick={() => handleRemove(item.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemAvatar>
                <Avatar src={item.product.image} alt={item.product.title} variant="rounded" />
              </ListItemAvatar>
              <ListItemText
                primary={item.product.title}
                secondary={<>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2">Qty: {item.quantity}</Typography>
                    <Typography variant="body2">₹{parseFloat(item.product.price).toFixed(2)}</Typography>
                  </Stack>
                </>}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={700}>Total</Typography>
        <Typography variant="h6" color="primary">₹{total.toFixed(2)}</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!data?.cart_items?.length}
        onClick={() => { onClose(); navigate('/cart'); }}
        sx={{ fontWeight: 700, borderRadius: 2 }}
      >
        Go to Cart
      </Button>
    </Box>
  );
};

export default MiniCart;
