package uz.tokhir.orderservice.event;

import lombok.Data;

@Data
public class OrderPlacedEvent {
    private String orderNumber;
    private String email;
}
