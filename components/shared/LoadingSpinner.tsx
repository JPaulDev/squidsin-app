import { ActivityIndicator } from 'react-native';

type Props = {
  color?: string;
  size?: 'small' | 'large';
};

export default function LoadingSpinner({ color, size }: Props): JSX.Element {
  return (
    <ActivityIndicator
      className="h-full justify-center"
      color={color || 'black'}
      size={size || 'large'}
      accessibilityLabel="Loading"
    />
  );
}
