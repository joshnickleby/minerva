package tutorials.stallnick.spring.model.java;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JavaCharacterClass {
  private UUID id;
  private String name = "";

  public JavaCharacterClass(String name) {
    this.name = name;
    this.id = UUID.randomUUID();
  }
}
