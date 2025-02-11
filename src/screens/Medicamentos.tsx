import React, { useEffect, useState, useMemo } from "react";
import { Image, View, Text, TextInput, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import medicamentosJSON from "../../medicamentos.json";
import medicamentosClasificadosJSON from "../../medicamentos_clasificados.json";
import { StylesScreens } from "../utils/Styles/SheetStyle";
import MedicamentoCard from "../components/MedicamentoCard";
export type MedicamentosClasificados = Record<string, string[]>;

const medicamentosClasificados: MedicamentosClasificados = medicamentosClasificadosJSON[0] as MedicamentosClasificados;

// Función de normalización para búsquedas más precisas
const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export default function Medicamentos() {
  const route = useRoute();
  const params = route.params as { bodyParts?: string[] } | undefined;

  // Estado inicial basado en los parámetros de la ruta
  const initialBusqueda = params?.bodyParts?.length ? params.bodyParts.join(" ") : "";
  const [busqueda, setBusqueda] = useState(initialBusqueda);
  const [medicamentos] = useState<MedicamentoLocal[]>(medicamentosJSON);

  // Filtrado optimizado con useMemo para evitar cálculos innecesarios
  const medicamentosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return medicamentos;

    const terminoNormalized = normalize(busqueda);
    let resultados: MedicamentoLocal[] = [];

    // 1. Búsqueda directa en farmaco e indicacionTerapeuticas
    const normalResults = medicamentos.filter(
      (med) =>
        normalize(med.farmaco).includes(terminoNormalized) ||
        normalize(med.indicacionTerapeuticas).includes(terminoNormalized)
    );

    // 2. Filtrado por clasificación exacta
    const matchingCategory = Object.keys(medicamentosClasificados).find(
      (key) => normalize(key) === terminoNormalized
    );

    let categoryResults: MedicamentoLocal[] = [];
    if (matchingCategory) {
      categoryResults = medicamentos.filter((med) =>
        medicamentosClasificados[matchingCategory].some(
          (nombre) =>
            normalize(med.farmaco).includes(normalize(nombre)) ||
            normalize(med.indicacionTerapeuticas).includes(normalize(nombre))
        )
      );
    }

    // 3. Búsqueda en claves de clasificación parcialmente coincidentes
    let additionalResults: MedicamentoLocal[] = [];
    Object.keys(medicamentosClasificados).forEach((key) => {
      if (normalize(key).includes(terminoNormalized) && normalize(key) !== terminoNormalized) {
        additionalResults = additionalResults.concat(
          medicamentos.filter((med) =>
            medicamentosClasificados[key].some(
              (nombre) =>
                normalize(med.farmaco).includes(normalize(nombre)) ||
                normalize(med.indicacionTerapeuticas).includes(normalize(nombre))
            )
          )
        );
      }
    });

    resultados = [...normalResults, ...categoryResults, ...additionalResults];

    // Eliminar duplicados usando "numero" como identificador único y ordenar resultados
    return Array.from(new Map(resultados.map((med) => [med.numero, med])).values()).sort((a, b) =>
      normalize(a.farmaco).localeCompare(normalize(b.farmaco))
    );
  }, [busqueda, medicamentos]);

  // Sincroniza el término de búsqueda si cambian los parámetros de la ruta
  useEffect(() => {
    if (params?.bodyParts?.length) {
      setBusqueda(params.bodyParts.join(" "));
    }
  }, [params]);

  return (
    <View style={[StylesScreens.container, { flex: 1 }]}>
      <Image source={require("../../assets/images/MedicalAmber.png")} style={StylesScreens.logoImage} />
      <Text style={StylesScreens.header}>MedicalAmber</Text>

      <TextInput
        style={StylesScreens.input}
        placeholder="Buscar medicamento..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={medicamentosFiltrados}
        keyExtractor={(item) => item.numero}
        renderItem={({ item }) => <MedicamentoCard medicamento={item} />}
        ListEmptyComponent={
          <Text style={StylesScreens.noResults}>
            No se encontraron medicamentos. Prueba con otro término.
          </Text>
        }
      />
    </View>
  );
}
