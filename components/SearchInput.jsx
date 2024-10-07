import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import icons from "../constants/icons";
import images from "../constants/images";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="flex-row items-center w-full h-16 px-4 bg-black-100 border rounded-2xl focus:border-secondary space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results accross database"
            );
          }
          if (pathname.startsWith("/search"))
            router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className="h-5 w-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
