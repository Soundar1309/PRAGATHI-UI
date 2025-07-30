import React, { useState } from 'react';
import { useCreateProductMutation, useUpdateProductMutation, useGetProductQuery } from './api';
import { TextField, Button, Box } from '@mui/material';

export function ProductForm({ productId }: { productId?: number }) {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data } = useGetProductQuery(productId!, { skip: !productId });
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image: '',
  });

  React.useEffect(() => {
    if (data) setForm({
      title: data.title || '',
      description: data.description || '',
      price: data.price || '',
      stock: data.stock || '',
      category_id: data.category_id || '',
      image: data.image || '',
    });
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productId) {
      await updateProduct({ id: productId, data: form });
    } else {
      await createProduct(form);
    }
  };

  return (
    <>
      <div className="tamil-motif" style={{ margin: '2rem auto' }} />
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', bgcolor: 'background.paper', p: 3, borderRadius: 3, boxShadow: 2 }}>
        <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Price" name="price" value={form.price} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Stock" name="stock" value={form.stock} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Category ID" name="category_id" value={form.category_id} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Image URL" name="image" value={form.image} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" sx={{ mt: 2, fontWeight: 600, fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>{productId ? 'Update' : 'Create'} Product</Button>
      </Box>
    </>
  );
}
