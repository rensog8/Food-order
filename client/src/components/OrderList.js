import React, { useState, useEffect } from "react";
import foodOrderContract from "../contracts/FoodOrder.json";
import getWeb3 from "./getweb3";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  
  useEffect(() => {
    const init = async () => {
      const _web3 = await getWeb3();
      const _accounts = await _web3.eth.getAccounts();
      const networkId = await _web3.eth.net.getId();
      const deployedNetwork = foodOrderContract.networks[networkId];
      const _contract = new _web3.eth.Contract(
        foodOrderContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setWeb3(_web3);
      setAccounts(_accounts);
      setContract(_contract);
      await fetchOrders(_contract);
    };
    init();
  }, []);

  const fetchOrders = async (_contract) => {
    const totalOrders = await _contract.methods.orderId().call();
    const _orders = [];
    for (let i = 1; i <= totalOrders; i++) {
      const order = await _contract.methods.orders(i).call();
      _orders.push(order);
    }
    setOrders(_orders);
  };

  return (
    <div>
      <h3>Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Food Type</th>
            <th>Quantity</th>
            <th>Price (wei)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.foodType}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
