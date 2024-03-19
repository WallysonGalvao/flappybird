import { useWindowDimensions } from 'react-native';

import { Image, useImage } from '@shopify/react-native-skia';

import bgImg from '@app/assets/sprites/background-day.png';

export const Background = () => {
  const { width, height } = useWindowDimensions();

  const bg = useImage(bgImg);

  return <Image image={bg} width={width} height={height} fit="cover" />;
};
