import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { AuthContext } from "@/components/auth/AuthContext";
import { supabase } from "@/libs/supabase";
import { useRouter } from "expo-router";
import { Image } from "react-native";

// Define los tipos de tabs disponibles
type TabType = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn } = useContext(AuthContext);
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
    if (user) router.replace("/");
  }, [user, router]);

  const handleLogin = async () => {
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      await signIn(loginEmail, loginPassword);
      router.replace("/");
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
        router.replace("/");
      }
    } catch (error: any) {
      console.error(error);
      setRegisterError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("@/assets/Icons/Logo/PNG/logo_compound.png")}
        />
        <Text style={styles.subtitle}>Aprende matemáticas jugando</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "login" && styles.tabButtonActive,
            {
              borderRightWidth: 1,
              borderRadius: "12px 12px 0px 0px",
            },
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
            {
              borderRadius: "0px 0px 12px 12px",
            },
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
  image: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFB580", // pink-600
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
    color: "#FFB580",
  },
  subtitle: {
    color: "#FFB580",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderColor: "#5F2641",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderColor: "#5F2641",
  },
  tabButtonActive: {
    backgroundColor: "#FFB580", // pink-50
  },
  tabButtonText: {
    color: "#5F2641",
    fontWeight: "500",
  },
  tabButtonTextActive: {
    color: "#5F2641", // pink-600
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
    borderRadius: 12,
    marginBottom: 10,
    paddingLeft: 40, // Deja espacio para el ícono
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    color: "#5F2641",
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
    color: "#5F2641",
    fontSize: 12,
    marginTop: 30,
  },
});
