import { useState, useEffect } from 'react';
import { Product } from '../../models/product'
import ProductList from './ProductList';

export default function Catalog() {

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then(result => result.json())
      .then(data => setProducts(data))
  }, [])


  return (
    <>
      <ProductList products={products}/>
    </>
  )
}
