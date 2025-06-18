import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";




export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#A0280B", 
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          switch (route.name) {
            case "index":
              iconName = "home";
              break;
            case "history/index":
              iconName = "time";
              break;
            case "refills/index":
              iconName = "refresh";
              break;
            case "calendar/index":
              iconName = "calendar";
              break;
            case "medications/add":
              iconName = "add-circle";
              break;
            case "profile/index":
              iconName="person-circle-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="history/index" options={{ title: "History" }} />
      <Tabs.Screen name="refills/index" options={{ title: "Refills" }} />
      <Tabs.Screen name="calendar/index" options={{ title: "Calendar" }} />
      <Tabs.Screen name="medications/add" options={{ title: "Add" }} />
      <Tabs.Screen name="profile/index" options={{ title: "Profile"}}/>
    </Tabs>
  );
}
