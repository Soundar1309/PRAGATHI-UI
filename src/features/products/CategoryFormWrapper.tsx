import { useParams } from 'react-router-dom';
import { CategoryForm } from './CategoryForm';

export function CategoryFormWrapper() {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // If categoryId exists, it's an edit operation, otherwise it's a create operation
  const id = categoryId ? parseInt(categoryId) : undefined;
  
  return <CategoryForm categoryId={id} />;
} 