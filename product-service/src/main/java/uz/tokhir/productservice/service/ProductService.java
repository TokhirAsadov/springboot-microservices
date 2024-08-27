package uz.tokhir.productservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import uz.tokhir.productservice.module.Product;
import uz.tokhir.productservice.payload.ProductRequest;
import uz.tokhir.productservice.payload.ProductResponse;
import uz.tokhir.productservice.reposiroty.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;

    public ProductResponse createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.name())
                .skuCode(productRequest.skuCode())
                .description(productRequest.description())
                .price(productRequest.price())
                .build();
        Product save = productRepository.save(product);
        log.info("Product created successfully");
        return new ProductResponse(save.getId(), save.getName(), save.getSkuCode(), save.getDescription(), save.getPrice());
    }

    public List<ProductResponse> getAllProducts() {
//        try {
//            Thread.sleep(5000);
//        }catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
        return productRepository.findAll().stream().map(product -> new ProductResponse(product.getId(), product.getName(),product.getSkuCode(), product.getDescription(), product.getPrice())).toList();
    }
}
