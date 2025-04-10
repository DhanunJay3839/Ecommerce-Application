package com.excelr.service;

import java.util.List;

import com.excelr.model.CartItem;
import com.excelr.model.Ecommerce;
import com.excelr.model.Orders;
import com.excelr.model.Products;

import jakarta.persistence.criteria.Order;

public interface UsersService {
	
	public Ecommerce saveUser(Ecommerce ecommerce);
	public Ecommerce loginUser(Ecommerce ecommerce);
	
	public Products saveProduct(Products products);
	
	public List<Products> getAllProducts();
	
	List<CartItem> getAllCartItems();
    CartItem addToCart(CartItem cartItem);
    void removeCartItem(Long id);
    
    Orders saveOrder(Orders order);
    List<Orders> getAllOrders();
    void deleteOrder(Long id);
}
