package tutorials.stallnick.spring.model

import java.util.*

class CharacterClass(
    var id: UUID? = null,
    var name: String = ""
) {

  constructor(name: String) : this(id = UUID.randomUUID(), name = name)

  /**
   *  Checks if namePart is contained in the name.
   */
  fun hasNameContains(namePart: String): Boolean {
    return this.name
        .toLowerCase()
        .contains(namePart.toLowerCase())
  }

  /**
   *  Checks if namePart matches with position of name in all letters.
   */
  fun hasNameLike(namePart: String): Boolean {
    return this.name
        .toLowerCase()
        .subSequence(0, namePart.length) == namePart.toLowerCase()
  }

}