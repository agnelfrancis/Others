// HomeServ.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../src/AppContext'; // Import the context

const HomeServ = () => {
  const navigation = useNavigation();
  const { newPageData, customButtons, setCustomButtons } = useAppContext(); // Access the saved data

  const agricultureButtons = [
    { label: 'valam', value: 'valam', link: 'ValamPage' ,icon: 'leaf'},
    { label: 'Seeds', value: 'SeedPage', icon: 'tree' },
    { label: 'keedanasini', value: 'keedanasini', icon: 'leaf' },
    { label: 'Marketplace', value: 'marketplace', link: 'https://keralaagriculture.gov.in/en/panchayath-level-organisations/', icon: 'shopping-basket' },
    { label: 'Weather Forecast', value: 'weatherForecast', icon: 'sun-o' },
    { label: 'vetinary services', value: 'vetinary services', icon: 'briefcase' },
    { label: 'crop practice', value: 'crop practice', icon: 'briefcase' },
  ];

  const quotes = [
    "The best time to plant a tree was 20 years ago. The second-best time is now.",
    "Farmers are the backbone of our nation.",
    "Agriculture not only gives riches to a nation but the only riches she can call her own.",
    "The discovery of agriculture was the first big step toward a civilized life.",
    "Farming is a profession of hope.",
    "Nature has undoubtedly mastered the art of healing, and farmers are her primary care providers.",
  ];

  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  const handleButtonPress = (item) => {
    console.log(`Button pressed: ${item.label}`);
    if (item.link) {
      if (item.value === 'valam') {
        navigation.navigate('ValamPage');
      } else if (item.value === 'marketplace') {
        Linking.openURL(item.link).catch((err) => console.error('Error opening link:', err));
      } else if (item.value === 'seeds') {
        navigation.navigate('SeedPage'); // Replace 'SeedPage' with the actual name of your seed page
      } else {
        navigation.navigate(item.link);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/agri.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Agriculture Services</Text>

          <View style={styles.buttonContainer}>
            {agricultureButtons.map((item, index) => (
              <TouchableOpacity
                key={item.value}
                style={styles.button}
                onPress={() => handleButtonPress(item)}
              >
                <View style={styles.buttonContent}>
                  <Icon name={item.icon} size={30} color="#001F3F" />
                  <Text style={styles.buttonText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {customButtons.map((item, index) => (
              <TouchableOpacity
                key={item.value}
                style={styles.button}
                onPress={() => handleButtonPress(item)}
              >
                <View style={styles.buttonContent}>
                  <Icon name={item.icon} size={30} color="#001F3F" />
                  <Text style={styles.buttonText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.savedData}>{newPageData}</Text>

          <View style={styles.quoteContainer}>
            <Icon name="quote-left" size={20} color="#001F3F" />
            <Text style={[styles.quote, { color: '#001F3F' }]}>{randomQuote}</Text>
            <Icon name="quote-right" size={20} color="#001F3F" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  savedData: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F3F',
    marginTop: 10,
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginLeft: 5,
    marginRight: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    marginVertical: 10,
    width: '30%',
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#001F3F',
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: '#001F3F',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default HomeServ;
