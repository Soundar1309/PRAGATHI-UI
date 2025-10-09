/**
 * Utility functions for formatting data
 */

/**
 * Formats a price by removing unnecessary decimal places
 * Converts "23.00" to "23", "23.50" to "23.5", "23.25" to "23.25"
 * @param price - The price value (number or string)
 * @returns Formatted price string
 */
export function formatPrice(price: number | string): string {
  const num = Number(price);
  if (isNaN(num)) return '0';
  
  // Remove unnecessary decimal places
  return num % 1 === 0 ? Math.floor(num).toString() : num.toString();
}

/**
 * Formats a product name by removing unnecessary decimal places from quantities
 * Converts "Saamai - 500.00 g" to "Saamai - 500g", "Rice - 1.00 kg" to "Rice - 1kg"
 * @param productName - The full product name (e.g., "Saamai - 500.00 g")
 * @returns Formatted product name (e.g., "Saamai - 500g")
 */
export function formatProductName(productName: string): string {
  if (!productName) return productName;
  
  // Handle patterns like "Product Name - 500.00 g" or "Product Name - 1.00 kg"
  const match = productName.match(/^(.+?)\s*-\s*(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
  if (match) {
    const [, productBase, quantityStr, unit] = match;
    const quantity = parseFloat(quantityStr);
    if (isNaN(quantity)) return productName;
    
    // Format the quantity without unnecessary decimal places
    const formattedQuantity = quantity % 1 === 0 ? Math.floor(quantity).toString() : quantity.toString();
    
    // Convert 'l' to 'L' for liters
    const formattedUnit = unit.toLowerCase() === 'l' ? 'L' : unit;
    
    return `${productBase} - ${formattedQuantity}${formattedUnit}`;
  }
  
  // Fallback to the original formatVariationDisplayName for simple cases
  return formatVariationDisplayName(productName);
}

/**
 * Formats a variation display name by removing unnecessary decimal places
 * Converts "1.00 kg" to "1kg", "500.00g" to "500g", etc.
 * @param displayName - The display name from the backend (e.g., "1.00 kg")
 * @returns Formatted display name (e.g., "1kg")
 */
export function formatVariationDisplayName(displayName: string): string {
  if (!displayName) return displayName;
  
  // Handle cases where there's no space between quantity and unit (e.g., "500.00g")
  const match = displayName.trim().match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
  if (match) {
    const [, quantityStr, unit] = match;
    const quantity = parseFloat(quantityStr);
    if (isNaN(quantity)) return displayName;
    
    // Format the quantity without unnecessary decimal places
    const formattedQuantity = quantity % 1 === 0 ? Math.floor(quantity).toString() : quantity.toString();
    
    // Convert 'l' to 'L' for liters
    const formattedUnit = unit.toLowerCase() === 'l' ? 'L' : unit;
    
    return `${formattedQuantity}${formattedUnit}`;
  }
  
  // Fallback for other formats
  return displayName;
}
