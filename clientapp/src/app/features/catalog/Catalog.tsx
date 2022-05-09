import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react'
import { Product } from '../../models/product'
import ProductList from './ProductList';

interface Props {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products, addProduct }: Props) {
  return (
    <>
      <ProductList products={products}/>
      <Button variant='contained' onClick={addProduct}>Add Product</Button>
    </>
  )
}
