import React, { useEffect, useState } from 'react';
import { Image, View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import medicamentosJSON from '../../medicamentos.json';

// Define la interfaz según la estructura del JSON
type MedicamentoLocal = {
  numero: string;
  farmaco: string;
  formaFarmaceutica: string;
  concentracion: string;
  registroSanitario: string;
  titular: string;
  indicacionTerapeuticas: string;
};

export default function Home() {
  const [medicamentos, setMedicamentos] = useState<MedicamentoLocal[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');
  const [filtrados, setFiltrados] = useState<MedicamentoLocal[]>([]);

  useEffect(() => {
    setMedicamentos(medicamentosJSON);
  }, []);

  useEffect(() => {
    const termino = busqueda.toLowerCase();

    let resultados = medicamentos.filter(med =>
      med.farmaco.toLowerCase().includes(termino)
    );

    resultados.sort((a, b) => {
      const aExacto = a.farmaco.toLowerCase() === termino ? 0 : 1;
      const bExacto = b.farmaco.toLowerCase() === termino ? 0 : 1;
      if (aExacto === bExacto) {
        return a.farmaco.localeCompare(b.farmaco);
      }
      return aExacto - bExacto;
    });

    setFiltrados(resultados);
  }, [busqueda, medicamentos]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../assets/images/MedicalAmber.png')}
        style={styles.logoImage}
      />

      <Text style={styles.header}>MedicalAmber</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar medicamento..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {filtrados.length > 0 ? (
        filtrados.map((med, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{med.farmaco}</Text>
            <Text style={styles.description}>Forma: {med.formaFarmaceutica}</Text>
            <Text style={styles.description}>Concentración: {med.concentracion}</Text>
            <Text style={styles.description}>Registro: {med.registroSanitario}</Text>
            <Text style={styles.description}>Titular: {med.titular}</Text>
            <Text style={styles.description}>
              Indicacion: {med.indicacionTerapeuticas}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>No se encontraron medicamentos.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  logoImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
});