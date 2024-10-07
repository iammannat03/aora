import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";

import {
  getUserPosts,
  searchPosts,
  signOut,
} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { TouchableOpacity } from "react-native";
import icons from "../../constants/icons";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } =
    useGlobalContext();
  const { data: posts } = useAppwrite(() =>
    getUserPosts(user.$id)
  );

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <View className="w-full items-end">
              <TouchableOpacity
                className=" mb-10"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="flex-row mt-5">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Profile;

const data = [
  {
    $collectionId: "66fcfed10033c1a46bf6",
    $createdAt: "2024-10-02T14:41:49.015+00:00",
    $databaseId: "66fcfeb4001a514169d4",
    $id: "66fd5bac0019db2357aa",
    $permissions: [
      'read("user:66fd5baa00194b668886")',
      'update("user:66fd5baa00194b668886")',
      'delete("user:66fd5baa00194b668886")',
    ],
    $updatedAt: "2024-10-02T14:41:49.015+00:00",
    accountId: "66fd5baa00194b668886",
    avatar:
      "https://cloud.appwrite.io/v1/avatars/initials?name=mannat&project=66fcfd280025bc957de9",
    email: "mannat@gmail.com",
    username: "mannat",
  },
  {
    $collectionId: "66fcfed10033c1a46bf6",
    $createdAt: "2024-10-02T14:41:49.015+00:00",
    $databaseId: "66fcfeb4001a514169d4",
    $id: "66fd5bac0019db2357aa",
    $permissions: [
      'read("user:66fd5baa00194b668886")',
      'update("user:66fd5baa00194b668886")',
      'delete("user:66fd5baa00194b668886")',
    ],
    $updatedAt: "2024-10-02T14:41:49.015+00:00",
    accountId: "66fd5baa00194b668886",
    avatar:
      "https://cloud.appwrite.io/v1/avatars/initials?name=mannat&project=66fcfd280025bc957de9",
    email: "mannat@gmail.com",
    username: "mannat",
  },
];
