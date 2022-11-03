export interface RawCourse {
    course_id: string;
    course_author: string;
    course_title: string;
    course_description: string;
    course_start_date: string;
    course_end_date: string;
}

export interface Course {
    courseId: string;
    courseAuthor: string;
    courseTitle: string;
    courseDescription: string;
    courseDate: {
        startDate: Date;
        endDate: Date;
    };
}
