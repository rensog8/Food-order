import React, { useState } from "react";
import Web3 from "web3";
import foodOrderABI from '../../contracts/FoodOrder.json';

import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [orderStatus, setOrderStatus] = useState("No order placed yet.");

  async function handlePlaceOrder(event) {
    event.preventDefault();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const contractAddress = "0x123...";
    const foodOrderContract = new web3.eth.Contract(foodOrderABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    await foodOrderContract.methods.placeOrder(item, quantity, price).send({ from: account });
    setItem("");
    setQuantity("");
    setPrice("");
    updateOrderStatus(foodOrderContract);
  }

  async function handleCancelOrder(event) {
    event.preventDefault();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contractAddress = "0x123...";
    const foodOrderContract = new web3.eth.Contract(foodOrderABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    await foodOrderContract.methods.cancelOrder().send({ from: account });
    updateOrderStatus(foodOrderContract);
  }

  async function updateOrderStatus(foodOrderContract) {
    const orderId = await foodOrderContract.methods.orderId().call();
    if (orderId == 0) {
      setOrderStatus("No order placed yet.");
      return;
    }
    const order = await foodOrderContract.methods.orders(orderId).call();
    const status = order.status == 1 ? "Confirmed" : (order.status == 2 ? "Cancelled" : (order.status == 3 ? "Completed" : "Pending"));
    setOrderStatus(`Item: ${order.item}\nQuantity: ${order.quantity}\nPrice (in ETH): ${order.price}\nStatus: ${status}`);
  }

  return (
    <div className="container mt-4">
      <h1>Food Order DApp</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handlePlaceOrder}>
            <h3>Place an Order</h3>
            <div className="form-group">
              <label htmlFor="item">Item:</label>
              <input type="text" className="form-control" id="item" name="item" value={item} onChange={event => setItem(event.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" className="form-control" id="quantity" name="quantity" value={quantity} onChange={event => setQuantity(event.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (in ETH):</label>
              <input type="number" step="0.001" className="form-control" id="price" name="price" value={price} onChange={event => setPrice(event.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Place Order</button>
            </form>
            </div>
            </div>
            </div>
  )
}
            