import React, { useState } from "react";
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import firebase from "../../firebase/config";
import { Dropdown } from "react-native-element-dropdown";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFarmer, setIsFarmer] = useState(false);

  // const StateOptions = [
  //   { label: "gujrat", value: "gujrat" },
  //   { label: "mp", value: "mp" },
  //   { label: "up", value: "up" },
  // ];
  const StateOptions = [
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "West Bengal", value: "West Bengal" },
    {
      label: "Andaman and Nicobar Islands",
      value: "Andaman and Nicobar Islands",
    },
    { label: "Chandigarh", value: "Chandigarh" },
    { label: "Dadra and Nagar Haveli", value: "Dadra and Nagar Haveli" },
    { label: "Daman and Diu", value: "Daman and Diu" },
    { label: "Delhi", value: "Delhi" },
    { label: "Lakshadweep", value: "Lakshadweep" },
    { label: "Puducherry", value: "Puducherry" },
  ];

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email: email,
          fullName: fullName,
          state: state,
          isFarmer: isFarmer,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Login");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/register.webp")}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Dropdown
          style={styles.input}
          data={StateOptions}
          search
          labelField="label"
          valueField="value"
          value={state}
          onChange={(item) => {
            setState(item.value);
          }}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.isFarmer}>
          <Text style={[{ justifyContent: "center", alignItems: "center" }]}>
            Are you a farmer ?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isFarmer ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={() => setIsFarmer(!isFarmer)}
            value={isFarmer}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
