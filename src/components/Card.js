import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import * as Speech from 'expo-speech';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
const Card = ({ props }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const dateTimeAgo = moment(props.createdAt).fromNow();
    const [language, setLanguage] = useState('english');
  
    useEffect(() => {
        const voiceOptions = async()=>{await Speech.getAvailableVoicesAsync();}
        voiceOptions();
     }, []);
    const handleSpeak =() => { Speech.speak(language==='english'? props.EngText:props.HindiText);  };

    const toggleLanguage = () => {
        if (language === 'english') {
          setLanguage('hindi');
        } else {
          setLanguage('english');
        }
      };

  return(
    <View style={styles.container}>
      <Image source={{ uri: props.img }} style={styles.image} />
      <View style={styles.textContainer}>
     <View style={styles.functionality}>
      <Button title={`Switch to ${language === 'english' ? 'Hindi' : 'English'}`} onPress={toggleLanguage} style={styles.button}>
         <Text style={styles.buttonText}>{`${language === 'english' ? 'Hindi' : 'English'}`}</Text>
       </Button>
      <FontAwesome name="microphone" size={20} color="black" onPress={handleSpeak} />
      </View> 
      <Text style={styles.title}>{language==='english'? props.EngText:props.HindiText}</Text>
        <Text style={styles.link}>{props.articleLink}</Text>
        <View style={styles.CardBottom}>
           <Text style={styles.source}>{props.Source}</Text>
           <Text style={styles.time}>{dateTimeAgo}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal:5,
    marginVertical:10
  },
  image: {
    width: '100%',
    height: 300,

  },
  functionality:{
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
     marginBottom:20
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 12,
    color:"#888",
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  source: {
    fontSize: 14,
    color: '#888',
  },
  CardBottom:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  button: {
    backgroundColor: '#F48FB1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Card;
