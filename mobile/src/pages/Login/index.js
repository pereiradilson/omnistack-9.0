import React, { useState, useEffect } from 'react';
import { 
  View, 
  Image, 
  Text, 
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';

import api from '../../services/api';

//Style
import Style from './styles';

//Images
import logo from '../../assets/logo.png';

export default function Login({ navigation }){
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');
  
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(user){
        navigation.navigate('List');
      }
    });
  }, []);
  
  async function handleSubmit(){
    const response = await api.post('/sessions', {
      email
    });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={Style.container}>
      <Image source={logo} />

      <View style={Style.form}>
        <Text style={Style.label}>SEU E-MAIL *</Text>
        <TextInput 
          style={Style.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={Style.label}>TECNOLOGIAS *</Text>
        <TextInput 
          style={Style.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity 
          style={Style.button}
          onPress={handleSubmit}
        >
          <Text style={Style.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
