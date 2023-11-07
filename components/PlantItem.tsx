import { View, Text } from "react-native";
import React, { FC } from "react";
import { AirbnbRating, Button, Card } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Course } from "../db";
import { theme } from "../styles/theme";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useAppContext } from "../context/Context";

interface PlantItemProps {
  item: Course;
  type: "normal" | "favourite";
}

const PlantItem: FC<PlantItemProps> = ({ item, type }) => {
  const { favourites,addData, deleteData } = useAppContext();

  const isFavourite = favourites.includes(
    favourites.find((p) => p.sectionName === item?.sectionName) || ({} as Course),
    0
  );
  return (
    <Card>
      {item.isMainTask && 
      <View style={{
        position: "absolute", 
        bottom: 0, right: -25, backgroundColor: "red",
        padding: 5,
        paddingHorizontal: 16
        }}>
        <Text style={{color: "white", fontWeight: "500"}}>Main Task</Text>
        </View>}
      <TouchableOpacity onPress={() => router.push(`/${item.sectionName}`)}>
        <Text
          style={{
            color: theme.lightColors?.primary,
            fontWeight: "700",
            fontSize: 17,
          }}
        >{`${item.sectionName}`}</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            color: theme.lightColors?.primary,
            fontWeight: "700",
            fontSize: 17,
          }}
        >{`Duration: ${item.duration}h`}</Text>

        <View
          style={{
            marginTop: 2,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          
          {!isFavourite ? (
            <Button
              color="secondary"
              containerStyle={{
                borderColor: theme.lightColors?.secondary,
                borderRadius: 10,
              }}
              onPress={() => addData(item)}
              icon={<FontAwesome name="heart" color="red" />}
            />
          ) : (
            <Button
              color="secondary"
              containerStyle={{
                borderColor: theme.lightColors?.secondary,
                borderRadius: 10,
              }}
              onPress={() => deleteData(item)}
              size="lg"
              icon={<FontAwesome name="remove" color="#00A335" />}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

export default PlantItem;
