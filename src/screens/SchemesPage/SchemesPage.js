import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Text, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native-gesture-handler";

export default function SchemesPage() {
  const [area, setArea] = useState("");
  const [crop, setCrop] = useState("");
  const [district, setDistrict] = useState("");
  const districts = [
    { label: "ajmer", value: "ajmer" },
    { label: "bhilwara", value: "bhilwara" },
    { label: "alwar", value: "alwar" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.Box}>
        <TextInput
          style={styles.input}
          placeholder="Area"
          onChangeText={(text) => setArea(text)}
          value={area}
        />
        <TextInput
          style={styles.input}
          placeholder="Type of Crop"
          onChangeText={(text) => setCrop(text)}
          value={crop}
        />
        <Dropdown
          style={styles.input}
          data={districts}
          search
          labelField="label"
          valueField="value"
          value={district}
          onChange={(item) => {
            setDistrict(item.value);
          }}
        />
        <Button title="Submit" />
      </View>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>Central Schemes</Text>
      <ScrollView style={styles.Schemes}>
        <View>
          <Text> Schemes About </Text>
          <Image source={require("../../../assets/register.webp")} />
        </View>
        <View>
          <Image source={require("../../../assets/register.webp")} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  Box: {
    backgroundColor: "#edb8b4",
    padding: 20,
    borderRadius: 8,
  },
  input: {
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
  },
  //   Img: {
  //     height: 60,
  //     width: 70,
  //   },
  Schemes: {
    // justifyContent: "center",
    // alignItems: "center",
  },
});
