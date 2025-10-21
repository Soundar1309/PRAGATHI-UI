import { useGetCartQuery, useUpdateItemMutation, useRemoveItemMutation } from './api';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PAYMENT_ENABLED, PAYMENT_DISABLED_MESSAGE } from '../../config/payment';
import { useSnackbar } from 'notistack';

export function Cart() {
  const { data, isLoading } = useGetCartQuery();
  const [updateItem] = useUpdateItemMutation();
  const [removeItem] = useRemoveItemMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleCheckout = () => {
    if (!PAYMENT_ENABLED) {
      enqueueSnackbar(PAYMENT_DISABLED_MESSAGE, { variant: 'warning' });
      return;
    }
    window.location.href = '/orders/new';
  };

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Your cart is empty.</div>;

  return (
    <>
      <div className="tamil-motif" style={{ margin: '2rem auto' }} />
      <List>
        {data.cart_items?.map((item: any) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={<span style={{ fontWeight: 700, color: 'var(--brand-green)', fontFamily: 'Playfair Display, Merriweather, serif' }}>{`${item.product?.title} x ${item.quantity}`}</span>}
              secondary={<span style={{ fontFamily: 'Inter, Lato, Manrope, sans-serif' }}>{`$${item.product?.price} each`}</span>}
            />
            <TextField
              type="number"
              value={item.quantity}
              onChange={e => updateItem({ id: item.id, quantity: Number(e.target.value) })}
              size="small"
              style={{ width: 60, marginRight: 8 }}
            />
            <IconButton onClick={() => removeItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
        <ListItem>
          <Button 
            variant="contained" 
            onClick={handleCheckout}
            disabled={!PAYMENT_ENABLED}
            sx={{ 
              fontWeight: 600, 
              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
              opacity: !PAYMENT_ENABLED ? 0.6 : 1,
            }}
          >
            {PAYMENT_ENABLED ? 'Checkout' : 'Payment Disabled'}
          </Button>
        </ListItem>
      </List>
    </>
  );
}