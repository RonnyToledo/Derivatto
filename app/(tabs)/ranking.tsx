import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
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
import { AuthContext } from "@/components/auth/AuthContext";
import { getLevelInfo } from "@/functions/getLevelInfo";
import { Link } from "expo-router";
import ScrollViewReload from "@/components/ScrollViewReload";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    <ScrollViewReload
      style={{ flex: 1, width: width, height: height }}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.listContainer}>
        {sortedRanking.map((player, index) => (
          <UserRankCard
            nickname={player?.nickname ?? 0}
            key={player.id}
            rank={index + 1}
            name={player.full_name}
            score={player.puntuation}
            level={getLevelInfo(player.puntuation).currentLevel}
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
            nickname={user?.nickname ?? 0}
            rank={user?.position ?? 0}
            name={user?.full_name ?? ""}
            score={user?.puntuation ?? 0}
            level={getLevelInfo(user?.puntuation).currentLevel ?? 0}
            avatar={user?.image ?? ""}
            isCurrentUser={true}
          />
        </View>
      )}
    </ScrollViewReload>
  );
}

// Ranking global
function FirstRoute() {
  const { user, users } = useContext(AuthContext);

  return users.length > 1 && user ? (
    <RankingList title="Top 10 Jugadores" rankingData={users} user={user} />
  ) : (
    <NoRanking />
  );
}

// Ranking de amigos
function SecondRoute() {
  const { user, friendUsers } = useContext(AuthContext);
  return friendUsers.length > 1 && user ? (
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
          tabStyle={{ borderRadius: 32 }}
          indicatorStyle={{
            backgroundColor: "#FF981C",
            height: "100%",
            borderRadius: 32,
          }}
          style={{ backgroundColor: "#F2EAE1", borderRadius: 32, margin: 20 }}
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
  nickname: string;
  isCurrentUser: boolean;
}
function UserRankCard({
  rank,
  name,
  score,
  level,
  avatar,
  nickname,
  isCurrentUser,
}: UserRankCardProps) {
  // Función memorizada para determinar el icono de posición
  const getRankIcon = (position: number) => {
    const size = 24;
    if (position === 1) {
      return (
        <Ionicons
          name="medal"
          size={size}
          color="gold"
          style={styles.headerIcon}
        />
      );
    } else if (position === 2) {
      return (
        <Ionicons
          name="medal"
          size={size}
          color="silver"
          style={styles.headerIcon}
        />
      );
    } else if (position === 3) {
      return (
        <Ionicons
          name="medal"
          size={size}
          color="#995204"
          style={styles.headerIcon}
        />
      );
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
          <Image
            source={
              avatar
                ? {
                    uri: avatar,
                  }
                : require("@/assets/Icons/Icons/PNG/user.png")
            }
            style={styles.avatar}
          />
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Link
            href={isCurrentUser ? "/perfil" : `/user/${nickname}`}
            style={[styles.playerName, isCurrentUser && styles.currentUserName]}
          >
            {name}
          </Link>
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
  container: { flex: 1, backgroundColor: "#F2EAE1" },
  tabContainer: { maxWidth: 400, width: "100%" },
  scrollContent: {
    maxWidth: 400,
    width: "100%",
    padding: 10,
    paddingBottom: 32,
  },
  routeContainer: { padding: 16, height: "100%" },
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
    borderRadius: 20,
    borderWidth: 1,
    padding: 7,
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
  headerIcon: {
    marginHorizontal: 5,
    width: 24,
    height: 24,
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
    backgroundColor: "#FF981C",
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
