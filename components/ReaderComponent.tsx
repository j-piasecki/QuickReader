import { View, TextInput, StyleSheet, useColorScheme } from "react-native";
import { Readable } from "@/hooks/useReadable";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay,
  SharedValue,
  useAnimatedProps,
  Easing,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const FONT_SIZE = 24;

export default function ReaderComponent(props: { readable: Readable }) {
  const [wordsCount, setWordsCount] = useState(0);
  const [wordHeight, setWordHeight] = useState(0);
  const words = useSharedValue(props.readable.words);
  const index = useSharedValue(props.readable.index);

  const gesture = Gesture.Tap().onStart((e) => {
    index.value = withTiming(index.value + 1, {
      duration: 100,
    });
  });

  return (
    <GestureDetector gesture={gesture}>
      <SafeAreaView
        style={styles.container}
        onLayout={(e) => {
          const count = Math.ceil(e.nativeEvent.layout.height / FONT_SIZE);
          setWordsCount(count % 2 === 0 ? count + 1 : count);
        }}
      >
        <View
          style={{ width: "100%", height: "100%", justifyContent: "center" }}
          pointerEvents="none"
        >
          <View style={{ flex: 1, flexDirection: "column-reverse" }}>
            {new Array(Math.floor(wordsCount / 2)).fill(0).map((_, i) => (
              <AnimatedWord
                words={words}
                index={index}
                key={i}
                offset={-(i + 1)}
                wordHeight={wordHeight}
              />
            ))}
          </View>
          <AnimatedWord
            words={words}
            index={index}
            offset={0}
            wordHeight={wordHeight}
            onLayout={(e) => {
              setWordHeight(e.nativeEvent.layout.height);
            }}
          />
          <View style={{ flex: 1, flexDirection: "column" }}>
            {new Array(Math.floor(wordsCount / 2)).fill(0).map((_, i) => (
              <AnimatedWord
                words={words}
                index={index}
                key={i}
                offset={i + 1}
                wordHeight={wordHeight}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </GestureDetector>
  );
}

function AnimatedWord(props: {
  words: SharedValue<string[]>;
  index: SharedValue<number>;
  offset: number;
  wordHeight: number;
  onLayout?: (e: any) => void;
}) {
  const theme = useColorScheme();
  const animatedProps = useAnimatedProps(() => {
    return {
      text: props.words.value[Math.floor(props.index.value) + props.offset],
    } as any;
  });

  const style = useAnimatedStyle(() => {
    const progress = props.index.value - Math.floor(props.index.value);
    let opacity = 0.5;
    let scale = 1;
    let offset = -props.wordHeight * progress;

    if (props.offset === 0) {
      opacity = (1 - progress) * 0.5 + 0.5;
      scale = (1 - progress) * 0.5 + 1;
      console.log(progress);
    } else if (props.offset === 1) {
      opacity = progress * 0.5 + 0.5;
      scale = progress * 0.5 + 1;
    }

    return {
      opacity: opacity,
      transform: [{ translateY: offset }, { scale: scale }],
    };
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      style={[
        {
          color: theme === "dark" ? "white" : "black",
          fontSize: FONT_SIZE,
          textAlign: "center",
          paddingHorizontal: 16,
        },
        style,
      ]}
      value={props.words.value[props.index.value + props.offset]}
      multiline={true}
      editable={false}
      animatedProps={animatedProps}
      onLayout={props.onLayout}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    overflow: "visible",
  },
  wordStyle: {
    fontSize: FONT_SIZE,
    fontFamily: "Quicksand",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});
