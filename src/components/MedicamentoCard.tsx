import React from 'react';
import { View, Text } from 'react-native';
import { StylesScreens } from '../utils/Styles/SheetStyle';
import { MedicamentoProps } from '../types/Medicamentos.interface';

// Componente que muestra la información de un medicamento en forma de tarjeta
const MedicamentoCard: React.FC<MedicamentoProps> = ({ medicamento }) => {
  return (
    // Contenedor principal con estilo de tarjeta
    <View style={StylesScreens.card}>
      {/* Nombre del fármaco como título */}
      <Text style={StylesScreens.title}>{medicamento.farmaco}</Text>
      {/* Forma farmacéutica del medicamento */}
      <Text style={StylesScreens.description}>Forma: {medicamento.formaFarmaceutica}</Text>
      {/* Concentración del medicamento */}
      <Text style={StylesScreens.description}>Concentración: {medicamento.concentracion}</Text>
      {/* Número de registro sanitario */}
      <Text style={StylesScreens.description}>Registro: {medicamento.registroSanitario}</Text>
      {/* Titular del medicamento */}
      <Text style={StylesScreens.description}>Titular: {medicamento.titular}</Text>
      {/* Indicaciones terapéuticas */}
      <Text style={StylesScreens.description}>Indicaciones: {medicamento.indicacionTerapeuticas}</Text>
    </View>
  );
};

// Exportación del componente
export default MedicamentoCard;
