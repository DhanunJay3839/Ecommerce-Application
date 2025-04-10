package com.excelr.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.model.Orders;

@Repository
public interface OrdersRepo extends JpaRepository<Orders, Long> {
}