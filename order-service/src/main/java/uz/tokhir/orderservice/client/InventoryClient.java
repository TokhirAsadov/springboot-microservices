package uz.tokhir.orderservice.client;

//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import groovy.util.logging.Slf4j;
import org.slf4j.Logger;


//@FeignClient(value = "inventory",url = "${inventory.url}")
@Slf4j
public interface InventoryClient {

    Logger log = LoggerFactory.getLogger(InventoryClient.class);

//    @RequestMapping(method = RequestMethod.GET,value = "/api/inventory")
    @GetExchange("/api/inventory")
    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod")
    @Retry(name = "inventory")
    Boolean isInStock(@RequestParam String skuCode, @RequestParam Integer quantity);

    default Boolean fallbackMethod(String code, Integer quantity, Throwable ex) {
        log.info("Cannot get inventory for skucode {}, failure reason: {}",code,ex.getMessage());
        return false;
    }
}
