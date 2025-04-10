package com.excelr.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.CartItem;
import com.excelr.model.Ecommerce;
import com.excelr.model.Orders;
import com.excelr.model.Products;
import com.excelr.repo.CartRepository;
import com.excelr.repo.OrdersRepo;
import com.excelr.repo.ProductRepo;
import com.excelr.repo.UserRepo;

@Service
public class UserServiceImp implements UsersService{
	@Autowired private UserRepo repo;
	@Autowired private ProductRepo prepo;
	@Autowired
    private CartRepository cartRepository;
	private OrdersRepo orderRepository;


	
	public Ecommerce saveUser(Ecommerce ecommerce) {
		return repo.save(ecommerce);
	}

	
	public Ecommerce loginUser(Ecommerce ecommerce) {
		String lemail =ecommerce.getUemail();
		String lpass = ecommerce.getUpass();
		Ecommerce eobj = repo.findByUemail(lemail).get();
		String uemail = eobj.getUemail();
		String upass = eobj.getUpass();
		
		if(uemail.equals(lemail) && lpass.equals(upass))
		{
			return eobj;
		}
		return null;
	}


	
	public Products saveProduct(Products products) {
		
		return prepo.save(products);
	}


	@Override
	public List<Products> getAllProducts() {
		List<Products> getAll = (List<Products>)prepo.findAll();
		return getAll;
	}
	
	
    public List<CartItem> getAllCartItems() {
        return cartRepository.findAll();
    }

    public CartItem addToCart(CartItem cartItem) {
        return cartRepository.save(cartItem);
    }

    public void removeCartItem(Long id) {
        cartRepository.deleteById(id);
    }
    
    
    @Override
    public Orders saveOrder(Orders order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
    
    
}
