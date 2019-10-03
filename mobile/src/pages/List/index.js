import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity
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