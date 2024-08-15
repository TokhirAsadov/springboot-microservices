package uz.tokhir.orderservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uz.tokhir.orderservice.module.Order;
import uz.tokhir.orderservice.payload.OrderRequest;
import uz.tokhir.orderservice.repository.OrderRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public void placeOrder(OrderRequest orderRequest){
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());
        order.setPrice(orderRequest.price());
        order.setSkuCode(orderRequest.skuCode());
        order.setQuantity(orderRequest.quantity());
        orderRepository.save(order);
    }
}
