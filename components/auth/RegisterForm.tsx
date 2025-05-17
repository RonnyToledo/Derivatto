import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { stylesLogin } from "./LoginForm";
import Email from "@/assets/Icons/Icons/SVG/email.svg";
import Password from "@/assets/Icons/Icons/SVG/password.svg";
import Password_hide from "@/assets/Icons/Icons/SVG/password_hide.svg";
import Password_show from "@/assets/Icons/Icons/SVG/password_show.svg";
import Forward from "@/assets/Icons/Icons/SVG/forward.svg";
import Username from "@/assets/Icons/Icons/SVG/username.svg";

type Props = {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  error: string;
  isLoading: boolean;
  onNameChange: (text: string) => void;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onTogglePassword: (boolean: boolean) => void;

  onSubmit: () => void;
};

export default function RegisterForm({
  name,
  email,
  password,
  showPassword,
  error,
  isLoading,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: Props) {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={stylesLogin.inputContainer}>
        <Username color="#5F2641" style={stylesLogin.inputIcon} />
        <TextInput
          style={stylesLogin.input}
          placeholder="Nombre completo"
          value={name}
          onChangeText={onNameChange}
          editable={!isLoading}
        />
      </View>

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

      <Text style={stylesLogin.termsText}>
        Al registrarte, aceptas nuestros Términos de Servicio y Política de
        Privacidad.
      </Text>

      <TouchableOpacity
        style={[stylesLogin.button, isLoading && stylesLogin.buttonDisabled]}
        onPress={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
            <Text style={stylesLogin.buttonText}>Creando cuenta...</Text>
          </>
        ) : (
          <>
            <Text style={stylesLogin.buttonText}>Crear Cuenta</Text>
            <Forward color="#5F2641" style={stylesLogin.inputIcon} />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
