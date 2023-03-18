import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { useSpeech } from 'expo-speech';
import * as Speech from 'expo-speech';
const VoiceCard = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

useEffect(() => {
   const voiceOptions = async()=>{
      await Speech.getAvailableVoicesAsync();
   }
   voiceOptions();
}, []);


  const handleSpeak =() => {
       Speech.speak(text);
  };

  return (
    <TouchableOpacity onPress={handleSpeak}>
      <View style={styles.card}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
};

export default VoiceCard;
