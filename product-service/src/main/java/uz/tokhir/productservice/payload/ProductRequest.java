package uz.tokhir.productservice.payload;

import java.math.BigDecimal;

public record ProductRequest(String id, String name,String skuCode, String description, BigDecimal price) {
}
