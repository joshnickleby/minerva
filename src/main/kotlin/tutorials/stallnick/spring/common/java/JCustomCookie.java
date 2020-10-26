package tutorials.stallnick.spring.common.java;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JCustomCookie {
  String name;
  String value;
  Options options = new Options();

  public JCustomCookie secure(Boolean secure)          { this.options.secure = secure; return this;     }
  public JCustomCookie expires(Long expires)           { this.options.expires = expires; return this;   }
  public JCustomCookie domain(String domain)           { this.options.domain = domain; return this;     }
  public JCustomCookie path(String path)               { this.options.path = path; return this;         }
  public JCustomCookie sameSite(SameSiteRule sameSite) { this.options.sameSite = sameSite; return this; }

  public String toJsonString() {
    try {
      return new ObjectMapper().writeValueAsString(this);
    } catch (JsonProcessingException jsonProcessingEx) {
      System.err.println("ERROR: " + jsonProcessingEx.getMessage());
      return "";
    }
  }

  static class Options {
    Long expires;
    String path;
    String domain;
    Boolean secure = false;
    SameSiteRule sameSite = SameSiteRule.Lax;

    public Options() {}
  }

  enum SameSiteRule {
    None,
    Lax,
    Strict
  }
}
