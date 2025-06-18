import { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        fullName,
        userName,
        age,
      });

      router.replace("/tabs/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine Assistant</Text>

      <View style={styles.signupContainer}>
        <Text style={styles.createAccountText}>Create an account</Text>
        <Text style={styles.subtitle}>Enter your details to sign uo</Text>


      <TextInput
          placeholder="Full Name"
          onChangeText={setFullName}
          value={fullName}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Age"
          onChangeText={setAge}
          value={age}
          keyboardType="numeric"
          style={styles.inputField}
        />
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          style={styles.inputField}
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.inputField}
        />
      
      <TouchableOpacity 
      onPress={handleSignup}
      style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      {error ? <Text style={{ color: "red", marginTop: 10 }}>{error}</Text> : null}
      <TouchableOpacity onPress={() => router.replace("/auth/login")}>
      <Text style={styles.termsText1}>
      Already have an account?{' '}
          <Text style={styles.linkText1}>Login</Text> 
          
        </Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.separator} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.separator} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
        <AntDesign name="google" size={24} />
          <Text style={styles.socialButtonText}>
             {" Continue with Google"}
          </Text>
        </TouchableOpacity>


        <Text style={styles.termsText}>
          By clicking continue, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A03037',
    marginBottom: 40,
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputField: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#A0280B',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  socialButtonText: {
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#A03037',
  },
  termsText1: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText1: {
    color: '#A0280B',
  },
});


    