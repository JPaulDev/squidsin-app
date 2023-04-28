import { Eye, EyeSlash, LeftArrow } from '@icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const CURSOR_COLOR = '#059669';

export default function Login({ navigation }: Props): JSX.Element {
  const [username, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailFocussed, setEmailFocussed] = useState<boolean>(false);
  const [passwordFocussed, setPasswordFocussed] = useState<boolean>(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(true);

  const handleChangeIsSecureTextEntry = (value: boolean): void =>
    setIsSecureTextEntry(value);
  const handleChangeEmailFocussed = (value: boolean): void =>
    setEmailFocussed(value);
  const handleChangePasswordFocussed = (value: boolean): void =>
    setPasswordFocussed(value);

  return (
    <View className="bg-white h-full">
      <View className="flex items-start mb-1">
        <Pressable
          className="p-4"
          accessible={true}
          accessibilityLabel="Go back"
          accessibilityHint="Navigates to the home screen"
          onPress={() => navigation.navigate('Home')}
        >
          <LeftArrow className="fill-black" />
        </Pressable>
      </View>
      <View className="px-4">
        <Text className="text-xl mb-7">Welcome back to sQuidsIn!</Text>
        <Text nativeID="email-input">Email address</Text>
        <TextInput
          onChangeText={setEmail}
          value={username}
          className={clsx(
            'border-b py-1 mb-4 border-stone-500 text-base',
            emailFocussed && 'border-emerald-600'
          )}
          onFocus={() => handleChangeEmailFocussed(true)}
          onBlur={() => handleChangeEmailFocussed(false)}
          cursorColor={CURSOR_COLOR}
          inputMode="email"
          autoComplete="email"
          accessibilityLabel="input"
          accessibilityLabelledBy="email-input"
          autoCorrect={false}
        />
        <Text nativeID="password-input">Password</Text>
        <View className="relative flex justify-center">
          <TextInput
            onChangeText={setPassword}
            value={password}
            className={clsx(
              'border-b py-1 border-stone-500 text-base',
              passwordFocussed && 'border-b-emerald-600'
            )}
            onFocus={() => handleChangePasswordFocussed(true)}
            onBlur={() => handleChangePasswordFocussed(false)}
            cursorColor={CURSOR_COLOR}
            secureTextEntry={isSecureTextEntry}
            autoComplete="password"
            accessibilityLabel="input"
            accessibilityLabelledBy="password-input"
            autoCorrect={false}
          />
          {password && isSecureTextEntry && (
            <Pressable
              className="absolute right-0"
              onPress={() => handleChangeIsSecureTextEntry(false)}
              accessible={true}
              accessibilityLabel="Show password"
            >
              <Eye className="fill-emerald-600" width={19} height={19} />
            </Pressable>
          )}
          {password && !isSecureTextEntry && (
            <Pressable
              className="absolute right-0"
              onPress={() => handleChangeIsSecureTextEntry(true)}
              accessible={true}
              accessibilityLabel="Hide password"
            >
              <EyeSlash className="fill-emerald-600" width={20} height={20} />
            </Pressable>
          )}
        </View>
        <View className="flex items-center mt-10">
          <Pressable
            className="bg-emerald-600 py-3 px-14 rounded-md shadow shadow-black"
            android_ripple={{ color: '#ffffffc0' }}
          >
            <Text className="text-white text-lg font-medium">Log in</Text>
          </Pressable>
        </View>
        <View className="flex items-center mt-6">
          <Pressable android_ripple={{ color: '#059668a2' }}>
            <Text className="text-emerald-600 font-bold text-base px-3 py-1">
              Forgot your password?
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
