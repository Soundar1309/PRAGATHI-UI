import { useParams } from 'react-router-dom';
import { ProductForm } from './Form';

export function ProductFormWrapper() {
  const { productId } = useParams<{ productId: string }>();
  
  // If productId exists, it's an edit operation, otherwise it's a create operation
  const id = productId ? parseInt(productId) : undefined;
  
  return <ProductForm productId={id} />;
} 