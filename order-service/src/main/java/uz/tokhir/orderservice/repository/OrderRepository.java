package uz.tokhir.orderservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.tokhir.orderservice.module.Order;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
