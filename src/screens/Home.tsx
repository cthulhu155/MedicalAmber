import React, { useEffect, useState } from 'react';
import { Image, View, Text, ScrollView, TextInput } from 'react-native';
import medicamentosJSON from '../../medicamentos.json';
import { StylesScreens } from '../utils/StyleSheet';


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
    <ScrollView style={StylesScreens.container}>
      <Image source={require('../../assets/images/MedicalAmber.png')} style={StylesScreens.logoImage} />
      <Text style={StylesScreens.header}>MedicalAmber</Text>
      <TextInput
        style={StylesScreens.input}
        placeholder="Buscar medicamento..."
        value={busqueda}
        onChangeText={setBusqueda}
      />
      {filtrados.length > 0 ? (
        filtrados.map((med, index) => (
          <View key={index} style={StylesScreens.card}>
            <Text style={StylesScreens.title}>{med.farmaco}</Text>
            <Text style={StylesScreens.description}>Forma: {med.formaFarmaceutica}</Text>
            <Text style={StylesScreens.description}>Concentración: {med.concentracion}</Text>
            <Text style={StylesScreens.description}>Registro: {med.registroSanitario}</Text>
            <Text style={StylesScreens.description}>Titular: {med.titular}</Text>
            <Text style={StylesScreens.description}>Indicacion: {med.indicacionTerapeuticas}</Text>
          </View>
        ))
      ) : (
        <Text style={StylesScreens.noResults}>No se encontraron medicamentos.</Text>
      )}
    </ScrollView>
  );
}

