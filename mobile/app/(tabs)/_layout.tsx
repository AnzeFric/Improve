import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const pathName = usePathname();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={() => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.light.specialBlue,
          tabBarInactiveTintColor: Colors.light.inactiveIcon,
          sceneStyle: { backgroundColor: Colors.light.background },
          tabBarStyle: {
            height: 60,
            paddingTop: 10,
          },
          // Disables android default onClick ripple effect
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{ borderless: false, color: "transparent" }}
            />
          ),
        })}
        backBehavior="history"
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name={"home"}
                size={28}
                color={
                  pathName.startsWith("/settings")
                    ? Colors.light.specialBlue
                    : color
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="workout"
          options={{
            title: "Workout",
            tabBarIcon: ({ color }) => (
              <Ionicons name={"barbell"} size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Statistics",
            tabBarIcon: ({ color }) => (
              <Ionicons name={"stats-chart"} size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => (
              <Ionicons name={"chatbubbles"} size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
