import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      return Alert.alert("Error", "All fields are required.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match.");
    }

    try {
      setLoading(true);
      const response = await axios.post("http://10.21.2.176:3000/api/users/register", {
        name,
        email,
        phone,
        password,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Registered successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");

        router.replace("/passenger/dashboard");
      }
    } catch (error) {
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Something went wrong.");
      } else {
        Alert.alert("Error", "Failed to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Create a Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Re-enter your Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing Up..." : "CREATE AN ACCOUNT"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonOutline}>
        <Text style={styles.googleText}>SIGN UP WITH GOOGLE</Text>
      </TouchableOpacity>

      <Text style={styles.loginPrompt}>
        Already have an account?{" "}
        <Link href={"/Login"}>
          <Text style={styles.loginLink}>Log in</Text>
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  buttonPrimary: {
    backgroundColor: "#4c6ef5",
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonOutline: {
    borderColor: "#4c6ef5",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 12,
    alignItems: "center",
  },
  googleText: {
    color: "#4c6ef5",
    fontWeight: "bold",
  },
  loginPrompt: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    color: "#4c6ef5",
    fontWeight: "bold",
    fontSize: 16,
  },
});
