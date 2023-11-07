import { Categories, Course } from "../db";

export function getAllCourseFromDb() {
  return Categories.reduce((acc, current) => {
    return [...acc, current];
  }, [] as Array<Course>);
}

export function getAllCategories() {
  return Categories.map((cate) => cate.course);
}

export function getCourseByName(name: string) {
  return getAllCourseFromDb().find((item) => item.sectionName === name);
}
