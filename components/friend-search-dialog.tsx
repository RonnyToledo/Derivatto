import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Search, UserPlus, UserCheck, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import ModalComponent from "./global/modal";
import { supabase } from "@/lib/supbase";
import { AuthContext } from "@/components/auth/AuthContext";

// Definir el tipo para los usuarios de la búsqueda
interface User {
  id: string;
  name: string;
  username: string;
  level: number;
  avatar: string;
  status: "nada" | "pendiente_env" | "pendiente_rec" | "aceptada";
  idAmistad?: string;
}

interface FriendSearchDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

// Función para buscar usuarios en la tabla "profiles" de Supabase
const fetchSearchResults = async (
  query: string,
  id: string
): Promise<User[]> => {
  if (query.trim() === "") return [];

  // Se usa ILIKE para búsqueda sin distinción de mayúsculas/minúsculas
  const { data: users, error: usersErr } = await supabase
    .from("profiles")
    .select("id, full_name, image, nickname, puntuation")
    .ilike("full_name", `%${query}%`)
    .neq("id", id);

  if (usersErr) {
    console.error(usersErr);
    return [];
  }

  const ids = users.map((u) => u.id).join(",");
  if (!ids) {
    return [];
  }

  // Traer todas las amistades entre el usuario actual y los encontrados
  const { data: requests, error: reqErr } = await supabase
    .from("amistades")
    .select("id_usuario_solicitante, id_usuario_receptor, estado, id_amistad")
    .or(
      `and(id_usuario_solicitante.eq.${id},id_usuario_receptor.in.(${ids})),` +
        `and(id_usuario_receptor.eq.${id},id_usuario_solicitante.in.(${ids}))`
    );

  if (reqErr) {
    console.error(reqErr);
    return [];
  }

  // Fusionar información para determinar el estado de la amistad
  const merged = users.map((u) => {
    const req = requests.find(
      (r) =>
        (r.id_usuario_solicitante === id && r.id_usuario_receptor === u.id) ||
        (r.id_usuario_receptor === id && r.id_usuario_solicitante === u.id)
    );
    let friendStatus: User["status"] = "nada";
    if (req) {
      if (req.estado === "pendiente") {
        friendStatus =
          req.id_usuario_solicitante === id ? "pendiente_env" : "pendiente_rec";
      } else if (req.estado === "aceptada") {
        friendStatus = "aceptada";
      }
    }
    return {
      ...u,
      status: friendStatus,
      idAmistad: req?.id_amistad,
    };
  });

  // Mapear los datos al tipo definido User
  return merged.map((user: any) => ({
    id: user.id,
    name: user.full_name,
    username: user.nickname,
    level: user.level || 0,
    avatar: user.image,
    status: user.status || "nada",
    idAmistad: user.idAmistad,
  }));
};

export default function FriendSearchDialog({
  open,
  onOpenChange,
}: FriendSearchDialogProps) {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = async () => {
    setIsSearching(true);
    const results = await fetchSearchResults(searchQuery, user?.id || "");
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <ModalComponent
      title="Amistades"
      onOpenChange={() => onOpenChange(false)}
      open={open}
    >
      {/* Header */}
      <Text style={styles.title}>Buscar amigos</Text>
      <Text style={styles.subtitle}>
        Encuentra personas y envía solicitudes de amistad
      </Text>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o usuario..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Resultados de búsqueda */}
      <View style={styles.resultsContainer}>
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ff4081" />
          </View>
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FriendItem
                item={item}
                userID={user?.id || ""}
                setSearchResult={setSearchResults}
                searchResults={searchResults}
                onOpenChange={onOpenChange}
              />
            )}
          />
        ) : (
          <View style={styles.noResults}>
            <X size={50} color="#ccc" />
            <Text style={styles.noResultsText}>
              No se encontraron resultados para "{searchQuery}"
            </Text>
          </View>
        )}
      </View>
    </ModalComponent>
  );
}

interface FriendItemProps {
  item: User;
  userID: string;
  searchResults: User[];
  setSearchResult: (value: User[]) => void;
  onOpenChange: (value: boolean) => void;
}

function FriendItem({
  item,
  userID,
  searchResults,
  setSearchResult,
  onOpenChange,
}: FriendItemProps) {
  const router = useRouter();
  const { SolicitudChange, DeleteSolicitud, NewSolicitud } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Funciones para actualizar la lista de usuarios de forma inmutable
  const updateItemStatus = (
    userId: string,
    idAmistad: string,
    newStatus: User["status"]
  ) => {
    setSearchResult(
      searchResults.map((obj) =>
        obj.id === userId ? { ...obj, status: newStatus, idAmistad } : obj
      )
    );
  };

  const removeItem = (userId: string) => {
    setSearchResult(searchResults.filter((obj) => obj.id !== userId));
  };

  return (
    <View style={styles.userItem}>
      <TouchableOpacity
        onPress={() => {
          router.push(`/user/${item.username}`);
          onOpenChange(false);
        }}
        style={styles.userData}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userUsername}>@{item.username}</Text>
        </View>
      </TouchableOpacity>

      {/* Botones de acción según el status */}
      {item.status === "nada" && (
        <TouchableOpacity
          style={[styles.addButton, loading && styles.disabledButton]}
          onPress={async () => {
            setLoading(true);
            const value = await NewSolicitud(userID, item.id, "pendiente");
            updateItemStatus(item.id, value?.id_amistad || "", "pendiente_env");
            setLoading(false);
          }}
          disabled={loading}
        >
          <UserPlus size={16} color="white" />
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      )}

      {item.status === "pendiente_env" && (
        <TouchableOpacity
          style={styles.pendienteButton}
          onPress={async () => {
            setLoading(true);
            await DeleteSolicitud(item.idAmistad as string);
            removeItem(item.id);
            setLoading(false);
          }}
          disabled={loading}
        >
          <UserCheck size={16} color="gray" />
          <Text style={styles.pendienteText}>Pendiente</Text>
        </TouchableOpacity>
      )}

      {item.status === "pendiente_rec" && (
        <TouchableOpacity
          style={styles.pendienteButton}
          onPress={async () => {
            setLoading(true);
            const value = await SolicitudChange(
              item?.idAmistad || "",
              "aceptada"
            );
            updateItemStatus(item.id, value?.id_amistad || "", "aceptada");
            setLoading(false);
          }}
          disabled={loading}
        >
          <UserCheck size={16} color="gray" />
          <Text style={styles.pendienteText}>Aceptar</Text>
        </TouchableOpacity>
      )}

      {item.status === "aceptada" && (
        <TouchableOpacity
          style={styles.friendsButton}
          onPress={async () => {
            setLoading(true);
            await DeleteSolicitud(item.idAmistad as string);
            removeItem(item.id);
            setLoading(false);
          }}
          disabled={loading}
        >
          <UserCheck size={16} color="green" />
          <Text style={styles.friendsText}>Amigos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    boxShadow: "0 10px 10px rgba(0,0,0,0.2)",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff4081",
  },
  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  searchButton: {
    backgroundColor: "#ff4081",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "white",
  },
  resultsContainer: {
    marginTop: 10,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userData: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  userUsername: {
    color: "#777",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#ff4081",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    marginLeft: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  pendienteButton: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  friendsButton: {
    flexDirection: "row",
    backgroundColor: "#d1fae5",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  pendienteText: {
    color: "gray",
    fontWeight: "bold",
    marginLeft: 5,
  },
  friendsText: {
    color: "green",
    fontWeight: "bold",
    marginLeft: 5,
  },
  noResults: {
    alignItems: "center",
    marginTop: 20,
  },
  noResultsText: {
    color: "#777",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
