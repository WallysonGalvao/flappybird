import { Platform, useWindowDimensions } from 'react-native';

import { matchFont, Text } from '@shopify/react-native-skia';

type ScoreProps = { score: number };

type Weight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export const Score = ({ score }: ScoreProps) => {
  const { width } = useWindowDimensions();

  const fontStyle = {
    fontFamily: Platform.select({ ios: 'Helvetica', default: 'serif' }),
    fontSize: 40,
    fontWeight: '600' as Weight,
  };

  const font = matchFont(fontStyle);

  return <Text x={width / 2.15} y={100} text={score.toString()} font={font} />;
};
