package tutorials.stallnick.spring.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cookies")
public class CookieRest {

  private final String simpleCookieValue = "This-represents-the-value";

  @PostMapping(params = {"expiration"})
  public ResponseEntity<Object> addCustomCookie(@RequestBody CookieParam cookieParam,
                                                @RequestParam Boolean expiration,
                                                @CookieValue("simple-cookie") String existingCookie) {

    System.out.println("Cookie: " + existingCookie);

    if (existingCookie.equals(simpleCookieValue)) {
      ResponseEntity.BodyBuilder response = ResponseEntity.ok();

      HttpCookie cookie = ResponseCookie
          .from(cookieParam.key, cookieParam.value)
          .sameSite("None")
          .path("/api/cookies")
          .domain("")
          .maxAge(10000L)
          .build();

      if (expiration) {
        response.header(HttpHeaders.SET_COOKIE, createSimpleCookie().toString());
      }

      return response
          .header(HttpHeaders.SET_COOKIE, cookie.toString())
          .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
          .body(cookie);
    } else {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }

  @GetMapping(params = {"form"})
  public ResponseEntity<Object> getCookieByForm() {
    HttpCookie cookie = createSimpleCookie();

    return ResponseEntity
        .ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
        .body(cookie);
  }

  private HttpCookie createSimpleCookie() {
    return ResponseCookie
        .from("simple-cookie", simpleCookieValue)
        .sameSite("None")
        .httpOnly(true)
        .path("/api/cookies")
        .domain("")
        .maxAge(10000L)
        .build();
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
