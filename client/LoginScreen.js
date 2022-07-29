import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  
  // StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";

import { db } from "./firebase";
// const auth = getAuth();

const LoginScreen = ({ navigation }) => {
  const opRef = db.collection('Operations')
  // useEffect(() => {
  // 	const unsubscribe  = auth.onAuthStateChanged((user) => {
  // 		if (user) {
  // 			navigation.push('ProfileScreen');
  // 		}
  // 	});
  // 	return unsubscribe;
  // } , []);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const handleLogin = async () => {
    console.log('hi');
    const data = await opRef.get();
    const dataArray = data.docs.map((doc) => doc.data());
    console.log(dataArray,'data');
    if(dataArray[0].userID == email.trim() && dataArray[0].Password ==  password.trim()) {
      navigation.push('Drawer')
    } else {
      setError('Wrong userID or Password')
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Bumaas-Operations</Text>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Enter your ID"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="Enter your Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
       
        <Text style={styles.error}>{error}</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ fontWeight: "bold", color: "#609BEB" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  forgot: {
    color: "#609BEB",
  },
  error: {
    color: "red",
    marginVertical: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#609BEB",
    width: "85%",
    marginBottom: 20,
    borderRadius: 30,
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
  },
  button: {
    // backgroundColor: 'blue',
    borderWidth: 3,
    borderColor: "#609BEB",
    padding: 15,
    width: "30%",
    // textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    color: "white",
  },
  text: {
    marginTop: 10,
    color: "red",
  },
});
