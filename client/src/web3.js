const FoodOrderABI = require('./contracts/FoodOrder.json');

async function init() {
  // Prompt user to connect to MetaMask
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log(`Connected to MetaMask with address: ${account}`);

  // Get the network ID
  const networkId = await ethereum.request({ method: 'net_version' });
  console.log(`Connected to network with ID: ${networkId}`);

  // Create a new contract instance using the ABI and address
  const foodOrderContract = new ethereum.request({
    method: 'eth.Contract',
    args: [FoodOrderABI, '0x820fbF268973da9F7DaE5Dca2F7139C51C0D9eBd'],
  });

  // Place an order
  async function placeOrder(foodType, quantity, price) {
    // Call the placeOrder function on the contract
    return foodOrderContract.methods.placeOrder(foodType, quantity).send({
      from: account,
      value: price,
      gas: 3000000,
    });
  }

  // Confirm an order
  async function confirmOrder(orderId) {
    // Call the confirmOrder function on the contract
    return foodOrderContract.methods.confirmOrder(orderId).send({
      from: account,
      gas: 3000000,
    });
  }

  // Cancel an order
  async function cancelOrder(orderId) {
    // Call the cancelOrder function on the contract
    return foodOrderContract.methods.cancelOrder(orderId).send({
      from: account,
      gas: 3000000,
    });
  }

  // Complete an order
  async function completeOrder(orderId) {
    // Call the completeOrder function on the contract
    return foodOrderContract.methods.completeOrder(orderId).send({
      from: account,
      gas: 3000000,
    });
  }

  // Get the contract events
  async function getEvents() {
    const events = await foodOrderContract.getPastEvents('allEvents', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    return events;
  }

  return {
    placeOrder,
    confirmOrder,
    cancelOrder,
    completeOrder,
    getEvents,
  };
}

module.exports = {
  init,
};
