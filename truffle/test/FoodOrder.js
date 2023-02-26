const FoodOrder = artifacts.require('FoodOrder');

contract('FoodOrder', function(accounts) {
  const customer = accounts[0];
  const restaurant = accounts[1];
  const foodType = 'Pizza';
  const quantity = 2;
  const price = web3.utils.toWei('0.05', 'ether');

  let foodOrderInstance;

  beforeEach(async function() {
    foodOrderInstance = await FoodOrder.new(restaurant);
  });

  it('should allow a customer to place an order', async function() {
    const orderId = await foodOrderInstance.placeOrder(foodType, quantity, { from: customer, value: price });
    assert.strictEqual(orderId.toNumber(), 1, 'incorrect order ID');
  });

  it('should allow the restaurant to confirm an order', async function() {
    await foodOrderInstance.placeOrder(foodType, quantity, { from: customer, value: price });
    const orderId = 1;
    const result = await foodOrderInstance.confirmOrder(orderId, { from: restaurant });
    assert.strictEqual(result.logs[0].event, 'OrderConfirmed', 'OrderConfirmed event not emitted');
  });

  it('should allow the customer to cancel an order', async function() {
    await foodOrderInstance.placeOrder(foodType, quantity, { from: customer, value: price });
    const orderId = 1;
    const result = await foodOrderInstance.cancelOrder(orderId, { from: customer });
    assert.strictEqual(result.logs[0].event, 'OrderCancelled', 'OrderCancelled event not emitted');
  });

  it('should allow the restaurant to complete an order', async function() {
    await foodOrderInstance.placeOrder(foodType, quantity, { from: customer, value: price });
    await foodOrderInstance.confirmOrder(1, { from: restaurant });
    const orderId = 1;
    const result = await foodOrderInstance.completeOrder(orderId, { from: restaurant });
    assert.strictEqual(result.logs[0].event, 'OrderCompleted', 'OrderCompleted event not emitted');
  });
});
