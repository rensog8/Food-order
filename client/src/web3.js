const Web3 = require('web3');
const FoodOrderABI = require('./contracts/FoodOrder.json');

// Connect to local blockchain node
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));


// Instantiate the contract object with its ABI and address
const foodOrderContract = new web3.eth.Contract(FoodOrderABI, '0xFBEC8ECC06Bb6032991358837F80C87060e6');

// Place an order
async function placeOrder(foodType, quantity, price) {
  // Get the customer account from web3
  const accounts = await web3.eth.getAccounts();
  const customer = accounts[0];

  // Call the placeOrder function on the contract
  return foodOrderContract.methods.placeOrder(foodType, quantity).send({
    from: customer,
    value: price,
    gas: 3000000,
  });
}

// Confirm an order
async function confirmOrder(orderId) {
  // Get the customer account from web3
  const accounts = await web3.eth.getAccounts();
  const customer = accounts[0];

  // Call the confirmOrder function on the contract
  return foodOrderContract.methods.confirmOrder(orderId).send({
    from: customer,
    gas: 3000000,
  });
}

// Cancel an order
async function cancelOrder(orderId) {
  // Get the customer account from web3
  const accounts = await web3.eth.getAccounts();
  const customer = accounts[0];

  // Call the cancelOrder function on the contract
  return foodOrderContract.methods.cancelOrder(orderId).send({
    from: customer,
    gas: 3000000,
  });
}

// Complete an order
async function completeOrder(orderId) {
  // Get the customer account from web3
  const accounts = await web3.eth.getAccounts();
  const customer = accounts[0];

  // Call the completeOrder function on the contract
  return foodOrderContract.methods.completeOrder(orderId).send({
    from: customer,
    gas: 3000000,
  });
}
