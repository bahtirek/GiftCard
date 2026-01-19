import { StyleSheet, Linking, Alert, Button } from 'react-native'
import React, { useCallback } from 'react'

type OpenURLButtonProps = {
  url: string;
  title: string;
};

const OpenURLButton = ({ url, title }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={title} onPress={handlePress} />;
}

export default OpenURLButton

const styles = StyleSheet.create({})