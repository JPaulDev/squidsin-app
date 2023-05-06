import { BrandLogo, Eye, EyeSlash } from '@icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSignUpMutation } from '../../app/services/auth';
import type { RootStackParamList } from '../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const CURSOR_COLOR = '#059669';

export default function SignUp({ navigation }: Props): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [fullNameFocussed, setFullNameFocussed] = useState<boolean>(false);
  const [emailFocussed, setEmailFocussed] = useState<boolean>(false);
  const [passwordFocussed, setPasswordFocussed] = useState<boolean>(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(true);
  const [imageURI, setImageURI] = useState<string>('');
  const [signUp] = useSignUpMutation();

  const handleSignUp = (): void => {
    signUp({ email, password, imageURI, fullName });
  };

  const handleChangeIsSecureTextEntry = (value: boolean): void =>
    setIsSecureTextEntry(value);
  const handleChangeEmailFocussed = (value: boolean): void =>
    setEmailFocussed(value);
  const handleChangePasswordFocussed = (value: boolean): void =>
    setPasswordFocussed(value);
  const handleChangeDisplayNameFocussed = (value: boolean): void =>
    setFullNameFocussed(value);

  const handlePickImage = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  return (
    <View className="h-full bg-white p-4">
      <View className="mb-5 flex flex-row items-center gap-2">
        <BrandLogo width={60} height={60} />
        <Text className="text-xl font-medium">sQuidsIn</Text>
      </View>
      <TextInput
        onChangeText={setFullName}
        value={fullName}
        className={clsx(
          'mb-6 border-b border-stone-500 py-1 text-base',
          fullNameFocussed && 'border-emerald-600'
        )}
        onFocus={() => handleChangeDisplayNameFocussed(true)}
        onBlur={() => handleChangeDisplayNameFocussed(false)}
        cursorColor={CURSOR_COLOR}
        accessibilityLabel="Your full name"
        autoCorrect={false}
        placeholder="Full name"
        autoFocus={true}
      />
      <View className="mb-10 flex flex-row items-center gap-4">
        <Pressable onPress={handlePickImage}>
          <Image
            source={
              imageURI ? imageURI : require('../../assets/default-profile.webp')
            }
            className="h-28 w-28 border-2 border-stone-400"
          />
          <Image
            source={require('../../assets/camera.webp')}
            className="absolute bottom-1 right-1 h-6 w-6"
          />
        </Pressable>
        <View className="flex-1">
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
            accessibilityLabel="Your email address"
            autoCorrect={false}
            placeholder="Your email address"
          />
          <View className="justify-center">
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
              accessibilityLabel="Your password"
              autoCorrect={false}
              placeholder="Your password"
            />
            {password && isSecureTextEntry && (
              <Pressable
                className="absolute right-0"
                onPress={() => handleChangeIsSecureTextEntry(false)}
                accessibilityLabel="Show password"
              >
                <Eye className="fill-emerald-600" width={19} height={19} />
              </Pressable>
            )}
            {password && !isSecureTextEntry && (
              <Pressable
                className="absolute right-0"
                onPress={() => handleChangeIsSecureTextEntry(true)}
                accessibilityLabel="Hide password"
              >
                <EyeSlash className="fill-emerald-600" width={20} height={20} />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View className="flex flex-row gap-8 px-8">
        <View className="flex-1 overflow-hidden rounded-md border-x border-b-2 border-t border-x-stone-200 border-b-stone-400 border-t-stone-200">
          <Pressable
            className="flex flex-row items-center justify-center"
            onPress={() => navigation.goBack()}
            android_ripple={{ color: '#b3b3b3b0' }}
          >
            <Text className="p-3 text-center text-base font-semibold text-stone-700">
              Back
            </Text>
          </Pressable>
        </View>
        <View className="flex-1 overflow-hidden rounded-md border-b-2 border-b-stone-400 bg-emerald-600">
          <Pressable
            onPress={handleSignUp}
            android_ripple={{ color: '#ffffffc0' }}
          >
            <Text className="p-3 text-center text-base font-semibold text-white">
              Done
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
