import { Canvas, Image, useImage } from "@shopify/react-native-skia";

import { useWindowDimensions } from "react-native";

import bgImg from "./assets/sprites/background-day.png";
import birdImg from "./assets/sprites/yellowbird-upflap.png";
import pipeBottomImg from "./assets/sprites/pipe-green.png";
import pipeTopImg from "./assets/sprites/pipe-green-top.png";

import { BIRD_SIZE, PIPE_SIZE } from "./utils/constants";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Base } from "./components/Base";

export default function App() {
  const { width, height } = useWindowDimensions();

  const bg = useImage(bgImg);
  const bird = useImage(birdImg);
  const pipeBottom = useImage(pipeBottomImg);
  const pipeTop = useImage(pipeTopImg);

  const x = useSharedValue(width - 50);

  const pipeOffset = 10;

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
    <Canvas style={{ width, height }}>
      {/* Background */}
      <Image image={bg} width={width} height={height} fit="cover" />

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
      <Image
        image={bird}
        y={height / 2}
        x={width / 4}
        width={BIRD_SIZE.width}
        height={BIRD_SIZE.height}
      />
    </Canvas>
  );
}
