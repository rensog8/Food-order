import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import FoodOrder from './contracts/FoodOrder.json';
import OrderForm from './components/OrderForm';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function connectToWeb3() {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3);
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = FoodOrder.networks[networkId];
          const contract = new web3.eth.Contract(FoodOrder.abi, deployedNetwork && deployedNetwork.address);
          setContract(contract);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Web3 not found');
      }
    }
    connectToWeb3();
  }, []);

  return (
    <div className="container">
      <h1>Food Ordering DApp</h1>
      <hr />
      {web3 && accounts.length > 0 && contract ? (
        <OrderForm web3={web3} accounts={accounts} contract={contract} />
      ) : (
        <p>Please connect to Web3</p>
      )}
    </div>
  );
}

export default App;
