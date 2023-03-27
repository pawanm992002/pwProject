import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Image, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native-gesture-handler";

export default function SchemesPage() {
  const [Schemes, setSchemes] = useState({});

  const handelSubmit = async () => {
    const res = await axios.get(
      `https://newsapi-production.up.railway.app/api/Scheme/${state}/${district}/${Crops}/${area}/${Income}`
    );
    setSchemes(res.data);
  };

  const [district, setDistrict] = useState("");
  const [Crops, setCrops] = useState("");
  const [area, setArea] = useState("");
  const [income, setIncome] = useState();

  const districts = [
    { label: "ajmer", value: "ajmer" },
    { label: "bhilwara", value: "bhilwara" },
    { label: "alwar", value: "alwar" },
  ];
  const crops = [
    { label: "Rice", value: "Rice" },
    { label: "wheat", value: "wheat" },
    { label: "barley", value: "barley" },
    { label: "peas", value: "peas" },
    { label: "grain", value: "grain" },
    { label: "corn", value: "corn" },
  ];
  const Area = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.Box}>
        <Dropdown
          placeholder="Select Crops"
          style={styles.input}
          data={crops}
          search
          labelField="label"
          valueField="value"
          value={Crops}
          onChange={(item) => {
            setCrops(item.value);
          }}
        />
        <Dropdown
          placeholder="select district"
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
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Enter Income"
          onChangeText={(text) => setIncome(text)}
          value={income}
        />
        <Dropdown
          placeholder="Area of land"
          style={styles.input}
          data={Area}
          search
          labelField="label"
          valueField="value"
          value={area}
          onChange={(item) => {
            setIncome(item.value);
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
});
