import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAccountStore } from '@/stores/account.store';
import IconButton from '@/components/UI/buttons/IconButton';
import { flex, mb, text } from '@/styles/styles';
import { updateAccountAPI } from '@/api/account/account.api';
import { ContactType } from '@/types';
import ContactsEdit from './ContactsEdit';
import CustomButton from '@/components/UI/buttons/CustomButton';

const ContactsDetails = () => {
  const { account, updateAccount } = useAccountStore();
  const [showContactsEditModal, setShowContactsEditModal] = useState(false)

  const onContactsEditButtonClicked = () => {
    setShowContactsEditModal(true)
  }

  const updateContacts = async (contacts: ContactType) => {
    const updatedAccount = { ...account!, contacts: contacts }
    await updateAccountAPI(updatedAccount)

    updateAccount(updatedAccount);
    setShowContactsEditModal(false)
  }

  return (
    <View>
      {
        account?.contacts && (account?.contacts?.website || account?.contacts?.phone || account?.contacts?.email) ? (
          <>
            <Text style={[text.xs, text.primaryLight, mb.xs]}>Contacts:</Text>
            <View style={styles.detailsRow}>

              <View style={[styles.details]}>
                {account?.contacts?.phone &&
                  <Text style={[mb.xs]}>{account?.contacts?.phone}</Text>
                }
                {account?.contacts?.website &&
                  <Text style={[mb.xs]}>{account?.contacts?.website}</Text>
                }
                {account?.contacts?.email &&
                  <Text style={[mb.xs]}>{account?.contacts?.email}</Text>
                }
              </View>
              <IconButton icon='edit' onPress={() => onContactsEditButtonClicked()} />
            </View>
          </>
        ) : (
          <CustomButton label='Add contacts' handlePress={onContactsEditButtonClicked} secondary containerStyles={{ padding: 0 }} />
        )
      }
      <ContactsEdit
        showModal={showContactsEditModal}
        closeModal={() => { setShowContactsEditModal(false) }}
        presetValue={account?.contacts}
        updateContacts={updateContacts}
      />
    </View>
  )
}

export default ContactsDetails

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