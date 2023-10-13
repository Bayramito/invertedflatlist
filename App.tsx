import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {useEffect, useState} from 'react';

const Stack = createNativeStackNavigator();
const {width, height} = Dimensions.get('window');

function Screen1({navigation}) {
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    const response = await fetch(
      'https://picsum.photos/v2/list?page=2&limit=100',
    );
    const data = await response.json();
    setImages(data);
  };
  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={images}
        numColumns={3}
        inverted
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Screen2', {
                image: item.download_url,
                id: item.id,
              })
            }>
            <Animated.Image
              sharedTransitionTag={item.id}
              source={{uri: item.download_url}}
              style={{height: width / 3, width: width / 3}}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function Screen2({navigation, route}) {
  const {image, id} = route?.params;
  return (
    <View style={{flex: 1, marginTop: 50}}>
      <Animated.Image
        sharedTransitionTag={id}
        source={{uri: image}}
        style={{
          height: width,
          width: width,
          alignSelf: 'center',
        }}
      />
    </View>
  );
}

export default function SharedElementExample() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
