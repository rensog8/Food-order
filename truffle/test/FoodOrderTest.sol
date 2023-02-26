// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/FoodOrder.sol";

contract FoodOrderTest {
    FoodOrder foodOrder = FoodOrder(DeployedAddresses.FoodOrder());

    // Test the placeOrder function
    function testPlaceOrder() public {
        uint expectedOrderId = 1;
        uint expectedOrderCount = 1;
        uint expectedBalance = 10 wei;
        uint foodType = 1;
        uint quantity = 1;

        uint orderId = foodOrder.placeOrder(foodType, quantity);
        uint orderCount = foodOrder.getOrderCount();
        uint balance = address(foodOrder).balance;

        Assert.equal(orderId, expectedOrderId, "Place order failed");
        Assert.equal(orderCount, expectedOrderCount, "Order count not incremented");
        Assert.equal(balance, expectedBalance, "Balance not updated");
    }

    // Test the confirmOrder function
    function testConfirmOrder() public {
        uint orderId = 1;
        bool result = foodOrder.confirmOrder(orderId);
        bool expected = true;

        Assert.equal(result, expected, "Confirm order failed");
    }

    // Test the cancelOrder function
    function testCancelOrder() public {
        uint orderId = 1;
        bool result = foodOrder.cancelOrder(orderId);
        bool expected = true;

        Assert.equal(result, expected, "Cancel order failed");
    }

    // Test the completeOrder function
    function testCompleteOrder() public {
        uint orderId = 1;
        bool result = foodOrder.completeOrder(orderId);
        bool expected = true;

        Assert.equal(result, expected, "Complete order failed");
    }
}
