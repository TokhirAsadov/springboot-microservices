package uz.tokhir.productservice.payload;

import java.math.BigDecimal;

public record ProductResponse(String id, String name,String skuCode, String description, BigDecimal price) {
}
