import { Button, Text, View, Pressable, Image } from 'react-native';
import { useLogOutMutation } from '../../app/services/auth';
import React from 'react';

export default function Account(): JSX.Element {
  const [logOut] = useLogOutMutation();

  const handleLogout = (): void => {
    logOut();
  };

  const username = 'JohnDoe';
  const email = 'johndoe@example.com';
  const profilePicture = require('../../PlaceholderProfilePicture/index.png');

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
          source={profilePicture}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ marginTop: 10 }}>{username}</Text>
        <Text style={{ marginTop: 5, color: 'gray' }}>{email}</Text>
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
