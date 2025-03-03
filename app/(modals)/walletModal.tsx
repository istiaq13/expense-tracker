import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import ScreenWrapper from '@/components/ScreenWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import * as Icons from 'phosphor-react-native'
import { getProfileImage } from '@/services/imageService'
import { Image } from 'expo-image'
import Typo from '@/components/Typo'
import { UserDataType, WalletType } from '@/types'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useAuth } from '@/context/authContext'
import { updateUser } from '@/services/userService'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import ImageUpload from '@/components/ImageUpload';
import { createOrUpdateWallet } from '@/services/walletService'

const ProfileModal = () => {
    const { user,updateUserData } = useAuth();
    const [wallet, setWallet] = useState<WalletType>({
        name: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async () => {
        let { name, image } = wallet;
        if(!name.trim()) {
            Alert.alert("Wallet", "Please Fill All The Fields");
            return;
        }

        const data: WalletType ={
            name,
            image,
            uid: user?.uid
        };
        //todo
        setLoading(true);
        const res = await createOrUpdateWallet(data);
        setLoading(false);
        if(res.success){
            router.back();
        }else{
            Alert.alert("Wallet", res.msg);
        }
    };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header 
        title="New Wallet" 
        leftIcon={<BackButton/>} 
        style={{marginTop: spacingY._10}}
        />

       {/* form */}
       <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name</Typo>
            <Input
                placeholder="Amount"
                value={wallet.name}
                onChangeText={(value) =>
                    setWallet({...wallet, name: value})
                }
            />    
        </View>
        <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name</Typo>
            <ImageUpload
                onClear={()=> setWallet({...wallet, image: null})}
                file={wallet.image} 
                onSelect={file=> setWallet ({...wallet, image: file})} 
                placeholder="Upload Image"
             />
        </View>
       </ScrollView> 
      </View>

      <View style={styles.footer}>
      <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
            <Typo color={colors.black} fontWeight={"700"}>
                    Add Wallet
            </Typo>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default ProfileModal

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: spacingY._20,
    },
    footer: {
       alignItems: "center",
       flexDirection: "row",
       justifyContent: "center",
       paddingHorizontal: spacingX._20,
       gap: scale(12),
       paddingTop: spacingY._15,
       borderColor: colors.neutral700,
       marginBottom: spacingY._5,
       borderWidth: 1, 
    },
    form:{
       gap: spacingY._30,
       marginTop: spacingY._15,
    },
    avatarContainer: {
        position: "relative",
        alignSelf: "center",
    },
    avatar: {
       alignSelf: "center",
       backgroundColor: colors.neutral100,
       height: verticalScale(135),
       width: verticalScale(135),
       borderRadius: 200,
       borderWidth: 1,
       borderColor: colors.neutral100, 
    },
    editIcon: {
        position: "absolute",
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7,
    },
    inputContainer: {
        gap: spacingY._10,
    }
});
