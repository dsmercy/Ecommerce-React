import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import LoadingComponent from '../../layout/LoadingComponent';
import { Product } from '../../models/product';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { addBasketItemAsync, setBasket } from '../basket/basketSlice';

export default function ProductDetails() {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [productStatus, setProductStatus] = useState({
        loading: false,
        name: ''
    });
    const {status}= useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setProductStatus({ loading: true, name: '' });
        agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setProductStatus({ loading: false, name: '' }))
    }, [id]);


    function handleAddItem(productId: number, name: string) {
        dispatch(addBasketItemAsync({productId:productId}))
    }

    if (productStatus.loading && productStatus.name === '') return <h3>Loading...</h3>

    if (!product) return <LoadingComponent message='Loading product...' />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <LoadingButton
                            loading={status.includes('pendingRemoveItem'+product.id)}
                            onClick={() => handleAddItem(product.id, 'add')}
                            sx={{ height: '55px',top:'10px' }}
                            color='primary'
                            size='large'
                            variant='contained'
                        >
                            Add to cart
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
