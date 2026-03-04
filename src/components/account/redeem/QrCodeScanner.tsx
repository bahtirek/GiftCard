import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { CameraView, Camera, CameraMode, CameraType, } from 'expo-camera';
import IconButton from '@/components/UI/buttons/IconButton';

const QRCodeScanner = ({onScan}: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [mode, setMode] = useState<CameraMode>("picture");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    onScan(data)
  };

  const toggleTorch = () => {
    setTorchOn(!torchOn);
  };

  const scanAgain = () => {
    setScanned(false)
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        mode={mode}
        enableTorch={torchOn}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.scanBox} />
          <View style={styles.buttonRow}>
            <IconButton icon={torchOn ? 'zap' : 'zap-off'} onPress={toggleTorch} />
            {scanned && (
              <View style={styles.reloadButton}>
                <IconButton icon={'refresh-cw'} onPress={scanAgain} />
              </View>
            )}
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
  },
  container: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    scanBox: {
      borderColor: '#fff',
      width: 256,
      height: 256,
      borderWidth: 2,
    },
    buttonRow: {
      marginTop: 48,
      flexDirection: 'row',
    },
    torchButton: {
      borderWidth: 1,
      borderColor: '#007bff',
      backgroundColor: '#fff',
      borderRadius: 8,
    },
    reloadButton: {
      marginLeft: 48,
    },
    centerText: {
      textAlign: 'center',
    },
});

export default QRCodeScanner;