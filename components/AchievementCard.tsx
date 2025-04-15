import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Progress from "react-native-progress";
import {
  UserPlus2,
  BookOpen,
  Star,
  Trophy,
  Clock,
  CheckCircle,
  Users,
  Share2,
  Sigma,
  ArrowRightLeft,
  TrendingUp,
  Flame,
  LockKeyhole,
  Gauge,
  Shapes,
  DivideSquare,
  Triangle,
  PackageCheck,
  GraduationCap,
  Crosshair,
  MoonStar,
  ClipboardCheck,
  Layers,
  Crown,
} from "lucide-react-native";

interface AchievementCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
}

export default function AchievementCard({
  title,
  description,
  icon,
  progress,
}: AchievementCardProps) {
  const completed = progress == 100;
  return (
    <View style={styles.card}>
      {completed && (
        <View style={styles.completedIcon}>
          <AntDesign name="checkcircle" color="#10B981" size={10} />
        </View>
      )}

      <View style={styles.topRow}>
        <View style={styles.iconContainer}>{icon}</View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>{progress}%</Text>
          {completed && <Text style={styles.completedText}>Completado</Text>}
        </View>
        <Progress.Bar
          progress={progress / 100}
          width={null}
          color={completed ? "#10B981" : "#3B82F6"}
          unfilledColor="#E5E7EB"
          borderWidth={0}
          height={6}
          style={{ borderRadius: 3 }}
        />
      </View>
    </View>
  );
}

