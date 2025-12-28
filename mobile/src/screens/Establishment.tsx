import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Establishment({ route, navigation }: any) {
  const { establishment } = route.params;
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get('/products', { params: { establishmentId: establishment.id } }).then((res) => setProducts(res.data));
  }, [establishment.id]);

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: establishment.imageUrl || 'https://placehold.co/600x200' }} style={styles.hero}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={{ color: 'white' }}>Voltar</Text>
        </TouchableOpacity>
      </ImageBackground>
      <Text style={styles.title}>{establishment.name}</Text>
      <Text style={styles.sub}>Horário: 09h - 22h</Text>
      <TouchableOpacity style={styles.qr} onPress={() => navigation.navigate('QRScanner', { establishmentId: establishment.id })}>
        <Text>Escanear QR Code</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>R$ {item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { height: 180, justifyContent: 'flex-start' },
  back: { marginTop: 40, marginLeft: 12, backgroundColor: '#00000088', padding: 8, borderRadius: 6 },
  title: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 12, marginTop: 12 },
  sub: { marginHorizontal: 12, color: '#666' },
  qr: { margin: 12, padding: 12, backgroundColor: '#f4f4f5', borderRadius: 8 },
  card: { marginHorizontal: 12, padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: '600' }
});
