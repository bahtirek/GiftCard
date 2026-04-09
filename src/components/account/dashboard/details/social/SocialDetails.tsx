import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAccountStore } from '@/stores/account.store';
import IconButton from '@/components/UI/buttons/IconButton';
import { flex, mb, mt, text } from '@/styles/styles';
import { updateAccountAPI } from '@/api/account/account.api';
import { SocialType } from '@/types';
import SocialEdit from './SocialEdit';

const SocialDetails = () => {
  const { account, updateAccount } = useAccountStore();
  const [showSocialEditModal, setShowSocialEditModal] = useState(false)

  const onSocialEditButtonClicked = () => {
    setShowSocialEditModal(true)
  }

  const updateSocial = async (social: SocialType) => {
    const updatedAccount = { ...account!, social: social }
    await updateAccountAPI(updatedAccount)

    updateAccount(updatedAccount);
    setShowSocialEditModal(false)
  }

  return (
    <View>
      <Text style={[text.xs, text.primaryLight, mb.xs]}>Social:</Text>
      <View style={styles.detailsRow}>
        <View style={[styles.details]}>
          {
            account?.social && (account?.social?.telegram || account?.social?.instagram || account?.social?.twitter) ? (
              <>
                {account?.social?.instagram &&
                  <Text style={[mt.xs]}>{account?.social?.instagram}</Text>
                }
                {account?.social?.telegram &&
                  <Text style={[mt.xs]}>{account?.social?.telegram}</Text>
                }
                {account?.social?.twitter &&
                  <Text style={[mt.xs]}>{account?.social?.twitter}</Text>
                }
              </>
            ) : (
              <Text style={[mt.xs, text.grey]}>No solial network</Text>
            )
          }
        </View>
        <IconButton icon='edit' onPress={() => onSocialEditButtonClicked()} />
      </View>

      <SocialEdit
        showModal={showSocialEditModal}
        closeModal={() => { setShowSocialEditModal(false) }}
        presetValue={account?.social}
        updateSocial={updateSocial}
      />
    </View>
  )
}

export default SocialDetails

const styles = StyleSheet.create({
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 16
  },
  details: {
    flexGrow: 1,
    paddingRight: 16,
    marginBottom: 4
  },
})