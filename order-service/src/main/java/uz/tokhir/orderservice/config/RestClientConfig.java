package uz.tokhir.orderservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import uz.tokhir.orderservice.client.InventoryClient;

@Configuration
public class RestClientConfig {

    @Value("${inventory.url}")
    private String inventoryServiceUrl;

    public InventoryClient inventoryClient(){
        RestClient restClient = RestClient.builder()
                .baseUrl(inventoryServiceUrl)
                .build();
        var restClientAdapter = RestClientAdapter.create(restClient);
        var httpServiceProxyFactory = HttpServiceProxyFactory.builderFor(restClientAdapter).build();
        return httpServiceProxyFactory.createClient(InventoryClient.class);
    }

//    RestClient defaultClient = RestClient.create();
//
//    RestClient customClient = RestClient.builder()
//            .requestFactory(new HttpComponentsClientHttpRequestFactory())
//            .messageConverters(converters -> converters.add(new MyCustomMessageConverter()))
//            .baseUrl("https://example.com")
//            .defaultUriVariables(Map.of("variable", "foo"))
//            .defaultHeader("My-Header", "Foo")
//            .requestInterceptor(myCustomInterceptor)
//            .requestInitializer(myCustomInitializer)
//            .build();

}
