package com.excelr.controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.model.CartItem;
import com.excelr.model.Ecommerce;
import com.excelr.model.Orders;
import com.excelr.model.Products;
import com.excelr.repo.OrdersRepo;
import com.excelr.repo.UserRepo;
import com.excelr.service.UserServiceImp;
import com.excelr.service.UsersService;

@RestController
@CrossOrigin(origins= {"*"})
public class MyController {
	
	@Autowired private UserServiceImp service;
	@Autowired
    private UsersService cartService;
	@Autowired
	private UsersService orderService;
	
	@Autowired
    private OrdersRepo ordersRepo;
	@Autowired
	private UserRepo usersRepo;
	
	@PostMapping("/saveuser")
	public String saveUserData(@RequestBody Ecommerce ecommerce)
	{
		Ecommerce saveData = service.saveUser(ecommerce);
		
		String message=null;
		if(saveData!=null)
		{
			message="Registered Successfully";
		}
		else
		{
			message="failed to save";
		}
		
		return message;
		
	}
	
	@PostMapping("/loginuser")
	public String loginUserData(@RequestBody Ecommerce ecommerce)
	{
		Ecommerce user = service.loginUser(ecommerce);
		
		if (user != null) {
	        return "Login Successful";
	    } else {
	        return "Invalid Credentials";
	    }
		
	}
	
	@GetMapping("/allusers")
	public ResponseEntity<List<Ecommerce>> getAllUsers() {
	    return ResponseEntity.ok((List<Ecommerce>) usersRepo.findAll());
	}


	@DeleteMapping("/deleteuser/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
	    usersRepo.deleteById(id);
	    return ResponseEntity.ok("User deleted successfully");
	}
	@PostMapping("/saveproduct")
	public String saveProductt(@RequestBody Products products)
	{
        Products saveData = service.saveProduct(products);
		
		String message=null;
		if(saveData!=null)
		{
			message="Product saved Successfully";
		}
		else
		{
			message="failed to save";
		}
		
		return message;
		
	}
	@GetMapping("/getallp")
	public List<Products> getAlll()
	{
		return service.getAllProducts();
	}
	
	
	

    @GetMapping("/items")
    public List<CartItem> getCartItems() {
        return cartService.getAllCartItems();
    }

    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartItem cartItem) {
        return cartService.addToCart(cartItem);
    }

    @DeleteMapping("/remove/{id}")
    public String removeCartItem(@PathVariable Long id) {
        cartService.removeCartItem(id);
        return "Item removed successfully";
    }
    
    
    @PostMapping("/saveorder")
    public ResponseEntity<Orders> saveOrder(@RequestBody Orders order) {
        Orders savedOrder = ordersRepo.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/allorders")
    public ResponseEntity<List<Orders>> getAllOrders() {
        return ResponseEntity.ok(ordersRepo.findAll());
    }

    @DeleteMapping("/deleteorder/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        ordersRepo.deleteById(id);
        return ResponseEntity.ok("Order deleted successfully");
    }

    
    
    
}
