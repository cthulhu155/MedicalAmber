import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import baseStyles from '../utils/Styles/HomeStyleSheet';

interface HomeHeaderProps {
  onAddPress: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onAddPress }) => {
  return (
    <View style={[baseStyles.header, { marginBottom: 20 }]}>
      <Text style={[baseStyles.screenTitle, { fontSize: 28, fontWeight: 'bold' }]}>
        Medical Reminders
      </Text>
      <TouchableOpacity
        style={[baseStyles.addButton, { backgroundColor: '#4A90E2', borderRadius: 30, padding: 8 }]}
        onPress={onAddPress}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
