import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import baseStyles from '../utils/Styles/HomeStyleSheet';

interface HomeHeaderProps {
  onAddPress: () => void;
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
  onSearchPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ 
  onAddPress, 
  onNotificationsPress,
  onProfilePress,
  onSearchPress 
}) => {
  return (
    <View style={[baseStyles.header, { marginBottom: 20 }]}>
      <Text style={[baseStyles.screenTitle, { fontSize: 28, fontWeight: 'bold' }]}>
        Medical Amber
      </Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity
          style={[baseStyles.iconButton]}
          onPress={onSearchPress}
        >
          <Ionicons name="search-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[baseStyles.iconButton]}
          onPress={onNotificationsPress}
        >
          <Ionicons name="notifications-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[baseStyles.iconButton]}
          onPress={onProfilePress}
        >
          <Ionicons name="person-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[baseStyles.addButton, { 
            backgroundColor: '#4A90E2', 
            borderRadius: 30, 
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center' 
          }]}
          onPress={onAddPress}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
