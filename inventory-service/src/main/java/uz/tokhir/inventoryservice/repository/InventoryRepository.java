package uz.tokhir.inventoryservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.tokhir.inventoryservice.module.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    Boolean existsBySkuCodeAndQuantityIsGreaterThanEqual(String skuCode, Integer quantity);
}
