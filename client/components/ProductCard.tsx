import { COLORS } from "@/assets/constants";
import { ProductCardProps } from "@/assets/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Link href={`/product/${product._id}`} asChild>
      <View className="w-[48%] mb-4 bg-white rounded-lg overflow-hidden">
        {/* Image Container */}
        <View className="relative h-64 w-full bg-gray-100">
          <Image
            source={{ uri: product.images[0] }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Like Button */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm"
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? COLORS.accent : COLORS.primary}
            />
          </TouchableOpacity>

          {/* Featured Badge */}
          {product.isFeatured && (
            <View className="absolute top-2 left-2 bg-black px-2 py-1 rounded">
              <Text className="text-white text-xs font-bold uppercase">
                Featured
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="p-3">
          <View className="flex-row items-center">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="text-secondary text-xs ml-1">4.6</Text>
          </View>

          <Text numberOfLines={1} className="text-primary font-semibold mt-1">
            {product.name}
          </Text>

          <Text className="text-black font-bold mt-1">₹{product.price}</Text>
        </View>
      </View>
    </Link>
  );
}
