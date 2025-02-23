import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input';
import * as Icons from 'phosphor-react-native';
import Button from '@/components/Button';
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'

const Register = () => {

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {register: registerUser} = useAuth(); 

  const handleSubmit = async ()=>{
      if(!emailRef.current || !passwordRef.current || !nameRef.current){
        Alert.alert("SignUp", "Please fill all the fields");
        return;
      }
      setIsLoading(true);
      const res = await registerUser(
        nameRef.current,
        emailRef.current,
        passwordRef.current 
      );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28}/>

        <View style={{ gap: 5, marginTop: spacingY._20}}>
          <Typo size={30} fontWeight={"800"}>
            Let's
          </Typo>
          <Typo size={30} fontWeight={"800"}>
          Get Started
          </Typo>
        </View>

        {/* form */}

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
           Create an Account to track all your expenses
          </Typo>
          <Input
            placeholder="Name"
            onChangeText={(value) => (nameRef.current = value)}
            icon={<Icons.User size={verticalScale(26)}
            color={colors.neutral300}
            weight="fill" />}
           />
          <Input
            placeholder="Email"
            onChangeText={(value) => (emailRef.current = value)}
            icon={<Icons.At size={verticalScale(26)}
            color={colors.neutral300}
            weight="fill" />}
           />
           <Input
            placeholder="Password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={<Icons.Lock size={verticalScale(26)}
            color={colors.neutral300}
            weight="fill" />}
           />

          <Button loading = {isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Sign Up
            </Typo>
          </Button>
        </View>

        {/* footer */}
        <View style = {styles.footer}>
          <Typo size={15}> Already Have An Account?</Typo>
          <Pressable onPress={()=> router.navigate("/(auth)/login")}>
            <Typo size={15} fontWeight={'bold'} color={colors.primary}>
              Login Now!
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Register;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: spacingY._7,
      paddingHorizontal: spacingX._20,
    },
    welcomeText: {
      fontSize: verticalScale(20),
      fontWeight: "bold",
      color: colors.text,
    },
    form: {
      gap: spacingY._20,
    },
    forgotPassword: {
      textAlign: "right",
      fontWeight: "500",
      color: colors.text,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
      paddingTop: 20,
    },  
    footerText: {
      textAlign: "center",
      color: colors.text,
      fontSize: verticalScale(15),
    },
});