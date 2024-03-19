import { useWindowDimensions } from 'react-native';

import { Group, Image, useImage } from '@shopify/react-native-skia';
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useDerivedValue,
} from 'react-native-reanimated';

import birdImg from '@app/assets/sprites/yellowbird-upflap.png';
import { BIRD_SIZE } from '@app/utils/constants';

type BirdProps = {
  velocity: SharedValue<number>;
  y: SharedValue<number>;
};

export const Bird = ({ velocity, y }: BirdProps) => {
  const { width } = useWindowDimensions();

  const bird = useImage(birdImg);

  const transform = useDerivedValue(() => {
    return [
      {
        rotate: interpolate(
          velocity.value,
          [-500, 500],
          [-0.5, 0.5],
          Extrapolation.CLAMP,
        ),
      },
    ];
  });

  const origin = useDerivedValue(() => {
    return { x: width / 4 + 32, y: y.value + 24 };
  });

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
