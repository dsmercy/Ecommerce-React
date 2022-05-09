import React from 'react'
import { Product } from '../../models/product'

interface Props {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products, addProduct }: Props) {
  return (
    <div>
      <ul>
        {products.map(product => <li key={product.name}>{product.name} - {product.description}</li>)}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}
