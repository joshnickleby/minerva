package tutorials.stallnick.spring.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/stuff")
class TestClass {

  @GetMapping("/stuff")
  fun stuff(): String = "test"
}