import { useState, useEffect } from 'react';
import agent from '../../api/agent';
import { Product } from '../../models/product'
import ProductList from './ProductList';

export default function Catalog() {

  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    agent.Catalog.list().then(products => setProducts(products));
  }, [])


  return (
    <>
      <ProductList products={products} />
    </>
  )
}
