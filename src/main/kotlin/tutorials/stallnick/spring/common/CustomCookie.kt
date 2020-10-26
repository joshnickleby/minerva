package tutorials.stallnick.spring.common

import com.fasterxml.jackson.databind.ObjectMapper

class CustomCookie(
    var name: String,
    var value: String
) {
  val options: Options = Options()

  fun secure(secure: Boolean):          CustomCookie = apply { this.options.secure = secure     }
  fun expires(expires: Long):           CustomCookie = apply { this.options.expires = expires   }
  fun domain(domain: String):           CustomCookie = apply { this.options.domain = domain     }
  fun path(path: String):               CustomCookie = apply { this.options.path = path         }
  fun sameSite(sameSite: SameSiteRule): CustomCookie = apply { this.options.sameSite = sameSite }

//  fun toJsonString() = "{\"name: $name, value: $value, expires: $expires, path: $path, domain: $domain, secure: $secure, sameSite: $sameSite}"
  fun toJsonString(): String = ObjectMapper().writeValueAsString(this)

  class Options(
      var expires: Long? = null,
      var path: String = "/",
      var domain: String = "/",
      var secure: Boolean = false,
      var sameSite: SameSiteRule = SameSiteRule.Lax)
}

enum class SameSiteRule {
  None, Lax, Strict
}