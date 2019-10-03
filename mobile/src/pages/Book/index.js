import React, { useState } from 'react';
import api from '../../services/api';
import { 
  Text,
  TextInput,
  AsyncStorage,
  SafeAreaView,
  TouchableOpacity,
  Alert 
} from 'react-native';

//Style
import Style from './styles';

export default function Book({ navigation }){
  const id = navigation.getParam('id');
  const [date, setDate] = useState('');

  async function handleSubmit(){
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    });

    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  }

  function handleCancel(){
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={Style.container}>
      <Text style={Style.label}>DATA DE INTERESSE *</Text>
      <TextInput 
        style={Style.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity 
        style={Style.button}
        onPress={handleSubmit}
      >
        <Text style={Style.buttonText}>
          Solicitar reserva
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[Style.button, Style.cancelButton]}
        onPress={handleCancel}
      >
        <Text style={Style.buttonText}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}