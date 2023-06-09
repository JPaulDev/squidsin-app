import { ButtonBack } from '@components/shared';
import { Eye, EyeSlash } from '@icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useLogInMutation } from '../../app/services/auth';
import type { RootStackParamList } from '../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const CURSOR_COLOR = '#14a582';

export default function Login({ navigation }: Props): JSX.Element {
  const [email, setEmail] = useState<string>('test@mail.com');
  const [password, setPassword] = useState<string>('123456');
  const [emailFocussed, setEmailFocussed] = useState<boolean>(false);
  const [passwordFocussed, setPasswordFocussed] = useState<boolean>(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(true);
  const [logIn] = useLogInMutation();

  const handleChangeIsSecureTextEntry = (value: boolean): void =>
    setIsSecureTextEntry(value);
  const handleChangeEmailFocussed = (value: boolean): void =>
    setEmailFocussed(value);
  const handleChangePasswordFocussed = (value: boolean): void =>
    setPasswordFocussed(value);
  const handleLogIn = (): void => {
    logIn({ email, password });
  };

  return (
    <View className="h-full bg-white">
      <View className="mb-1 flex items-start">
        <ButtonBack navigation={navigation} />
      </View>
      <View className="px-4">
        <Text className="mb-7 text-xl">Welcome back to sQuidsIn!</Text>
        <Text>Email address</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          className={clsx(
            'mb-4 border-b border-stone-500 py-1 text-base',
            emailFocussed && 'border-color-primary'
          )}
          onFocus={() => handleChangeEmailFocussed(true)}
          onBlur={() => handleChangeEmailFocussed(false)}
          cursorColor={CURSOR_COLOR}
          inputMode="email"
          autoComplete="email"
          accessibilityLabel="Your email"
          autoCorrect={false}
        />
        <Text>Password</Text>
        <View className="relative flex justify-center">
          <TextInput
            onChangeText={setPassword}
            value={password}
            className={clsx(
              'border-b border-stone-500 py-1 text-base',
              passwordFocussed && 'border-color-primary'
            )}
            onFocus={() => handleChangePasswordFocussed(true)}
            onBlur={() => handleChangePasswordFocussed(false)}
            cursorColor={CURSOR_COLOR}
            secureTextEntry={isSecureTextEntry}
            autoComplete="password"
            accessibilityLabel="Your password"
            autoCorrect={false}
          />
          {password && isSecureTextEntry && (
            <Pressable
              className="absolute right-0"
              onPress={() => handleChangeIsSecureTextEntry(false)}
              accessibilityLabel="Show password"
            >
              <Eye className="fill-color-primary" width={19} height={19} />
            </Pressable>
          )}
          {password && !isSecureTextEntry && (
            <Pressable
              className="absolute right-0"
              onPress={() => handleChangeIsSecureTextEntry(true)}
              accessibilityLabel="Hide password"
            >
              <EyeSlash className="fill-color-primary" width={20} height={20} />
            </Pressable>
          )}
        </View>
        <View className="mt-10 flex items-center">
          <Pressable
            className="rounded-md bg-color-primary px-14 py-3 shadow shadow-black"
            onPress={handleLogIn}
            android_ripple={{ color: '#ffffffc0' }}
          >
            <Text className="text-lg font-medium text-white">Log in</Text>
          </Pressable>
        </View>
        <View className="mt-6 flex items-center">
          <Pressable android_ripple={{ color: '#14a58376' }}>
            <Text className="px-3 py-1 text-base font-bold text-color-primary">
              Forgot your password?
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
