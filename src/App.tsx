import { Canvas, Image, useImage } from "@shopify/react-native-skia";

import { useWindowDimensions } from "react-native";

import bgImg from "./assets/sprites/background-day.png";
import birdImg from "./assets/sprites/yellowbird-upflap.png";
import pipeBottomImg from "./assets/sprites/pipe-green.png";
import pipeTopImg from "./assets/sprites/pipe-green-top.png";
import baseImg from "./assets/sprites/base.png";
import { BASE_SIZE, BIRD_SIZE, PIPE_SIZE } from "./utils/constants";

export default function App() {
  const { width, height } = useWindowDimensions();

  const bg = useImage(bgImg);
  const bird = useImage(birdImg);
  const pipeBottom = useImage(pipeBottomImg);
  const pipeTop = useImage(pipeTopImg);
  const base = useImage(baseImg);

  const pipeOffset = 10;

  return (
    <Canvas style={{ width, height }}>
      {/* Background */}
      <Image image={bg} width={width} height={height} />

      {/* Pipes */}
      <Image
        image={pipeTop}
        y={pipeOffset - 320}
        x={width / 2}
        width={PIPE_SIZE.width}
        height={PIPE_SIZE.height}
      />
      <Image
        image={pipeBottom}
        y={height - 320 + pipeOffset}
        x={width / 2}
        width={PIPE_SIZE.width}
        height={PIPE_SIZE.height}
      />

      {/* base */}
      <Image
        image={base}
        fit="cover"
        y={height - 75}
        x={0}
        width={width}
        height={BASE_SIZE.height}
      />

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
