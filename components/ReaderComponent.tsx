import { View, Text, StyleSheet } from "react-native";
import { Readable } from "@/hooks/useReadable";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const WORDS_SIZE = 31;
const FONT_SIZE = 24;
const CURRENT_WORD_MULTIPLIER = 0.5;

export default function ReaderComponent(props: { readable: Readable }) {
  const [index, setIndex] = useState(props.readable.index);
  const [words, setWords] = useState(new Array(WORDS_SIZE).fill(""));
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const animationProgress = useSharedValue(0);
  const animationRunning = useSharedValue(false);

  const restWordsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -animationProgress.value * layout.height }],
      opacity: 0.5,
    };
  });

  const currentWordStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -animationProgress.value * layout.height },
        { scale: CURRENT_WORD_MULTIPLIER * (1 - animationProgress.value) + 1 },
      ],
      opacity: (1 - animationProgress.value) * 0.5 + 0.5,
    };
  });

  const nextWordStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -animationProgress.value * layout.height },
        { scale: CURRENT_WORD_MULTIPLIER * animationProgress.value + 1 },
      ],
      opacity: animationProgress.value * 0.5 + 0.5,
    };
  });

  const offset = Math.floor(WORDS_SIZE / 2);

  function nextWord() {
    setIndex((prev) => prev + 1);
    animationProgress.value = 0;

    if (animationRunning.value) {
      animationProgress.value = withDelay(
        50,
        withTiming(1, { duration: 75 }, () => {
          runOnJS(nextWord)();
        })
      );
    }
  }

  const gesture = Gesture.Pan()
    .onBegin(() => {
      animationRunning.value = true;
      animationProgress.value = withTiming(1, { duration: 75 }, () => {
        runOnJS(nextWord)();
      });
    })
    .onFinalize(() => {
      animationRunning.value = false;
    });

  useEffect(() => {
    const newWords = new Array(WORDS_SIZE).fill("");

    for (let i = 0; i < WORDS_SIZE; i++) {
      const word = props.readable.words[index + i - offset];

      if (word) {
        newWords[i] = word;
      }
    }

    setWords(newWords);
  }, [index]);

  return (
    <GestureDetector gesture={gesture}>
      <SafeAreaView style={styles.container}>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={[styles.container, { flexDirection: "column-reverse" }]}>
            {words
              .slice(0, offset)
              .reverse()
              .map((word, i) => {
                return (
                  <Animated.View key={i} style={restWordsStyle}>
                    <Text style={styles.wordStyle}>{word}</Text>
                  </Animated.View>
                );
              })}
          </View>
          <View style={{ alignItems: "center" }}>
            <Animated.View
              style={currentWordStyle}
              onLayout={(e) => {
                setLayout(e.nativeEvent.layout);
              }}
            >
              <Text style={[styles.wordStyle]}>{words[offset]}</Text>
            </Animated.View>
          </View>
          <View style={styles.container}>
            {words.slice(offset + 1).map((word, i) => {
              return (
                <Animated.View
                  key={i}
                  style={i === 0 ? nextWordStyle : restWordsStyle}
                >
                  <Text style={styles.wordStyle}>{word}</Text>
                </Animated.View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </GestureDetector>
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
