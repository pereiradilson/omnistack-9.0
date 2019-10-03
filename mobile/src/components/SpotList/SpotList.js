import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { withNavigation } from 'react-navigation';
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';

//Styles
import Style from './styles';

function SpotList({ tech, navigation }){
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots(){
      const response = await api.get('/spots', {
        params: { tech }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  function handleNavigate(id){
    navigation.navigate('Book', { id });
  }

  return (
    <View style={Style.container}>
      <Text style={Style.title}>
        Empresas que usam <Text style={Style.titleBold}>{tech}</Text>
      </Text>

      <FlatList 
        style={Style.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={Style.listItem}>
            <Image 
              source={{ uri: item.thumbnail_url }} 
              style={Style.listItemImage}
            />
            <Text style={Style.listItemCompany}>
              {item.company}
            </Text>
            <Text style={Style.listItemPrice}>
              {item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}
            </Text>
            <TouchableOpacity 
              style={Style.listItemButton}
              onPress={() => handleNavigate(item._id)}
            >
              <Text style={Style.buttonText}>
                Solicitar reserva
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default withNavigation(SpotList);