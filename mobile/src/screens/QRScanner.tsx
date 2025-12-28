import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-camera';
import { api } from '../services/api';

export default function QRScanner({ route }: any) {
  const { establishmentId } = route.params;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    const productId = data.replace('product:', '');
    const res = await api.get(`/qrcode/${productId}/resolve`);
    setProduct(res.data);
  };

  if (hasPermission === null) return <Text>Solicitando permissão...</Text>;
  if (hasPermission === false) return <Text>Sem acesso à câmera</Text>;

  return (
    <View style={styles.container}>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} />}
      {product && (
        <View style={styles.sheet}>
          <Text style={styles.title}>{product.name}</Text>
          <Text>Preço: R$ {product.price.toFixed(2)}</Text>
          <Text>Estabelecimento: {product.establishment?.name}</Text>
          <Text>Estoque: {product.stock}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold' }
});
