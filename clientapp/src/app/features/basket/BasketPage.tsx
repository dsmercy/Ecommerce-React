import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import agent from '../../api/agent';
import LoadingComponent from '../../layout/LoadingComponent';
import { Basket } from '../../models/basket';

export default function BasketPage() {

    const [loading, setLoading] = useState(false);
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        agent.Basket.get()
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    },[])

    if (loading) return <LoadingComponent message='Loading products...' />
    if (!basket) return <Typography variant='h3'>Your Basket is empty</Typography>

    return (
        <>
            <h1>Buyer Id = {basket?.buyerId}</h1>
        </>
    )
}
