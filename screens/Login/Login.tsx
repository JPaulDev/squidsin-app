import { ButtonBack } from '@components/shared';
import { Eye, EyeSlash } from '@icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useLogInMutation } from '../../app/services/auth';
import type { RootStackParamList } from '../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const CURSOR_COLOR = '#059669';

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
        <Text nativeID="email-input">Email address</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          className={clsx(
            'mb-4 border-b border-stone-500 py-1 text-base',
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
              'border-b border-stone-500 py-1 text-base',
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
        <View className="mt-10 flex items-center">
          <Pressable
            className="rounded-md bg-emerald-600 px-14 py-3 shadow shadow-black"
            onPress={handleLogIn}
            android_ripple={{ color: '#ffffffc0' }}
          >
            <Text className="text-lg font-medium text-white">Log in</Text>
          </Pressable>
        </View>
        <View className="mt-6 flex items-center">
          <Pressable android_ripple={{ color: '#059668a2' }}>
            <Text className="px-3 py-1 text-base font-bold text-emerald-600">
              Forgot your password?
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
