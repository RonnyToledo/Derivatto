import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "@/components/auth/AuthContext";

export default function RankingPage() {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={[styles.tabContainer, { height: height - 80 }]}>
        <TabViewExample />
      </View>
      <View style={{ flexGrow: 1, height: 100 }} />
    </View>
  );
}

/** Componente genérico para mostrar la lista de ranking */
interface RankingListProps {
  title: string;
  rankingData: any[]; // Array de UserProfile
  user: any;
}
function RankingList({ title, rankingData, user }: RankingListProps) {
  // Se ordena la lista sin mutar el array original y se calcula si el usuario está en top 10
  const sortedRanking = useMemo(
    () =>
      rankingData
        ? [...rankingData].sort((a, b) => b.puntuation - a.puntuation)
        : [],
    [rankingData]
  );
  const isUserInTop10 = useMemo(() => (user?.position || 0) < 10, [user]);

  const { width, height } = useWindowDimensions();

  return (
    <ScrollView
      style={{ flex: 1, width: width, height: height }}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.listContainer}>
        {sortedRanking.map((player, index) => (
          <UserRankCard
            key={player.id}
            rank={index + 1}
            name={player.full_name}
            score={player.puntuation}
            level={player.puntuation}
            avatar={player.image}
            isCurrentUser={(isUserInTop10 && player.id === user?.id) || false}
          />
        ))}
      </View>
      {/* Mostrar posición del usuario si no está en el Top 10 */}
      {!isUserInTop10 && user && (
        <View style={styles.userPositionContainer}>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>Tu posición</Text>
          <UserRankCard
            rank={user?.position ?? 0}
            name={user?.full_name ?? ""}
            score={user?.puntuation ?? 0}
            level={user?.puntuation ?? 0}
            avatar={user?.image ?? ""}
            isCurrentUser={true}
          />
        </View>
      )}
    </ScrollView>
  );
}

// Ranking global
function FirstRoute() {
  const { user, users } = useContext(AuthContext);
  return users.length > 0 && user ? (
    <RankingList title="Top 10 Jugadores" rankingData={users} user={user} />
  ) : (
    <NoRanking />
  );
}

// Ranking de amigos
function SecondRoute() {
  const { user, friendUsers } = useContext(AuthContext);
  return friendUsers.length > 0 && user ? (
    <RankingList title="Top 10 Amigos" rankingData={friendUsers} user={user} />
  ) : (
    <NoRanking />
  );
}

// Componente en caso de no haber ranking disponible
const NoRanking = () => (
  <View style={[styles.routeContainer, styles.centerContent]}>
    <AntDesign name="user" size={24} color="black" />
    <Text>Ranking no disponible</Text>
  </View>
);

interface Route {
  key: string;
  title: string;
}

export function TabViewExample() {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    { key: "first", title: "Global" },
    { key: "second", title: "Amigos" },
  ]);

  // Se utiliza SceneMap con la ruta correspondiente
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width }}
      renderTabBar={(
        props: SceneRendererProps & { navigationState: NavigationState<Route> }
      ) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "black" }}
          style={{ backgroundColor: "white" }}
          activeColor="black"
          inactiveColor="gray"
        />
      )}
    />
  );
}

interface UserRankCardProps {
  rank: number;
  name: string;
  score: number;
  level: number;
  avatar: string;
  isCurrentUser: boolean;
}
function UserRankCard({
  rank,
  name,
  score,
  level,
  avatar,
  isCurrentUser,
}: UserRankCardProps) {
  // Función memorizada para determinar el icono de posición
  const getRankIcon = (position: number) => {
    if (position === 1) {
      return <Ionicons name="medal-sharp" size={24} color="yellow" />;
    } else if (position === 2) {
      return <Ionicons name="medal-sharp" size={24} color="gray" />;
    } else if (position === 3) {
      return <Ionicons name="medal-sharp" size={24} color="gold" />;
    } else {
      return (
        <View style={styles.rankCircle}>
          <Text style={styles.rankText}>{position}</Text>
        </View>
      );
    }
  };

  return (
    <View
      style={[
        styles.card,
        isCurrentUser ? styles.currentUserCard : styles.normalCard,
      ]}
    >
      <View style={styles.cardContent}>
        {getRankIcon(rank)}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={[styles.playerName, isCurrentUser && styles.currentUserName]}
          >
            {name}
          </Text>
          <View style={styles.scoreContainer}>
            <AntDesign name="star" size={16} color="yellow" />
            <Text style={styles.scoreText}>{score.toLocaleString()} pts</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tabContainer: { maxWidth: 400, width: "100%" },
  scrollContent: {
    maxWidth: 400,
    width: "100%",
    padding: 10,
    paddingBottom: 32,
  },
  routeContainer: { padding: 16 },
  centerContent: { alignItems: "center", justifyContent: "center" },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 16,
  },
  listContainer: { marginBottom: 16 },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 8,
  },
  divider: { borderTopWidth: 1, borderColor: "#d1d5db", marginVertical: 16 },
  userPositionContainer: { marginTop: 16 },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  currentUserCard: { backgroundColor: "#fce7f3", borderColor: "#fbcfe8" },
  normalCard: { backgroundColor: "#fff", borderColor: "#f3f4f6" },
  cardContent: { flexDirection: "row", alignItems: "center", flex: 1 },
  rankCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: { color: "#374151", fontSize: 12, fontWeight: "bold" },
  avatarContainer: { marginLeft: 12, width: 40, height: 40 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  levelBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#3b82f6",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  levelText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 8,
  },
  playerName: { fontWeight: "600", color: "#374151" },
  currentUserName: { color: "#ec4899" },
  scoreContainer: { flexDirection: "row", alignItems: "center" },
  scoreText: { marginLeft: 4, color: "#6b7280", fontSize: 12 },
});
