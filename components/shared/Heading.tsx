import clsx from 'clsx';
import { Text } from 'react-native';

type Props = {
  children: string;
  styles?: string;
};

export default function Heading({ children, styles }: Props): JSX.Element {
  return (
    <Text className={clsx('text-xl text-stone-700', styles)}>{children}</Text>
  );
}
