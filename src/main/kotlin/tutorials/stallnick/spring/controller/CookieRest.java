package tutorials.stallnick.spring.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import tutorials.stallnick.spring.common.CustomCookie;

import java.util.List;
import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api/cookies")
public class CookieRest {

  // branchless function calling
  private final Map<CookieForm, Supplier<List<CustomCookie>>> cookieFormFunctions = Map.of(
      CookieForm.SIMPLE_DATA, () -> {
        CustomCookie cookie = new CustomCookie("simple-cookie", "This-represents-the-value")
            .expires(1000L)
            .path("/api/cookies");

        return List.of(cookie);
      },
      CookieForm.COMPLEX_DATA, () -> IntStream
          .of(1, 2)
          .boxed()
          .map(i ->
              new CustomCookie("complex-cookie-" + i, "content-" + i)
                  .expires(1000L)
                  .path("/api/cookies?form=COMPLEX_DATA")
          )
          .collect(Collectors.toList())
  );

//  @PostMapping(params = {"expiration"})
//  public ResponseEntity<Object> addCustomCookie(@RequestBody CookieParam cookieParam,
//                                                @RequestHeader HttpHeaders headers,
//                                                @RequestParam Boolean expiration,
//                                                @CookieValue("Simple-Cookie") String existingCookie) {
//
//    System.out.println("Cookie: " + existingCookie);
//
//    if (existingCookie.equals(simpleCookieValue)) {
//      ResponseEntity.BodyBuilder response = ResponseEntity.ok();
//
//      HttpCookie cookie = ResponseCookie
//          .from(cookieParam.key, cookieParam.value)
//          .sameSite("Lax")
//          .path("/api/cookies")
//          .maxAge(10000L)
//          .build();
//
//      if (expiration) {
//        response.header(HttpHeaders.SET_COOKIE, createSimpleCookie.get().toString());
//      }
//
//      return response
//          .header(HttpHeaders.SET_COOKIE, cookie.toString())
//          .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//          .body(cookie);
//    } else {
//      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//    }
//  }

  @CrossOrigin
  @GetMapping(params = {"form"})
  public ResponseEntity<Object> getCookieByForm(@RequestHeader HttpHeaders headers,
                                                @RequestParam CookieForm form) {
    System.out.println(headers.toString());

    List<CustomCookie> cookies = cookieFormFunctions
        .get(form)
        .get();

    return createResponseWithCookies(cookies, cookies);
  }

  private ResponseEntity<Object> createResponseWithCookies(Object content, List<CustomCookie> cookies) {
    String cookiesString = cookies
        .stream()
        .map(CustomCookie::toJsonString)
        .collect(Collectors.joining(", "));

    return ResponseEntity
        .ok()
        .header("custom-cookies", "[" + cookiesString + "]")
        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
        .body(content);
  }

  private enum CookieForm {
    SIMPLE_DATA,
    COMPLEX_DATA
  }

  private static class CookieParam {
    public String key;
    public String value;

    public CookieParam() {
    }

    public CookieParam(String key, String value) {
      this.key = key;
      this.value = value;
    }
  }
}
