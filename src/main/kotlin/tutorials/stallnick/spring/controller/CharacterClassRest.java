package tutorials.stallnick.spring.controller;

import org.springframework.web.bind.annotation.*;
import tutorials.stallnick.spring.model.CharacterClass;

import java.util.*;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("api/character-class")
public class CharacterClassRest {

  List<CharacterClass> characterClasses = Stream.of(
      new CharacterClass("Barbarian"),
      new CharacterClass("Bard"),
      new CharacterClass("Cleric"),
      new CharacterClass("Druid"),
      new CharacterClass("Fighter"),
      new CharacterClass("Monk"),
      new CharacterClass("Paladin"),
      new CharacterClass("Ranger"),
      new CharacterClass("Rogue"),
      new CharacterClass("Sorcerer"),
      new CharacterClass("Warlock"),
      new CharacterClass("Wizard")
  ).collect(Collectors.toList());

  Map<UUID, CharacterClass> characterClassMap = characterClasses
      .parallelStream()
      .collect(Collectors.toMap(CharacterClass::getId, Function.identity()));

  @GetMapping("/{id}")
  public CharacterClass getCharacterClassById(@PathVariable UUID id) {
    return this.characterClassMap.get(id);
  }

  @GetMapping("/")
  public List<CharacterClass> getCharacterClasses() {
    return this.characterClasses;
  }

  @GetMapping(params = {"name", "exact"})
  public List<CharacterClass> getCharacterClassesByNameSearch(
      @RequestParam String name,
      @RequestParam Boolean exact) {

    // const filterCharacterList = function(filterFn) {
    //   characterClasses.filter(filterFn)
    // }
    Function<Predicate<CharacterClass>, List<CharacterClass>> filterCharacterList = filterFn ->
        characterClasses
          .stream()
          .filter(filterFn)
          .collect(Collectors.toList());

    if (!exact) {
      return filterCharacterList.apply(characterClass -> characterClass.hasNameContains(name));
    } else {
      return filterCharacterList.apply(characterClass -> characterClass.hasNameLike(name));
    }
  }

  Map<Integer, BiFunction<String, CharacterClass, Boolean>> nameSearchMap = Map.of(
      0, (name, characterClass) -> characterClass.hasNameContains(name),
      1, (name, characterClass) -> characterClass.hasNameLike(name)
  );

  @GetMapping(value = "/branchless", params = {"name", "exact"})
  public List<CharacterClass> getCharacterClassesByNameSearchBranchless(
      @RequestParam String name,
      @RequestParam Integer exact) {

    try {
      BiFunction<String, CharacterClass, Boolean> filterFn = nameSearchMap.get(exact);

      return characterClasses
          .stream()
          .filter(characterClass -> filterFn.apply(name, characterClass))
          .collect(Collectors.toList());

    } catch (Exception e) {
      System.out.println("Parameter exact did not match the required functionality. Value was: " + exact);
      return Collections.emptyList();
    }
  }


}
