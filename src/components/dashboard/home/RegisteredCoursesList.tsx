import React from 'react';

const RegisteredCoursesList: React.FC = () => {
    const courses = [
        { courseName: "Christianity in America", sectionName: "THEO 3303 - 21577", time: "9:00 AM - 10:30 AM" },
        { courseName: "Software Engineering II", sectionName: "CSC 4152 - 21382", time: "11:00 AM - 12:30 PM" },
        { courseName: "Computer Science Internship Review", sectionName: "CSC 4941 - 20740", time: "1:00 PM - 2:30 PM" },
        { courseName: "Global and Urban Ministry", sectionName: "THE O2620 - 21585", time: "3:00 PM - 4:30 PM" },
    ];

    return (
        <div className='bg-gray-100 dark:bg-slate-800 p-4'> {/* Add padding to the container */}
            <div className="text-2xl font-bold mb-4">Registered Courses</div>
            {courses.map((course, index) => (
                <div key={index} className="card bg-white mb-4 rounded overflow-hidden shadow-lg"> {/* Add margins, rounding, and shadows to the cards */}
                    <div className="card-body p-6"> {/* Add padding to the card-body */}
                        <h5 className="card-title text-lg font-semibold mb-2">{course.courseName}</h5> {/* Adjust font size and margin as needed */}
                        <p className="card-text mb-1">Section: {course.sectionName}</p> {/* Adjust margin as needed */}
                        <p className="card-text">Time: {course.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RegisteredCoursesList;
