import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { AuthContext } from "@/components/auth/AuthContext";
import { supabase } from "@/lib/supbase";
import { useRouter } from "expo-router";
// Define los tipos de tabs disponibles
type TabType = "login" | "register";

// Ajusta esto según el tipo de rutas que tengas en tu app
type RootStackParamList = {
  Perfil: undefined;
};

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>("login");

  // Login
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  // Register
  const [registerName, setRegisterName] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const handleLogin = async () => {
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      await signIn(loginEmail, loginPassword);
      router.push("/");
    } catch (error: any) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = async () => {
    setRegisterError("");

    if (!registerName || !registerEmail || !registerPassword) {
      setRegisterError("Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            full_name: registerName,
            nickname: registerEmail.split("@")[0],
          },
        },
      });

      if (error) {
        throw error;
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      setRegisterError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>D</Text>
        </View>
        <Text style={styles.title}>Derivatto</Text>
        <Text style={styles.subtitle}>Aprende matemáticas jugando</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "login" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("login")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "login" && styles.tabButtonTextActive,
            ]}
          >
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "register" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("register")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "register" && styles.tabButtonTextActive,
            ]}
          >
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>

      {/* Forms */}
      {activeTab === "login" ? (
        <LoginForm
          email={loginEmail}
          error={loginError}
          password={loginPassword}
          showPassword={showPassword}
          isLoading={isLoading}
          onEmailChange={setLoginEmail}
          onPasswordChange={setLoginPassword}
          onTogglePassword={setShowPassword}
          onSubmit={handleLogin}
        />
      ) : (
        <RegisterForm
          isLoading={isLoading}
          name={registerName}
          onNameChange={setRegisterName}
          email={registerEmail}
          onEmailChange={setRegisterEmail}
          password={registerPassword}
          onPasswordChange={setRegisterPassword}
          showPassword={showPassword}
          onTogglePassword={setShowPassword}
          error={registerError}
          onSubmit={handleRegister}
        />
      )}

      <Text style={styles.footer}>
        © {new Date().getFullYear()} Derivatto. Todos los derechos reservados.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ec4899", // pink-600
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  logoText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: "#fde7f2", // pink-50
  },
  tabButtonText: {
    color: "#4b5563", // gray-700
    fontWeight: "500",
  },
  tabButtonTextActive: {
    color: "#ec4899", // pink-600
    fontWeight: "700",
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 40, // Deja espacio para el ícono
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
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  separatorText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
  },
  termsText: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 10,
    textAlign: "justify",
  },
  footer: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 12,
    marginTop: 30,
  },
});
