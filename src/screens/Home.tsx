import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, FlatList } from 'react-native';
import medicamentosJSON from '../../medicamentos.json';
import { StylesScreens } from '../utils/StyleSheet';
import MedicamentoCard from '../components/MedicamentoCard';

export default function Home() {
  const [state, setState] = useState({
    medicamentos: [] as MedicamentoLocal[],
    busqueda: '',
    filtrados: [] as MedicamentoLocal[],
  });

  useEffect(() => {
    setState(prev => ({
      ...prev,
      medicamentos: medicamentosJSON,
      filtrados: filtrarMedicamentos(prev.busqueda, medicamentosJSON),
    }));
  }, []);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      filtrados: filtrarMedicamentos(prev.busqueda, prev.medicamentos),
    }));
  }, [state.busqueda]);

  const filtrarMedicamentos = (termino: string, lista: MedicamentoLocal[]) => {
    const terminoLower = termino.toLowerCase();
    
    let resultados = lista.filter(med => med.farmaco.toLowerCase().includes(terminoLower));

    resultados.sort((a, b) => {
      const aExacto = a.farmaco.toLowerCase() === terminoLower ? 0 : 1;
      const bExacto = b.farmaco.toLowerCase() === terminoLower ? 0 : 1;
      return aExacto === bExacto ? a.farmaco.localeCompare(b.farmaco) : aExacto - bExacto;
    });

    return resultados;
  };

  return (
    <View style={StylesScreens.container}>
      <Image source={require('../../assets/images/MedicalAmber.png')} style={StylesScreens.logoImage} />
      <Text style={StylesScreens.header}>MedicalAmber</Text>
      <TextInput
        style={StylesScreens.input}
        placeholder="Buscar medicamento..."
        value={state.busqueda}
        onChangeText={text => setState(prev => ({ ...prev, busqueda: text }))}
      />
      <FlatList
        data={state.filtrados}
        keyExtractor={(item) => item.numero}
        renderItem={({ item }) => <MedicamentoCard medicamento={item} />}
        ListEmptyComponent={<Text style={StylesScreens.noResults}>No se encontraron medicamentos.</Text>}
      />
    </View>
  );
}
