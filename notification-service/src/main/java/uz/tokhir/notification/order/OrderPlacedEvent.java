package uz.tokhir.notification.order;

import lombok.Data;

@Data
public class OrderPlacedEvent {
    private String orderNumber;
    private String email;
}
