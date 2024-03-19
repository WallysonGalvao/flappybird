import { Image, useImage } from '@shopify/react-native-skia';

import pipeTopImg from '@app/assets/sprites/pipe-green-top.png';
import pipeBottomImg from '@app/assets/sprites/pipe-green.png';
import { PIPE_SIZE } from '@app/utils/constants';
import { useWindowDimensions } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

const pipeOffset = 10;

type PipesProps = {
  x: SharedValue<number>;
};

export const Pipes = ({ x }: PipesProps) => {
  const { height } = useWindowDimensions();

  const pipeBottom = useImage(pipeBottomImg);
  const pipeTop = useImage(pipeTopImg);

  return (
    <>
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
    </>
  );
};
