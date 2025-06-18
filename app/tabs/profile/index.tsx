import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { auth, db } from "../../../firebase/config";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import React from 'react';
import { Feather, Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from "expo-linear-gradient";

const profileImage = require('@/assets/images/profile.png'); 


export default function ProfileScreen() {
  const user = auth.currentUser;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/auth/login");
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
              colors={["#A0280B", "#7d3c2c"]}
              style={styles.headerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
      <View style={styles.header}>
        <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                  >
                    <Ionicons name="chevron-back" size={28} color="#A0280B" />
                  </TouchableOpacity>
        <TouchableOpacity 
        style={styles.backButton}
        > 
          <Feather name="edit" size={24} color="#A0280B" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.email}>{profile.email}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>06</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem}>
          <Feather name="user" size={20} color="#777" style={styles.optionIcon} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Username</Text>
            <Text style={styles.optionSubText}>@{profile.userName || "your_username"}</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="notifications-outline" size={20} color="#777" style={styles.optionIcon} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Notifications</Text>
            <Text style={styles.optionSubText}>Mute, Push, Email</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="settings-outline" size={20} color="#777" style={styles.optionIcon} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Settings</Text>
            <Text style={styles.optionSubText}>Security, Privacy</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionItem, { marginTop: 20 }]} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#A0280B" style={styles.optionIcon} />
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionText, { color: "#A0280B" }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: Platform.OS === "ios" ? 140 : 120,
    },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
  },
  optionsContainer: {
    marginTop: 30,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  optionSubText: {
    fontSize: 12,
    color: "#999",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});



