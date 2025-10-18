import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import Typography from '../components/Typography';
import { moisturizerSections } from '../data/moisturizers';
import { resolveProductByBarcode } from '../data/barcodes';

export default function CameraScreen({ navigation }) {
  const { theme } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedValue, setScannedValue] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const onBarcodeScanned = useCallback(({ data, type }) => {
    if (isScanning) return;
    setIsScanning(true);
    setScannedValue(data);

    const product = resolveProductByBarcode(data, moisturizerSections);
    if (product) {
      Alert.alert(
        'Produkt fundet',
        `Stregkode: ${data}\nType: ${type}\n\nÅbner detaljer for: ${product.name}`,
        [
          {
            text: 'Se Detaljer',
            onPress: () => {
              navigation.navigate('ProductDetail', { product });
            },
          },
          {
            text: 'Scan igen',
            onPress: () => setIsScanning(false),
          },
        ]
      );
    } else {
      Alert.alert(
        'Ukendt stregkode',
        `Stregkode: ${data}\nType: ${type}\n\nDette produkt blev ikke fundet i den lokale database.`,
        [
          { text: 'Scan igen', onPress: () => setIsScanning(false) },
          { text: 'Luk', onPress: () => navigation.goBack(), style: 'cancel' },
        ]
      );
    }
  }, [isScanning, navigation]);

  const flipCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Typography variant="body" style={{ color: theme.colors.text }}>
          Anmoder om kamera tilladelse...
        </Typography>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Typography variant="h2" style={{ color: theme.colors.text, marginBottom: 16 }}>
          Ingen Kamera Adgang
        </Typography>
        <Typography variant="body" style={{ color: theme.colors.textMuted, textAlign: 'center', marginBottom: 20 }}>
          ScanCare har brug for kamera adgang for at scanne produkter
        </Typography>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={requestPermission}
        >
          <Typography variant="body" style={{ color: '#fff' }}>Giv Tilladelse</Typography>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <CameraView 
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39']
        }}
        onBarcodeScanned={onBarcodeScanned}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <Typography variant="h3" style={styles.headerTitle}>Scan Produkt</Typography>
            <TouchableOpacity onPress={flipCamera} style={styles.headerButton}>
              <Ionicons name="camera-reverse" size={30} color="white" />
            </TouchableOpacity>
          </View>

          {/* Scanning Frame */}
          <View style={styles.scanFrame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
            <Typography variant="body" style={styles.scanText}>
              {isScanning ? "Scannner..." : "Placer produktet i rammen"}
            </Typography>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity 
              style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
              onPress={() => setIsScanning(false)}
              disabled={!isScanning}
            >
              <Ionicons 
                name={isScanning ? 'hourglass' : 'checkmark'}
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    textAlign: 'center',
  },
  scanFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerTopRight: {
    position: 'absolute',
    top: '30%',
    right: '20%',
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: '30%',
    left: '20%',
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: '30%',
    right: '20%',
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  scanText: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 100,
  },
  bottomControls: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,150,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  scanButtonDisabled: {
    backgroundColor: 'rgba(100,100,100,0.8)',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
});
