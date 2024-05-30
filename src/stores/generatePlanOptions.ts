// // points_grade: function that returns the 4.0 grade from a letter grade
let points_grade = function (letter_grade: any) {
  if (isNaN(letter_grade)) {
    switch (letter_grade) {
      case "A":
        return 4.0;
      case "A-":
        return 3.7;
      case "B+":
        return 3.3;
      case "B":
        return 3.0;
      case "B-":
        return 2.7;
      case "C+":
        return 2.3;
      case "C":
        return 2.0;
      case "C-":
        return 1.7;
      case "D+":
        return 1.3;
      case "D":
        return 1.0;
      case "E":
        return 0.0;
      default:
        return null;
    }
  } else {
    return letter_grade;
  }
};

interface Enrollment {
  course_id: string;
  grade: string;
  credits: number;
}

interface Field {
  student_field_id: number;
  requirements: Requirement[];
}

interface Requirement {
  credits_required: number;
  courses: Course[];
}

interface Course {
  course_id: string;
  credits: number;
}


// selected_fields: list of student_field_field_id integers selected by the user
// repeated_courses: list of course_id strings that the user does not consider completed
export function generatePlanOptions(
  fields: any,
  selected_fields: any,
  repeated_courses: any,
  current_enrollments: any,
  past_enrollments: any,
  completed_credits: any
) {
  let plan_options = [];
  let mandatory_courses = new Set();
  let completed_courses = new Set();

  // courses with a grade of 2.0 or higher are added to completed_courses
  for (let enrollment of past_enrollments) {
    if (points_grade(enrollment.grade) >= 2.0 && !repeated_courses.includes(enrollment.course_id)) {
      completed_courses.add(enrollment.course_id);
    }
  }

  // courses not marked to be repeated are add to completed_courses
  for (let enrollment of current_enrollments) {
    if (!repeated_courses.includes(enrollment.course_id)) {
      completed_courses.add(enrollment.course_id);
      completed_credits += enrollment.credits;
    }
  }

  // fields not in selected_fields are removed
  let filteredFields = fields.filter((field: any) =>
    selected_fields.includes(field)
  );

  // Courses of requirements with required credits equal to total credits available are considered mandatory
  // Requirements that are not completed are added to plan_options

  for (let field_requirements of filteredFields) {
    // loop through each slected field
    for (let requirement of field_requirements.requirements) {
      // loop through each requirement of the field
      let curr_option = [];
      let requirement_completed = false;
      let requirement_total_credits = 0;
      let requirement_required_credits = 0;
      for (let option of requirement) {
        // loop through each option of the requirement
        let requirement_completed_credits = 0;
        requirement_required_credits = option.credits_required;
        for (let course of option.courses) {
          // loop through each course of the option
          requirement_total_credits += course.credits; // add the credits of the course to the total credits of the requirement
          if (completed_courses.has(course.course_id)) {
            requirement_completed_credits += course.credits;
          }
        }
        if (requirement_completed_credits >= option.credits_required) {
          requirement_completed = true;
          break;
        } else {
          curr_option.push(option);
        }
      }
      if (requirement_completed) {
        continue;
      } else if (requirement_required_credits == requirement_total_credits) {
        // if the requirement has the same total available credits as required credits
        requirement[0].courses.forEach((course: any) =>
          mandatory_courses.add(course.course_id)
        ); // add the courses of the requirement to mandatory_courses
      } else {
        plan_options.push(curr_option);
      }
    }
  }

  // return the plan_options (an array of arrays of objects), mandatory_courses (a set), and completed_courses (a set)
  return {
    plan_options: plan_options,
    mandatory_courses: mandatory_courses,
    completed_courses: completed_courses,
    completed_credits: completed_credits,
  };
}