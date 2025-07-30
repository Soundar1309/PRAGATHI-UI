import { useGetCartQuery, useUpdateItemMutation, useRemoveItemMutation } from './api';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function Cart() {
  const { data, isLoading } = useGetCartQuery();
  const [updateItem] = useUpdateItemMutation();
  const [removeItem] = useRemoveItemMutation();

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
          <Button variant="contained" href="/orders/new" sx={{ fontWeight: 600, fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>Checkout</Button>
        </ListItem>
      </List>
    </>
  );
}