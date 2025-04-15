import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  email: string;
  error: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onTogglePassword: (boolean: boolean) => void;
  onSubmit: () => void;
};

export default function LoginForm({
  email,
  password,
  showPassword,
  error,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: Props) {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={onEmailChange}
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={onPasswordChange}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => onTogglePassword(!showPassword)}
          disabled={isLoading}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Iniciando sesión...</Text>
          </>
        ) : (
          <>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 40,
  },
  inputIcon: {
    position: "absolute",
    left: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 40,
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    padding: 4,
  },
  errorText: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "#ec4899",
    marginBottom: 10,
    textDecorationLine: "underline",
    fontSize: 13,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#ec4899",
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
