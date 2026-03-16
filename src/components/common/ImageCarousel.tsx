import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

const { width } = Dimensions.get("window");

type CarouselProps = {
  images: string[];
  height?: number;
};

export default function ImageCarousel({ images }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={[styles.image]}
          />
        )}
      />

      { images.length > 1 &&
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width - 32,
    borderRadius: 12,
    aspectRatio: 4/3,
  },

  pagination: {
    marginTop: -24,
    marginHorizontal: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderRadius: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FCAF58",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#FF4416",
  },
});