import { runOnJS, SharedValue } from 'react-native-reanimated';

type Point = {
  x: number;
  y: number;
};

type Rect = Point & {
  w: number;
  h: number;
};

type Game = {
  w: number;
  h: number;
  x: SharedValue<number>;
  y: SharedValue<number>;
  velocity: SharedValue<number>;
  gameOver: SharedValue<boolean>;
  moveTheMap: () => void;
  setScore: (score: number) => void;
};

export const isPointCollidingWithRect = (point: Point, rect: Rect) => {
  'worklet';
  return (
    point.x >= rect.x && // right of the left edge AND
    point.x <= rect.x + rect.w && // left of the right edge AND
    point.y >= rect.y && // below the top AND
    point.y <= rect.y + rect.h // above the bottom
  );
};

export const restartGame = ({
  w,
  h,
  x,
  y,
  velocity,
  gameOver,
  moveTheMap,
  setScore,
}: Game) => {
  'worklet';
  y.value = h / 3;
  velocity.value = 0;
  gameOver.value = false;
  x.value = w;
  runOnJS(moveTheMap)();
  runOnJS(setScore)(0);
};
