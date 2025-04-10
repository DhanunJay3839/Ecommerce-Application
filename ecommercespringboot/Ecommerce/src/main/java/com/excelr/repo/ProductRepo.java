package com.excelr.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.excelr.model.Products;

@Repository
public interface ProductRepo extends CrudRepository<Products, Integer> {

}
