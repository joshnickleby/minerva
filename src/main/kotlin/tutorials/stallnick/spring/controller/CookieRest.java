package tutorials.stallnick.spring.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import tutorials.stallnick.spring.common.CustomCookie;

import java.util.List;
import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cookies")
public class CookieRest {

  private final String simpleCookieValue = "This-represents-the-value";

  private final Supplier<HttpCookie> createSimpleCookie = () ->
      ResponseCookie
          .from("Simple-Cookie", simpleCookieValue)
          .sameSite("Lax")
          .secure(false)
          .httpOnly(true)
          .path("/api/cookies")
          .maxAge(10000L)
          .build();

  // branchless function calling
  private final Map<CookieForm, Supplier<HttpCookie>> cookieFormFunctions = Map.of(
      CookieForm.SIMPLE_DATA, createSimpleCookie
  );

  @PostMapping(params = {"expiration"})
  public ResponseEntity<Object> addCustomCookie(@RequestBody CookieParam cookieParam,
                                                @RequestHeader HttpHeaders headers,
                                                @RequestParam Boolean expiration,
                                                @CookieValue("Simple-Cookie") String existingCookie) {

    System.out.println("Cookie: " + existingCookie);

    if (existingCookie.equals(simpleCookieValue)) {
      ResponseEntity.BodyBuilder response = ResponseEntity.ok();

      HttpCookie cookie = ResponseCookie
          .from(cookieParam.key, cookieParam.value)
          .sameSite("Lax")
          .path("/api/cookies")
          .maxAge(10000L)
          .build();

      if (expiration) {
        response.header(HttpHeaders.SET_COOKIE, createSimpleCookie.get().toString());
      }

      return response
          .header(HttpHeaders.SET_COOKIE, cookie.toString())
          .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
          .body(cookie);
    } else {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }

  @CrossOrigin
  @GetMapping(params = {"form"})
  public ResponseEntity<Object> getCookieByForm(@RequestHeader HttpHeaders headers,
                                                @RequestParam CookieForm form) {
    System.out.println(headers.toString());

    CustomCookie cookie = new CustomCookie("simple-cookie", simpleCookieValue)
        .expires(1000L)
        .path("/api/cookies");

    return createResponseWithCookies(cookie, List.of(cookie));
  }

  private ResponseEntity<Object> createResponseWithCookies(Object content, List<CustomCookie> cookies) {
    String cookiesString = cookies
        .stream()
        .map(CustomCookie::toJsonString)
        .collect(Collectors.joining(", "));

    return ResponseEntity
        .ok()
        .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:4200")
        .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
        .header(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "POST, GET, OPTIONS, DELETE, PUT")
        .header(HttpHeaders.ACCESS_CONTROL_MAX_AGE, "3600")
        .header(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Content-Type, Range")
        .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Accept-Ranges, Content-Encoding, Content-Length, Content-Range, Set-Cookie")
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
