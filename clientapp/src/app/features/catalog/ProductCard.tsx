import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import React from 'react'
import { Product } from '../../models/product';

interface Props {
    product: Product;
  }

export default function ProductCard({ product}: Props) {
  return (
    <div>
        <ListItem key={product.id}>
            <ListItemAvatar>
              <Avatar src={product.pictureUrl} />
            </ListItemAvatar>
            <ListItemText>{product.name} - {product.price}</ListItemText>
          </ListItem>
    </div>
  )
}
