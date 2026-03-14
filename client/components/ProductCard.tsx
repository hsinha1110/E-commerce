import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ProductCardProps } from "@/assets/constants/types";
import { Link } from "expo-router";

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product._id}`} asChild>
      {/* Image */}
      <TouchableOpacity className="w-[48%] mb-4 bg-white rounded-lg overflow-hidden">
        <View className="relative h-64 w-full bg-gray-100">
          <Image
            source={{ uri: product.images[0] }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </Link>
  );
}
