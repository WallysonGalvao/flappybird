import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

import { Canvas } from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  Easing,
  Extrapolation,
  interpolate,
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Background, Base, Bird, Pipes } from './components';
import { GRAVITY, JUMP_FORCE } from './utils/constants';

export default function App() {
  const { width, height } = useWindowDimensions();

  const x = useSharedValue(width - 50);

  const birdY = useSharedValue(height / 3);
  const birdYVelocity = useSharedValue(100);

  const birdTransform = useDerivedValue(() => {
    return [
      {
        rotate: interpolate(
          birdYVelocity.value,
          [-500, 500],
          [-0.5, 0.5],
          Extrapolation.CLAMP,
        ),
      },
    ];
  });

  const gesture = Gesture.Tap().onStart(() => {
    birdYVelocity.value = JUMP_FORCE;
  });

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {/* Background */}
          <Background />

          {/* Pipes */}
          <Pipes x={x} />

          {/* Base */}
          <Base />

          {/* Bird */}
          <Bird transform={birdTransform} y={birdY} />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
