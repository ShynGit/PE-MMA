import { Button, Text, makeStyles } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import { useAppContext } from "../../context/Context";

import PlantItem from "../../components/PlantItem";
import { Course } from "../../db";
import { useState } from "react";

export default function TabThreeScreen() {
    const styles = useStyles();
    const { courses } = useAppContext();
    const [courseList , setCourseList]= useState<Course[]>(courses);

    const handleOrder = () => {
        const list = courseList?.sort((a, b) => a.duration - b.duration)
        setCourseList(list)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    height: "100%",
                }}
            >
                <Button title="Sort arcending" onPress={() => handleOrder()} />
                <FlatList
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    data={courseList}
                    keyExtractor={(plant) => plant.sectionName}
                    renderItem={({ item }) => <PlantItem item={item} type="normal" />}
                />
            </View>
            {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
        </SafeAreaView>
    );
}

const useStyles = makeStyles((theme) => ({
    list: {
        width: "100%",
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.white,
        paddingVertical: 10
    },
    title: {
        color: theme.colors.primary,
        fontSize: 700,
    },
}));
