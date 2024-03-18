import { Canvas, Image, useImage } from "@shopify/react-native-skia";

import { useWindowDimensions } from "react-native";

import pipeBottomImg from "./assets/sprites/pipe-green.png";
import pipeTopImg from "./assets/sprites/pipe-green-top.png";

import { GRAVITY, JUMP_FORCE, PIPE_SIZE } from "./utils/constants";
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
} from "react-native-reanimated";
import { useEffect } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Background, Bird, Base } from "./components";

export default function App() {
  const { width, height } = useWindowDimensions();

  const pipeBottom = useImage(pipeBottomImg);
  const pipeTop = useImage(pipeTopImg);

  const pipeOffset = 10;

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
          Extrapolation.CLAMP
        ),
      },
    ];
  });
  const birdOrigin = useDerivedValue(() => {
    return { x: width / 4 + 32, y: birdY.value + 24 };
  });

  const gesture = Gesture.Tap().onStart(() => {
    birdYVelocity.value = JUMP_FORCE;
  });

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt) return;

    birdY.value = birdY.value + (birdYVelocity.value * dt) / 1000;
    birdYVelocity.value = birdYVelocity.value + (GRAVITY * dt) / 1000;
  });

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(-150, { duration: 3000, easing: Easing.linear }),
        withTiming(width, { duration: 0 })
      ),
      -1
    );
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {/* Background */}
          <Background />

          {/* Pipes */}
          <Image
            image={pipeTop}
            y={pipeOffset - 320}
            x={x}
            width={PIPE_SIZE.width}
            height={PIPE_SIZE.height}
          />
          <Image
            image={pipeBottom}
            y={height - 320 + pipeOffset}
            x={x}
            width={PIPE_SIZE.width}
            height={PIPE_SIZE.height}
          />

          {/* Base */}
          <Base />

          {/* Bird */}
          <Bird transform={birdTransform} origin={birdOrigin} y={birdY} />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
