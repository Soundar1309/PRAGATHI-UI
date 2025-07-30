// src/components/NavBar.tsx
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NotificationDropdown } from './NotificationDropdown';
import { useUserRole } from '../hooks/useUserRole';

export function NavBar() {
  const { role } = useUserRole();
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Products</Button>
        <Button color="inherit" component={Link} to="/orders">Orders</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
        {role === 'admin' && (
          <>
            <Button color="inherit" component={Link} to="/admin/products/new">Add Product</Button>
            <Button color="inherit" component={Link} to="/admin/dashboard">Admin Dashboard</Button>
          </>
        )}
        {role === 'delivery' && (
          <Button color="inherit" component={Link} to="/delivery/orders">My Deliveries</Button>
        )}
        <Button color="inherit" component={Link} to="/cart">
          <ShoppingCartIcon />
        </Button>
        <NotificationDropdown />
      </Toolbar>
    </AppBar>
  );
}
