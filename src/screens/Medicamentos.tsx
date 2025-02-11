import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import medicamentosJSON from '../../medicamentos.json';
import medicamentosClasificadosJSON from '../../medicamentos_clasificados.json';
import { StylesScreens } from '../utils/StyleSheet';
import MedicamentoCard from '../components/MedicamentoCard';

// Tipo que define la estructura de cada medicamento
export type MedicamentoLocal = {
  numero: string;
  farmaco: string;
  formaFarmaceutica: string;
  concentracion: string;
  registroSanitario: string;
  titular: string;
  indicacionTerapeuticas: string;
};

export type MedicamentosClasificados = Record<string, string[]>;

const medicamentosClasificados = (medicamentosClasificadosJSON as unknown as MedicamentosClasificados[])[0];

/**
 * Función para normalizar textos:
 * - Convierte a minúsculas.
 * - Elimina acentos.
 * - Quita espacios extras.
 */
const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export default function Medicamentos() {
  const route = useRoute();
  const params = route.params as { bodyParts?: string[] } | undefined;

  const initialBusqueda =
    params && params.bodyParts && params.bodyParts.length > 0
      ? params.bodyParts.join(' ')
      : '';

  const [state, setState] = useState({
    medicamentos: medicamentosJSON as MedicamentoLocal[],
    busqueda: initialBusqueda,
    filtrados: [] as MedicamentoLocal[],
  });

  // Actualizar filtrado cada vez que cambia la búsqueda.
  useEffect(() => {
    setState(prev => ({
      ...prev,
      filtrados: filtrarMedicamentos(prev.busqueda, prev.medicamentos),
    }));
  }, [state.busqueda]);

  // Actualizar el término de búsqueda cuando cambian los parámetros de la ruta.
  useEffect(() => {
    const params = route.params as { bodyParts?: string[] } | undefined;
    const newBusqueda =
      params && params.bodyParts && params.bodyParts.length > 0
        ? params.bodyParts.join(' ')
        : '';
    setState(prev => ({ ...prev, busqueda: newBusqueda }));
  }, [route.params]);

  const filtrarMedicamentos = (termino: string, lista: MedicamentoLocal[]): MedicamentoLocal[] => {
    if (!termino.trim()) {
      return lista;
    }
    const terminoNormalized = normalize(termino);
    let resultados: MedicamentoLocal[] = [];

    // 1. Filtrado normal: buscar en "farmaco" e "indicacionTerapeuticas"
    const normalResults = lista.filter(med =>
      normalize(med.farmaco).includes(terminoNormalized) ||
      normalize(med.indicacionTerapeuticas).includes(terminoNormalized)
    );

    // 2. Filtrado por clasificación EXACTA
    const matchingCategory = Object.keys(medicamentosClasificados).find(
      key => normalize(key) === terminoNormalized
    );
    let categoryResults: MedicamentoLocal[] = [];
    if (matchingCategory) {
      categoryResults = lista.filter(med => {
        const nombresMedicos = medicamentosClasificados[matchingCategory];
        return nombresMedicos.some(nombre =>
          normalize(med.farmaco).includes(normalize(nombre)) ||
          normalize(med.indicacionTerapeuticas).includes(normalize(nombre))
        );
      });
    }

    // 3. Filtrado adicional: buscar en claves de clasificación parcialmente coincidentes
    let additionalResults: MedicamentoLocal[] = [];
    Object.keys(medicamentosClasificados).forEach(key => {
      const keyNormalized = normalize(key);
      if (keyNormalized.includes(terminoNormalized) && keyNormalized !== terminoNormalized) {
        const nombresMedicos: string[] = medicamentosClasificados[key];
        const adicionales = lista.filter(med =>
          nombresMedicos.some(nombre =>
            normalize(med.farmaco).includes(normalize(nombre)) ||
            normalize(med.indicacionTerapeuticas).includes(normalize(nombre))
          )
        );
        additionalResults = additionalResults.concat(adicionales);
      }
    });

    resultados = [...normalResults, ...categoryResults, ...additionalResults];

    // Eliminar duplicados usando "numero" como identificador único
    const resultadosUnicos = resultados.filter(
      (med, index, self) =>
        index === self.findIndex(m => m.numero === med.numero)
    );

    // Ordenar para que las coincidencias exactas en el nombre aparezcan primero.
    resultadosUnicos.sort((a, b) => {
      const aExact = normalize(a.farmaco) === terminoNormalized ? 0 : 1;
      const bExact = normalize(b.farmaco) === terminoNormalized ? 0 : 1;
      if (aExact !== bExact) {
        return aExact - bExact;
      }
      return normalize(a.farmaco).localeCompare(normalize(b.farmaco));
    });

    return resultadosUnicos;
  };

  return (
    <View style={[StylesScreens.container, { flex: 1 }]}>
      <Image 
        source={require('../../assets/images/MedicalAmber.png')}
        style={StylesScreens.logoImage}
      />
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
        ListEmptyComponent={
          <Text style={StylesScreens.noResults}>
            No se encontraron medicamentos.
          </Text>
        }
      />
    </View>
  );
}
