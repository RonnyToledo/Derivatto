import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Email from "@/assets/Icons/Icons/SVG/email.svg";
import Password from "@/assets/Icons/Icons/SVG/password.svg";
import Password_hide from "@/assets/Icons/Icons/SVG/password_hide.svg";
import Password_show from "@/assets/Icons/Icons/SVG/password_show.svg";
import Forward from "@/assets/Icons/Icons/SVG/forward.svg";

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
      <View style={stylesLogin.inputContainer}>
        <Email color="#5F2641" style={stylesLogin.inputIcon} />
        <TextInput
          style={stylesLogin.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={onEmailChange}
          editable={!isLoading}
        />
      </View>

      <View style={stylesLogin.inputContainer}>
        <Password color="#5F2641" style={stylesLogin.inputIcon} />
        <TextInput
          style={stylesLogin.input}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={onPasswordChange}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={stylesLogin.showPasswordButton}
          onPress={() => onTogglePassword(!showPassword)}
          disabled={isLoading}
        >
          {showPassword ? (
            <Password_show color="#5F2641" style={stylesLogin.inputIcon} />
          ) : (
            <Password_hide color="#5F2641" style={stylesLogin.inputIcon} />
          )}
        </TouchableOpacity>
      </View>

      {error ? <Text style={stylesLogin.errorText}>{error}</Text> : null}

      <TouchableOpacity>
        <Text style={stylesLogin.forgotPasswordText}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[stylesLogin.button, isLoading && stylesLogin.buttonDisabled]}
        onPress={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
            <Text style={stylesLogin.buttonText}>Iniciando sesión...</Text>
          </>
        ) : (
          <>
            <Text style={stylesLogin.buttonText}>Iniciar Sesión</Text>
            <Forward
              color="#5F2641"
              style={[stylesLogin.inputIcon, { paddingLeft: 5 }]}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

export const stylesLogin = StyleSheet.create({
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#5F2641",
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputIcon: {
    width: 15,
    height: 15,
    paddingRight: 5,
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
    color: "#FFB580",
    marginBottom: 10,
    textDecorationLine: "underline",
    fontSize: 13,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FFB580",
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
    fontSize: 16,
    color: "#5F2641",
  },
  termsText: {
    fontSize: 12,
    color: "#5F2641",
    marginBottom: 10,
    textAlign: "justify",
  },
});
