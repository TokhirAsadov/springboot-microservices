package uz.tokhir.productservice.reposiroty;

import org.springframework.data.mongodb.repository.MongoRepository;
import uz.tokhir.productservice.module.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
}
