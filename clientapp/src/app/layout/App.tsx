import React, { useEffect, useState } from 'react';
import './styles.css';
import { Product } from '../models/product';
import Catalog from '../features/catalog/Catalog';
import { CssBaseline, Container, createTheme } from '@mui/material';
import Header from './Header';


function App() {

  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then(result => result.json())
      .then(data => setProducts(data))
  }, [])


  function addProduct() {
    setProducts(prevState => [...prevState, { id: prevState.length + 1, name: "product " + 
    (prevState.length + 1), price: prevState.length + 100.00, description: "description description description" }]);
  }

  const [products, setProducts] = useState<Product[]>([]);


  return (
    <div>
       <CssBaseline />
      <Header/>
      <Container>
        <Catalog products={products} addProduct={addProduct}/>
      </Container>
    </div>
  );
}

export default App;
