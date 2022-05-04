import React, { useEffect, useState } from 'react';
import './styles.css';
import { Product } from '../models/product';


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
      <h2>Products List</h2>
      <ul>
        {products.map(item => <li key={item.name}>{item.name} - {item.description}</li>)}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
