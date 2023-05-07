import { Image } from 'expo-image';
import { Button, Pressable, Text, View } from 'react-native';
import { useLogOutMutation } from '../../app/services/auth';
import useAuth from '../../hooks/useAuth';

export default function Account(): JSX.Element {
  const { user } = useAuth();
  const [logOut] = useLogOutMutation();

  const handleLogout = (): void => {
    logOut();
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text className="text-xl" style={{ fontWeight: 'bold' }}>
          Accounts
        </Text>
        <Pressable
          style={{
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text>Account Settings</Text>
        </Pressable>
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={user.photoURL}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ marginTop: 10 }}>{user.fullName}</Text>
        <Text style={{ marginTop: 5, color: 'gray' }}>{user.email}</Text>
        <Pressable style={{ marginTop: 10 }}>
          <Text style={{ color: '#007AFF' }}>sQuidsIn Pro</Text>
        </Pressable>
      </View>
      <Text style={{ paddingVertical: 5, paddingHorizontal: 20 }}>
        Preferences
      </Text>
      <View style={{ paddingVertical: 20 }}>
        <Pressable style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text>Email Settings</Text>
        </Pressable>
        <Pressable style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text>Device and Push Notification Settings</Text>
        </Pressable>
        <Pressable style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text>Passcode</Text>
        </Pressable>
      </View>
      <View>
        <Button title="Log out" onPress={handleLogout} />
      </View>
    </View>
  );
}
