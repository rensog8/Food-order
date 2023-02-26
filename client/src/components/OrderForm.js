import React, { useState } from 'react';
import {FoodType}  from './Constants.js';

const OrderForm = ({ contract, account }) => {
  const [foodType, setFoodType] = useState(FoodType.Pizza);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    setPrice(event.target.value * 0.01);
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    const weiPrice = window.web3.utils.toWei(price.toString(), 'ether');
    await contract.methods.placeOrder(foodType, quantity).send({ from: account, value: weiPrice });
    window.location.reload();
  };

  return (
    <form onSubmit={handleOrderSubmit}>
      <div className="form-group">
        <label htmlFor="foodTypeSelect">Food Type:</label>
        <select className="form-control" id="foodTypeSelect" value={foodType} onChange={handleFoodTypeChange}>
          <option value={FoodType.Pizza}>Pizza</option>
          <option value={FoodType.Burger}>Burger</option>
          <option value={FoodType.Salad}>Salad</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quantityInput">Quantity:</label>
        <input type="number" className="form-control" id="quantityInput" min="1" max="10" value={quantity} onChange={handleQuantityChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="priceInput">Price (in Ether):</label>
        <input type="number" className="form-control" id="priceInput" min="0" step="0.01" value={price} readOnly />
      </div>
      <button type="submit" className="btn btn-primary">Place Order</button>
    </form>
  );
};

export default OrderForm;
