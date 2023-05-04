import { Button, Text, View } from 'react-native';
import { useLogOutMutation } from '../../app/services/auth';

export default function Account(): JSX.Element {
  const [logOut] = useLogOutMutation();

  const handleLogout = (): void => {
    logOut();
  };

  return (
    <View>
      <Text className="text-xl">Account</Text>
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
}
