import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode } from 'react';
import { flex, pt } from '@/styles/styles';
import { View, ViewProps } from 'react-native';

type SafeViewProps = {
  children: ReactNode;
} & ViewProps;

const SafeView: React.FC<SafeViewProps> = ({ children, ...rest }: SafeViewProps) => {
  return (
    <SafeAreaView edges={["left", "right"]}  style={[flex.flexGrow, pt.md]} {...rest}>
      {children}
    </SafeAreaView>
  )
}

export default SafeView

