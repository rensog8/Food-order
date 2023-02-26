// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodOrder {
    
    enum FoodType {Pizza, Burger, Salad}
    enum OrderStatus {Pending, Confirmed, Completed, Cancelled}
    
    struct Order {
        uint id;
        address customer;
        FoodType foodType;
        uint quantity;
        uint price;
        OrderStatus status;
    }
    
    mapping(uint => Order) public orders;
    uint public orderId = 0;
    
    event OrderPlaced(uint orderId, address customer, FoodType foodType, uint quantity, uint price);
    event OrderConfirmed(uint orderId);
    event OrderCancelled(uint orderId);
    event OrderCompleted(uint orderId);
    
    function placeOrder(FoodType _foodType, uint _quantity) public payable {
        require(msg.value > 0, "Payment required to place order");
        
        orderId++;
        Order storage order = orders[orderId];
        order.id = orderId;
        order.customer = msg.sender;
        order.foodType = _foodType;
        order.quantity = _quantity;
        order.price = msg.value;
        order.status = OrderStatus.Pending;
        
        emit OrderPlaced(orderId, msg.sender, _foodType, _quantity, msg.value);
    }
    
    function confirmOrder(uint _orderId) public {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.Pending, "Order status is not pending");
        require(msg.sender == order.customer, "Only customer can confirm the order");
        
        order.status = OrderStatus.Confirmed;
        
        emit OrderConfirmed(_orderId);
    }
    
    function cancelOrder(uint _orderId) public {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.Pending || order.status == OrderStatus.Confirmed, "Order cannot be cancelled");
        require(msg.sender == order.customer, "Only customer can cancel the order");
        
        if (order.status == OrderStatus.Confirmed) {
            payable(msg.sender).transfer(order.price);
        }
        
        order.status = OrderStatus.Cancelled;
        
        emit OrderCancelled(_orderId);
    }
    
    function completeOrder(uint _orderId) public {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.Confirmed, "Order status is not confirmed");
        require(msg.sender == order.customer, "Only customer can complete the order");
        
        payable(msg.sender).transfer(order.price);
        
        order.status = OrderStatus.Completed;
        
        emit OrderCompleted(_orderId);
    }
}
