import { Button, Text, makeStyles } from "@rneui/themed";
import { Course } from "../../db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import PlantItem from "../../components/PlantItem";
import { useAppContext } from "../../context/Context";

export default function TabTwoScreen() {
  const styles = useStyles();
  const { favourites, deleteAll } = useAppContext();
  return (
    <SafeAreaView style={styles.container}>
      {favourites.length > 1 && (
        <Button onPress={() => deleteAll()} title="delete all" />
      )}
      {favourites?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favourites || []}
          keyExtractor={(plant) => plant.sectionName}
          renderItem={({ item }) => <PlantItem item={item} type="favourite" />}
        />
      ) : (
        <View style={{height: "100%", alignItems: "center", justifyContent: "center"}}>
        <Text h3 style={{ textAlign: "center" }}>
          Favorite list is empty!
            </Text></View>
      )}
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
}));
