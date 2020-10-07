package tutorials.stallnick.spring.util;

import java.util.AbstractMap;

public class MapHelper {

  public static <K, V> AbstractMap.SimpleEntry<K, V> entry(K key, V value) {
    return new AbstractMap.SimpleEntry<>(key, value);
  }
}
