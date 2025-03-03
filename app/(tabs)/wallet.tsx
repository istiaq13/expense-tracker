import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { verticalScale } from '@/utils/styling'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import Typo from '@/components/Typo'
import * as Icons from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'
//import useFetchData from '@/hooks/useFetchData'
import { WalletType } from '@/types'
import { orderBy, where } from 'firebase/firestore'
import Loading from '@/components/Loading'
import WalletListItem from '@/components/WalletListItem'

const Wallet = () => {
  const router = useRouter();

  const getTotalBalance = () => {
    return 2344;
  };

  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
      <View style={styles.container}>
        {/* balance view */}
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={45} fontWeight={"500"}>
              ${getTotalBalance()}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>

        {/* wallets */}
        <View style={styles.wallets}>
        {/* header */}
        <View style={styles.flexRow}>
          <Typo size={20} fontWeight={"500"}>My Wallets</Typo>
          <TouchableOpacity onPress={()=> router.push("/(modals)/walletModal")}>
            <Icons.PlusCircle
              weight="fill"
              color={colors.primary}
              size={verticalScale(33)}
            />
          </TouchableOpacity>
        </View>

        {/* todo: wallet list */}
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default Wallet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingY._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});
