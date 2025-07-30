import { useGetOrderQuery } from './api';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOrderQuery(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Order not found</div>;

  return (
    <>
      <div className="tamil-motif" style={{ margin: '2rem auto' }} />
      <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', fontFamily: `'Playfair Display', 'Merriweather', serif` }}>Order #{data.id}</Typography>
          <Typography sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>Status: {data.status}</Typography>
          <Typography sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>Total: ${data.total}</Typography>
          <List>
            {data.order_items?.map((item: any) => (
              <ListItem key={item.id} component="div" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                {item.product?.title} x {item.quantity} (${item.price})
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
}