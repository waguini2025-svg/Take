import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { api } from '../services/api';

export default function Home({ navigation }: any) {
  const [establishments, setEstablishments] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      const res = await api.get('/establishments');
      setEstablishments(res.data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Próximos de você</Text>
      <FlatList
        data={establishments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Establishment', { establishment: item })}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: { padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: '600' }
});
