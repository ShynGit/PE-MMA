import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Course } from "../db";
import { getAllCategories, getAllCourseFromDb } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

interface AppContextType {
  categories: string[];
  courses: Course[];
  favourites: Course[];
  addData: (course: Course) => Promise<void>;
  deleteData: (course: Course) => Promise<void>;
  deleteAll: () => Promise<void>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext<AppContextType>(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [categories] = useState<string[]>(getAllCategories());
  const [courses] = useState<Course[]>(getAllCourseFromDb());
  const [favourites, setFavourites] = useState<Course[]>([]);

  const deleteAll = async () => {
    try {
      if (favourites.length > 1) {
        setFavourites([]);
        await AsyncStorage.setItem("favourites", JSON.stringify([]));
      }
    } catch (error) {}
  };

  const getData = async () => {
    let data = await AsyncStorage.getItem("favourites");

    if (data === null) {
      data = JSON.stringify([]);
      setFavourites([]);
      await AsyncStorage.setItem("favourites", data);
    }
    const favourites = JSON.parse(data);
    setFavourites(favourites);
  };

  const addData = async (course: Course) => {
    try {
      const fav = favourites?.find((item) => item.sectionName === course.sectionName);
      
      if (fav) {
        // Toast.show(`${fav.course} already in favourite`, {
        //   duration: Toast.durations.SHORT,
        // });

        return;
      }
      setFavourites((prev) => {
        const newValue = [...prev!, course];
        AsyncStorage.setItem("favourites", JSON.stringify(newValue));
        // Toast.show(`${course.sectionName} added successfully`, {
        //   duration: Toast.durations.SHORT,
        // });
        return newValue;
      });
    } catch (error) {}
  };
  const deleteData = async (course: Course) => {
    try {
      setFavourites((prev) => {
        const fav = favourites?.filter((item) => item.sectionName !== course.sectionName);
        AsyncStorage.setItem("favourites", JSON.stringify(fav));
        // Toast.show(`${course.sectionName} deleted successfully`, {
        //   duration: Toast.durations.SHORT,
        // });
        return fav;
      });
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    // @ts-ignore
    <AppContext.Provider
      value={{ courses, categories, favourites, addData, deleteData, deleteAll }}
    >
      {children}
    </AppContext.Provider>
  );
}
