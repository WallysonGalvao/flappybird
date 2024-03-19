import { useWindowDimensions } from 'react-native';

import {
  AnimatedProp,
  Group,
  Image,
  Transforms2d,
  useImage,
} from '@shopify/react-native-skia';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

import birdImg from '@app/assets/sprites/yellowbird-upflap.png';
import { BIRD_SIZE } from '@app/utils/constants';

type BirdProps = {
  transform: AnimatedProp<Transforms2d>;
  y: SharedValue<number>;
};

export const Bird = ({ transform, y }: BirdProps) => {
  const { width } = useWindowDimensions();

  const bird = useImage(birdImg);

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
