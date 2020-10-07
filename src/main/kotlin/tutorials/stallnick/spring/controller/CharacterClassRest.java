package tutorials.stallnick.spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tutorials.stallnick.spring.util.MapHelper;

import java.util.Map;

@RestController
@RequestMapping("/api/character-class")
public class CharacterClassRest {

  Map<Integer, String> classesMap = Map.ofEntries(
      MapHelper.entry(1, "Barbarian"),
      MapHelper.entry(2, "Bard"),
      MapHelper.entry(3, "Cleric"),
      MapHelper.entry(4, "Druid"),
      MapHelper.entry(5, "Fighter"),
      MapHelper.entry(6, "Monk"),
      MapHelper.entry(7, "Paladin"),
      MapHelper.entry(8, "Ranger"),
      MapHelper.entry(9, "Rogue"),
      MapHelper.entry(10, "Sorcerer"),
      MapHelper.entry(11, "Warlock"),
      MapHelper.entry(12, "Wizard")
  );

  public CharacterClassRest() {

  }

  @GetMapping("/")
  public Map<Integer, String> getCharacterClasses() {
    return this.classesMap;
  }

  @GetMapping("/{id}")
  public String getCharacterClassById(@PathVariable Integer id) {
    return this.classesMap.get(id);
  }
}
