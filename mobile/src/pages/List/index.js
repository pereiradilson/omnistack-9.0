import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { 
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

//Components
import SpotList from '../../components/SpotList/SpotList';

//Styles
import Style from './styles';

//Images
import logo from '../../assets/logo.png';

export default function List({ navigation }){
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.1.100:3333', {
        query: { user_id }
      });

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(
        tech => tech.trim());

      setTechs(techsArray);
    });
    
    AsyncStorage.getItem('email').then(value => {
      if(value){
        setEmail(value);
      }
    });
  }, []);

  function handleSubmit(){
    AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={Style.container}>
      <Image source={logo} style={Style.logo} />
      <Text style={Style.textEmail}>
        <Text style={Style.textEmailBold}>E-mail:</Text> {email}
      </Text>
      <TouchableOpacity 
        style={Style.button}
        onPress={handleSubmit}
      >
        <Text style={Style.buttonText}>Sair do sistema</Text>
      </TouchableOpacity>

      <ScrollView style={Style.scrollBottom}>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  );
}