import React from 'react';
import { View, Text } from 'react-native';
import { StylesScreens } from '../utils/Styles/SheetStyle';
import { MedicamentoLocal } from '../types/Medicamentos.interface';


type MedicamentoProps = {
  medicamento: MedicamentoLocal;
  scaleFactor: number;
};

const MedicamentoCard: React.FC<MedicamentoProps> = ({ medicamento }) => {
  return (
    <View style={StylesScreens.card}>
      <Text style={StylesScreens.title}>{medicamento.farmaco}</Text>
      <Text style={StylesScreens.description}>Forma: {medicamento.formaFarmaceutica}</Text>
      <Text style={StylesScreens.description}>Concentración: {medicamento.concentracion}</Text>
      <Text style={StylesScreens.description}>Registro: {medicamento.registroSanitario}</Text>
      <Text style={StylesScreens.description}>Titular: {medicamento.titular}</Text>
      <Text style={StylesScreens.description}>Indicaciones: {medicamento.indicacionTerapeuticas}</Text>
    </View>
  );
};

export default MedicamentoCard;
