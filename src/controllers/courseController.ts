import { Request, Response } from "express";
import Course from "../models/courseModel";

// Get all courses or get by categories
export const listCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query;

  try {
    const courses =
      category && category !== "all"
        ? await Course.scan("category").eq(category).exec()
        : await Course.scan().exec();
    res.json({
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching courses",
      error,
    });
  }
};
//get single course
export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;

  try {
    const course = await Course.get(courseId);

    if (!course) {
      res.status(404).json({
        message: "Course not found",
      });
      return;
    }

    res.json({
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching course",
      error,
    });
  }
};
