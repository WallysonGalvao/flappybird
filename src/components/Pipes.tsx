import { Image, useImage } from '@shopify/react-native-skia';
import { SharedValue } from 'react-native-reanimated';

import pipeTopImg from '@app/assets/sprites/pipe-green-top.png';
import pipeBottomImg from '@app/assets/sprites/pipe-green.png';
import { PIPE_SIZE } from '@app/utils/constants';

type PipesProps = {
  x: SharedValue<number>;
  yTop: SharedValue<number>;
  yBottom: SharedValue<number>;
};

export const Pipes = ({ x, yTop, yBottom }: PipesProps) => {
  const pipeBottom = useImage(pipeBottomImg);
  const pipeTop = useImage(pipeTopImg);

  return (
    <>
      <Image
        image={pipeTop}
        y={yTop}
        x={x}
        width={PIPE_SIZE.width}
        height={PIPE_SIZE.height}
      />
      <Image
        image={pipeBottom}
        y={yBottom}
        x={x}
        width={PIPE_SIZE.width}
        height={PIPE_SIZE.height}
      />
    </>
  );
};
