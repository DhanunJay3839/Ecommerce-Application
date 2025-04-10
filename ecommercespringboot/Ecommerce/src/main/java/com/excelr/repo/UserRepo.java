package com.excelr.repo;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.excelr.model.Ecommerce;

@Repository
public interface UserRepo extends CrudRepository<Ecommerce, Integer> {
	Optional<Ecommerce> findByUemail(String uemail);

}
