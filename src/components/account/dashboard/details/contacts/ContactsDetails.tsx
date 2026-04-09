import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAccountStore } from '@/stores/account.store';
import IconButton from '@/components/UI/buttons/IconButton';
import { flex, mb, mt, text } from '@/styles/styles';
import { updateAccountAPI } from '@/api/account/account.api';
import { ContactType } from '@/types';
import ContactsEdit from './ContactsEdit';

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
      <Text style={[text.xs, text.primaryLight, mb.xs]}>Contacts:</Text>
      <View style={styles.detailsRow}>
        <View style={[styles.details]}>
          {
            account?.contacts && (account?.contacts?.website || account?.contacts?.phone || account?.contacts?.email) ? (
              <>
                {account?.contacts?.phone &&
                  <Text style={[mt.xs]}>{account?.contacts?.phone}</Text>
                }
                {account?.contacts?.website &&
                  <Text style={[mt.xs]}>{account?.contacts?.website}</Text>
                }
                {account?.contacts?.email &&
                  <Text style={[mt.xs]}>{account?.contacts?.email}</Text>
                }
              </>
            ) : (
              <Text style={[mt.xs, text.grey]}>No contacts</Text>
            )
          }
        </View>
        <IconButton icon='edit' onPress={() => onContactsEditButtonClicked()} />
      </View>

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