const achievements = [
  {
    id: 1,
    title: "Primer Amigo",
    description: "Agrega tu primer amigo",
    icon: <UserPlus2 size={20} color="#3b82f6" />,
    gems: 10,
  },
  {
    id: 2,
    title: "Social",
    description: "Agrega 20 amigos",
    icon: <Users size={20} color="#3b82f6" />,
    gems: 50,
  },
  {
    id: 3,
    title: "Novato del Cálculo",
    description: "Completa tu primera lección",
    icon: <BookOpen size={20} color="#facc15" />,
    gems: 30,
  },
  {
    id: 4,
    title: "Aprendiz del Cálculo",
    description: "Completa 5 lecciones",
    icon: <BookOpen size={20} color="#facc15" />,
    gems: 50,
  },
  {
    id: 5,
    title: "Intermedio del Cálculo",
    description: "Completa 10 lecciones",
    icon: <BookOpen size={20} color="#facc15" />,
    gems: 70,
  },
  {
    id: 6,
    title: "Avanzado del Cálculo",
    description: "Completa 20 lecciones",
    icon: <BookOpen size={20} color="#facc15" />,
    gems: 100,
  },
  {
    id: 7,
    title: "Maestro del Cálculo",
    description: "Completa todas las lecciones",
    icon: <Trophy size={20} color="#ef4444" />,
    gems: 150,
  },
  {
    id: 8,
    title: "Resuelve el Desafío",
    description: "Resuelve 10 problemas sin errores",
    icon: <CheckCircle size={20} color="#34d399" />,
    gems: 80,
  },
  {
    id: 9,
    title: "Ecuación Perfecta",
    description: "Resuelve 50 ecuaciones",
    icon: <Star size={20} color="#fbbf24" />,
    gems: 120,
  },
  {
    id: 10,
    title: "Calculista Rápido",
    description: "Responde un problema en menos de 30 segundos",
    icon: <Clock size={20} color="#60a5fa" />,
    gems: 40,
  },
  {
    id: 11,
    title: "Dedicación",
    description: "Ingresa a la app todos los días por una semana",
    icon: <Trophy size={20} color="#a78bfa" />,
    gems: 60,
  },
  {
    id: 12,
    title: "Persistente",
    description: "Ingresa a la app todos los días por 30 días",
    icon: <Trophy size={20} color="#a78bfa" />,
    gems: 100,
  },
  {
    id: 13,
    title: "Top Scorer",
    description: "Obtén el puntaje más alto en un examen",
    icon: <Star size={20} color="#fbbf24" />,
    gems: 90,
  },
  {
    id: 14,
    title: "Campeón del Cálculo",
    description: "Llega al nivel 10 en el juego",
    icon: <Trophy size={20} color="#ef4444" />,
    gems: 150,
  },
  {
    id: 15,
    title: "Colaborador",
    description: "Comparte tus logros en redes sociales",
    icon: <Share2 size={20} color="#34d399" />,
    gems: 50,
  },
  {
    id: 16,
    title: "Integral Básico",
    description: "Resuelve tu primera integral",
    icon: <Sigma size={20} color="#60a5fa" />,
    gems: 40,
  },
  {
    id: 17,
    title: "Maestro de Límites",
    description: "Completa todos los temas de límites",
    icon: <ArrowRightLeft size={20} color="#ef4444" />,
    gems: 100,
  },
  {
    id: 18,
    title: "Derivadas Perfectas",
    description: "Resuelve 20 derivadas sin errores",
    icon: <TrendingUp size={20} color="#34d399" />,
    gems: 80,
  },
  {
    id: 19,
    title: "Racha de Práctica",
    description: "3 días consecutivos practicando",
    icon: <Flame size={20} color="#f59e0b" />,
    gems: 60,
  },
  {
    id: 20,
    title: "Sin Pistas",
    description: "Resuelve 5 problemas sin usar ayudas",
    icon: <LockKeyhole size={20} color="#3b82f6" />,
    gems: 70,
  },
  {
    id: 21,
    title: "Velocidad Límite",
    description: "Responde 5 preguntas en menos de 1 minuto",
    icon: <Gauge size={20} color="#f43f5e" />,
    gems: 90,
  },
  {
    id: 22,
    title: "Geometría Analítica",
    description: "Completa la sección de geometría",
    icon: <Shapes size={20} color="#8b5cf6" />,
    gems: 110,
  },
  {
    id: 23,
    title: "Factorización Maestra",
    description: "Factoriza 50 ecuaciones complejas",
    icon: <DivideSquare size={20} color="#10b981" />,
    gems: 120,
  },
  {
    id: 24,
    title: "Trigonometría Avanzada",
    description: "Domina las identidades trigonométricas",
    icon: <Triangle size={20} color="#f59e0b" />,
    gems: 100,
  },
  {
    id: 25,
    title: "Coleccionista",
    description: "Obtén todos los logros básicos",
    icon: <PackageCheck size={20} color="#fbbf24" />,
    gems: 200,
  },
  {
    id: 26,
    title: "Tutor Comunitario",
    description: "Ayuda a 10 usuarios en el foro",
    icon: <GraduationCap size={20} color="#3b82f6" />,
    gems: 150,
  },
  {
    id: 27,
    title: "Precisión Absoluta",
    description: "100 respuestas correctas consecutivas",
    icon: <Crosshair size={20} color="#ef4444" />,
    gems: 180,
  },
  {
    id: 28,
    title: "Noche de Estudio",
    description: "Practica después de media noche",
    icon: <MoonStar size={20} color="#6366f1" />,
    gems: 75,
  },
  {
    id: 29,
    title: "Reto Completo",
    description: "Completa un examen de 50 preguntas",
    icon: <ClipboardCheck size={20} color="#10b981" />,
    gems: 130,
  },
  {
    id: 30,
    title: "Aprendizaje Multinivel",
    description: "Alcanza nivel 5 en 3 categorías diferentes",
    icon: <Layers size={20} color="#8b5cf6" />,
    gems: 170,
  },
  {
    id: 31,
    title: "Leyenda del Cálculo",
    description: "Desbloquea todos los logros",
    icon: <Crown size={20} color="#f59e0b" />,
    gems: 500,
  },
];

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: "48%", // Para que quepan dos en fila (ejemplo)
    position: "relative",
  },
  completedIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 10,
  },
  description: {
    fontSize: 8,
    color: "#6B7280",
  },
  progressSection: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
  },
  completedText: {
    fontSize: 12,
    color: "#10B981",
  },
});
