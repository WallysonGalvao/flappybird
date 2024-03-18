import {
  AnimatedProp,
  Group,
  Image,
  SkPoint,
  Transforms2d,
  useImage,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

import birdImg from "@app/assets/sprites/yellowbird-upflap.png";
import { SharedValue } from "react-native-reanimated";
import { BIRD_SIZE } from "@app/utils/constants";

type BirdProps = {
  transform: AnimatedProp<Transforms2d>;
  origin: AnimatedProp<SkPoint>;
  y: SharedValue<number>;
};

export const Bird = ({ transform, origin, y }: BirdProps) => {
  const { width } = useWindowDimensions();

  const bird = useImage(birdImg);

  const birdX = width / 4;

  return (
    <Group transform={transform} origin={origin}>
      <Image
        image={bird}
        y={y}
        x={birdX}
        width={BIRD_SIZE.width}
        height={BIRD_SIZE.height}
      />
    </Group>
  );
};
