import {
  AirbnbRating,
  Button,
  FAB,
  Image,
  Text,
  makeStyles,
} from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCourseByName } from "../utils";
import { View } from "react-native";
import { theme } from "../styles/theme";
import { useAppContext } from "../context/Context";
import { Course } from "../db";

export default function Page() {
  const { id } = useLocalSearchParams();
  const styles = useStyles();
  const { favourites, addData, deleteData } = useAppContext();
  const plant = getCourseByName(id as string);

  const isFavourite = favourites.includes(
    favourites.find((p) => p.sectionName === plant?.sectionName) || ({} as Course),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={styles.title}>
        {id}
      </Text>
      
      
      <Text style={{ marginTop: 10 }}>
        {plant?.sectionDescription}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Duration: </Text>
        <FAB
          title={`${plant?.duration}h`}
          color={theme.lightColors?.primary}
          size="small"
          style={{
            width: 100,
            height: 50,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Priority: </Text>
        {plant?.isMainTask ? <View style={{
           backgroundColor: "red",
          padding: 5,
          paddingHorizontal: 16,
          marginLeft: 10
        }}>
          <Text style={{ color: "white", fontWeight: "500" }}>Main Task</Text>
        </View> : <View style={{marginLeft: 10}}><Text style={{fontWeight: "500"}}>Not a main task</Text></View>}
        
      </View>
      
      
      
      {/* <Button title="Back" onPress={() => addData(plant || ({} as Plant))} /> */}
      <View style={{paddingVertical: 20}}>
      {isFavourite ? (
        <Button
          title="Unfavorite"
          radius={20}
          onPress={() => deleteData(plant || ({} as Course))}
        />
      ) : (
        <Button title="Favorite" 
            radius={20}
        onPress={() => addData(plant || ({} as Course))} />
        )}</View>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "800",
    textAlign: "center",
  },
}));
