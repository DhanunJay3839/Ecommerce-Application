package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.model.CartItem;


@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
	
	
}
