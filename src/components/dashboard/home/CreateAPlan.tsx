import React, { useState } from 'react';

interface Course {
    name: string;
    quarter: string;
}

const CreatePlan: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseName, setCourseName] = useState('');
    const [quarter, setQuarter] = useState('');

    const addCourse = () => {
        const newCourse: Course = {
            name: courseName,
            quarter: quarter,
        };
        setCourses([...courses, newCourse]);
        setCourseName('');
        setQuarter('');
    };

    return (
        <div>
            <h1>Create Course Plan</h1>
            <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
            />
            <input
                type="text"
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                placeholder="Quarter"
            />
            <button onClick={addCourse}>Add Course</button>

            <h2>Course Plan</h2>
            {courses.map((course, index) => (
                <div key={index}>
                    <p>{course.name}</p>
                    <p>{course.quarter}</p>
                </div>
            ))}
        </div>
    );
};

export default CreatePlan;
