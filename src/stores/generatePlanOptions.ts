// points_grade: function that returns the 4.0 grade from a letter grade
let points_grade = function (letter_grade) {
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
    }
    else {
      return letter_grade;
    }
};

// selected_fields: list of student_field_field_id integers selected by the user
// repeated_courses: list of course_id strings that the user does not consider completed
export default function generatePlanOptions(all_fields, selected_fields, repeated_courses, current_enrollments, past_enrollments, completed_credits) {
  let plan_options = [];
  let mandatory_courses = new Set();
  let completed_courses = new Set();

  // courses with a grade of 2.0 or higher are added to completed_courses
  for (let enrollment of past_enrollments) {
    if (points_grade(enrollment.grade) >= 2.0) {
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
  all_fields = all_fields.filter(field => selected_fields.includes(field.student_field_id));

  // Courses of requirements with required credits equal to total credits available are considered mandatory
  // Requirements that are not completed are added to plan_options
  for (let field of all_fields) {  // loop through each slected field
    
    for (let requirement of field.requirements) { // loop through each requirement of the field
      let curr_option = [];
      let total_credits = 0;
      let required_credits = 0;
      let completed = false;
      
      for (let option of requirement) { // loop through each option of the requirement
        let completed_credits = 0;
        required_credits = option.credits_required;
        
        for (let course of option.courses) {  // loop through each course of the option
          total_credits += course.credits;  // add the credits of the course to the total credits of the requirement
          
          if (completed_courses.has(course.course_id)) {
            completed_credits += course.credits;
            course.completed = true;
          }
          else {
            course.completed = false;
          }
        }
        
        if (completed_credits >= option.credits_required) {
          completed = true;
          break;
        }
        else {
          option.completed_credits = completed_credits;
          curr_option.push(option);
        }
      }
      
      if (completed) {
        continue;
      }
       // if all courses in the requirement must be taken add all noncomplete courses to mandatory_courses
      else if (required_credits == total_credits) {
        requirement[0].courses.forEach((course) => {
          if (course.completed == false) {
            mandatory_courses.add(course.course_id)
          }
        });
      }
      else {
        plan_options.push(curr_option);
      }
    }
  }
  // return the plan_options (an array of arrays of objects), mandatory_courses (an array of course_id elements), completed_courses (an array of course_id elements), and completed_credits (a number)
  return {
    plan_options: plan_options,
    mandatory_courses: Array.from(mandatory_courses),
    completed_courses: Array.from(completed_courses),
    completed_credits: completed_credits
  };
}