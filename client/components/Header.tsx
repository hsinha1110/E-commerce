import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { HeaderProps } from "@/assets/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/constants";
import { useRouter } from "expo-router";

export default function Header({
  title,
  showBack,
  showSearch,
  showCart,
  showMenu,
  showLogo,
  itemCount = 0,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      {/* LEFT */}
      <View className="flex-row items-center w-16">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showMenu && (
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* CENTER */}
      <View className="flex-1 items-center">
        {showLogo ? (
          <Image
            source={require("@/assets/logo.png")}
            style={{ width: 120, height: 24 }}
            resizeMode="contain"
          />
        ) : (
          title && (
            <Text className="text-xl font-bold text-primary">{title}</Text>
          )
        )}
      </View>

      {/* RIGHT */}
      <View className="flex-row items-center w-16 justify-end gap-3">
        {showSearch && (
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showCart && (
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/cart");
            }}
          >
            <View className="relative">
              <Ionicons name="bag-outline" size={24} color={COLORS.primary} />

              {/* CART COUNT BADGE */}
              <View className="absolute -top-1 -right-1 bg-accent w-4 h-4 rounded-full items-center justify-center">
                <Text className="text-white text-[10px] font-bold">
                  {itemCount}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
