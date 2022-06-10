import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import LoadingComponent from '../../layout/LoadingComponent';
import { Product } from '../../models/product';
import { useAppDispatch } from '../../store/configureStore';
import { setBasket } from '../basket/basketSlice';

export default function ProductDetails() {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        setStatus({ loading: true, name: '' });
        agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }, [id]);


    function handleAddItem(productId: number, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId)
            .then(basket =>dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

    if (status.loading && status.name === '') return <h3>Loading...</h3>

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
                            loading={status.loading && status.name === 'add'}
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
