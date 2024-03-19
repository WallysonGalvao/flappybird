import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { Canvas } from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useFrameCallback,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Background, Base, Bird, Pipes, Score } from './components';
import { GRAVITY, JUMP_FORCE } from './utils/constants';

export default function App() {
  const { width, height } = useWindowDimensions();
  const [score, setScore] = useState(0);

  const x = useSharedValue(width - 50);

  const birdY = useSharedValue(height / 3);
  const birdYVelocity = useSharedValue(100);

  const gesture = Gesture.Tap().onStart(() => {
    birdYVelocity.value = JUMP_FORCE;
  });

  useAnimatedReaction(
    () => x.value,
    (currentValue, previousValue) => {
      const middle = width / 2;

      if (
        currentValue !== previousValue &&
        previousValue &&
        currentValue <= middle &&
        previousValue > middle
      ) {
        runOnJS(setScore)(score + 1);
      }
    },
  );

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt) {
      return;
    }

    birdY.value = birdY.value + (birdYVelocity.value * dt) / 1000;
    birdYVelocity.value = birdYVelocity.value + (GRAVITY * dt) / 1000;
  });

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(-150, { duration: 3000, easing: Easing.linear }),
        withTiming(width, { duration: 0 }),
      ),
      -1,
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {/* Background */}
          <Background />

          {/* Pipes */}
          <Pipes x={x} />

          {/* Base */}
          <Base />

          {/* Bird */}
          <Bird velocity={birdYVelocity} y={birdY} />

          {/* Score */}
          <Score score={score} />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
