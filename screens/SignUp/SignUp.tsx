import { ButtonBack } from '@components/shared';
import { Eye, EyeSlash } from '@icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { auth } from '../../firebase';
import type { RootStackParamList } from '../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const CURSOR_COLOR = '#059669';

export default function SignUp({ navigation }: Props): JSX.Element {
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [displayNameFocussed, setDisplayNameFocussed] =
    useState<boolean>(false);
  const [emailFocussed, setEmailFocussed] = useState<boolean>(false);
  const [passwordFocussed, setPasswordFocussed] = useState<boolean>(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(true);

  const handleSignUp = async () => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      signUpEmail,
      signUpPassword
    );
    await updateProfile(user, { displayName: fullName });
  };

  const handleChangeIsSecureTextEntry = (value: boolean): void =>
    setIsSecureTextEntry(value);
  const handleChangeEmailFocussed = (value: boolean): void =>
    setEmailFocussed(value);
  const handleChangePasswordFocussed = (value: boolean): void =>
    setPasswordFocussed(value);
  const handleChangeDisplayNameFocussed = (value: boolean): void =>
    setDisplayNameFocussed(value);

  return (
    <View className="h-full bg-white">
      <View className="mb-1 flex items-start">
        <ButtonBack navigation={navigation} />
      </View>
      <View className="px-4">
        <Text className="mb-7 text-xl">Create a new account</Text>
        <Text nativeID="email-input">Email address</Text>
        <TextInput
          onChangeText={setSignUpEmail}
          value={signUpEmail}
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
        <Text nativeID="Display-Name-input">Full name</Text>
        <TextInput
          onChangeText={setFullName}
          value={fullName}
          className={clsx(
            'mb-4 border-b border-stone-500 py-1 text-base',
            displayNameFocussed && 'border-emerald-600'
          )}
          onFocus={() => handleChangeDisplayNameFocussed(true)}
          onBlur={() => handleChangeDisplayNameFocussed(false)}
          cursorColor={CURSOR_COLOR}
          accessibilityLabel="input"
          accessibilityLabelledBy="Display-Name-input"
          autoCorrect={false}
        />
        <Text nativeID="password-input">Password</Text>
        <View className="relative flex justify-center">
          <TextInput
            onChangeText={setSignUpPassword}
            value={signUpPassword}
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
          {signUpPassword && isSecureTextEntry && (
            <Pressable
              className="absolute right-0"
              onPress={() => handleChangeIsSecureTextEntry(false)}
              accessible={true}
              accessibilityLabel="Show password"
            >
              <Eye className="fill-emerald-600" width={19} height={19} />
            </Pressable>
          )}
          {signUpPassword && !isSecureTextEntry && (
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
        <View className="mt-10 overflow-hidden rounded-md border-b-2 border-b-stone-400 bg-emerald-600">
          <Pressable
            onPress={handleSignUp}
            android_ripple={{ color: '#ffffffc0' }}
          >
            <Text className="p-3 text-center text-base font-semibold text-white">
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
