package uz.tokhir.orderservice.client;

//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;

//@FeignClient(value = "inventory",url = "${inventory.url}")
public interface InventoryClient {

//    @RequestMapping(method = RequestMethod.GET,value = "/api/inventory")
    @GetExchange("/api/inventory")
    Boolean isInStock(@RequestParam String skuCode, @RequestParam Integer quantity);
}
