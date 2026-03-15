import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageCarousel from '@/components/common/ImageCarousel'
import { commonStyles } from '@/styles/styles';

const DashboardAccountDetailsScreen = () => {
  const images = [
  "https://picsum.photos/id/1011/800/400",
  "https://picsum.photos/id/1015/800/400",
  "https://picsum.photos/id/1016/800/400",
  "https://picsum.photos/id/1020/800/400",
  "https://picsum.photos/id/1018/800/400",
  "https://picsum.photos/id/1019/800/400",
];

  return (
    <View style={[commonStyles.container]}>
      <ImageCarousel images={images} />
    </View>
  )
}

export default DashboardAccountDetailsScreen

const styles = StyleSheet.create({})