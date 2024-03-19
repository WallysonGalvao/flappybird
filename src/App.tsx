import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { Canvas } from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  cancelAnimation,
  Easing,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Background, Base, Bird, Pipes, Score } from './components';
import { GRAVITY, JUMP_FORCE, PIPE_SIZE } from './utils/constants';
import { isPointCollidingWithRect, restartGame } from './utils/worklet';

export default function App() {
  const { width, height } = useWindowDimensions();
  const [score, setScore] = useState(0);

  const gameOver = useSharedValue(false);
  const pipeX = useSharedValue(width);

  const birdY = useSharedValue(height / 3);
  const birdX = width / 4;
  const birdYVelocity = useSharedValue(0);

  const pipeOffset = useSharedValue(0);
  const topPipeY = useDerivedValue(() => pipeOffset.value - 320);
  const bottomPipeY = useDerivedValue(() => height - 320 + pipeOffset.value);

  const pipesSpeed = useDerivedValue(() => {
    return interpolate(score, [0, 20], [1, 2]);
  });

  const obstacles = useDerivedValue(() => [
    // bottom pipe
    {
      x: pipeX.value,
      y: bottomPipeY.value,
      h: PIPE_SIZE.height,
      w: PIPE_SIZE.width,
    },
    // top pipe
    {
      x: pipeX.value,
      y: topPipeY.value,
      h: PIPE_SIZE.height,
      w: PIPE_SIZE.width,
    },
  ]);

  const moveTheMap = () => {
    pipeX.value = withSequence(
      withTiming(width, { duration: 0 }),
      withTiming(-150, {
        duration: 3000 / pipesSpeed.value,
        easing: Easing.linear,
      }),
      withTiming(width, { duration: 0 }),
    );
  };

  // Scoring system
  useAnimatedReaction(
    () => pipeX.value,
    (currentValue, previousValue) => {
      const middle = birdX;

      // change offset for the position of the next gap
      if (previousValue && currentValue < -100 && previousValue > -100) {
        pipeOffset.value = Math.random() * 400 - 200;
        cancelAnimation(pipeX);
        runOnJS(moveTheMap)();
      }

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

  // Collision detection
  useAnimatedReaction(
    () => birdY.value,
    currentValue => {
      const center = {
        x: birdX + 32,
        y: birdY.value + 24,
      };

      // Ground collision detection
      if (currentValue > height - 100 || currentValue < 0) {
        gameOver.value = true;
      }

      const isColliding = obstacles.value.some(rect =>
        isPointCollidingWithRect(center, rect),
      );

      if (isColliding) {
        gameOver.value = true;
      }
    },
  );

  useAnimatedReaction(
    () => gameOver.value,
    (currentValue, previousValue) => {
      if (currentValue && !previousValue) {
        cancelAnimation(pipeX);
      }
    },
  );

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt || gameOver.value) {
      return;
    }

    birdY.value = birdY.value + (birdYVelocity.value * dt) / 1000;
    birdYVelocity.value = birdYVelocity.value + (GRAVITY * dt) / 1000;
  });

  const gesture = Gesture.Tap().onStart(() => {
    if (gameOver.value) {
      restartGame({
        w: width,
        h: height,
        x: pipeX,
        y: birdY,
        velocity: birdYVelocity,
        gameOver,
        moveTheMap,
        setScore,
      });
    } else {
      birdYVelocity.value = JUMP_FORCE;
    }
  });

  useEffect(() => {
    moveTheMap();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {/* Background */}
          <Background />

          {/* Pipes */}
          <Pipes x={pipeX} yTop={topPipeY} yBottom={bottomPipeY} />

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
