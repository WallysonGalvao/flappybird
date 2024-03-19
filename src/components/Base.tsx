import { useWindowDimensions } from 'react-native';

import { Image, useImage } from '@shopify/react-native-skia';

import baseImg from '@app/assets/sprites/base.png';
import { BASE_SIZE } from '@app/utils/constants';

export const Base = () => {
  const { width, height } = useWindowDimensions();

  const base = useImage(baseImg);

  return (
    <Image
      image={base}
      fit="cover"
      y={height - 75}
      x={0}
      width={width}
      height={BASE_SIZE.height}
    />
  );
};
