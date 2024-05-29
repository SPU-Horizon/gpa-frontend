// @ts-nocheck

// isPassingGrade: anonymous function that returns true if the points grade is greater than or equal to 2.0
let isPassingGrade = function (letter_grade) {
  if (letter_grade == null) {
    return false;
  }
  if (isNaN(Number(letter_grade))) {
    switch (letter_grade) {
      case "A":
      case "A-":
      case "B+":
      case "B":
      case "B-":
      case "C+":
      case "C":
      case "C-":
        return true;
      default:
        return false;
    }
  }
  else {
    return (parseFloat(letter_grade) >= 2.0);
  }
};

// selected_fields: list of student_field_field_id integers selected by the user
// repeated_courses: list of course_id strings that the user does not consider completed
export function generatePlanOptions(all_fields, selected_fields, repeated_courses, current_enrollments, past_enrollments, completed_credits) {
  let plan_options = [];
  let mandatory_courses = new Set();
  let completed_courses = new Set();
  console.log(past_enrollments);
  // courses with a grade of 2.0 or higher are added to completed_courses
  for (let enrollment of past_enrollments) {
    if (isPassingGrade(enrollment.grade)) {
      completed_courses.add(enrollment.course_id);
    }
  }

  // courses not marked to be repeated by student are add to completed_courses
  for (let enrollment of current_enrollments) {
    if (!repeated_courses.includes(enrollment.course_id)) {
      completed_courses.add(enrollment.course_id);
      completed_credits += parseInt(enrollment.credits);
    }
  }

  // fields not in selected_fields are removed
  all_fields.filter(field => selected_fields.includes(field.student_field_id));

  // Courses of requirements with required credits equal to available credits available are considered mandatory
  // Requirements that are not completed are added to plan_options
  for (let field of all_fields) {
    for (let requirement of field.requirements) {
      let curr_options = [];
      let available_credits = 0;
      let completed = false;

      for (let option of requirement) {
        for (let i = option.courses.length - 1; i >= 0; i--) {  // iterate through the courses in the requirement backwards to avoid index issues when removing elements
          if (completed_courses.has(option.courses[i].course_id)) {
            option.credits_required -= option.courses[i].credits; // subtract the credits of the completed course from the credits required for the requirement
            option.courses.splice(i, 1);  // remove the completed course from the list of courses in the requirement
          }
          else {
            available_credits += parseInt(option.courses[i].credits);  // add the credits of the incomplete course to the count of the available credits of the requirement
          }
        }

        // if all courses in the requirement have been completed, set completed to true and break the loop
        if (option.credits_required <= 0) {
          completed = true;
          break;
        }
        else {
          curr_options.push(option);
        }
      }
      
      if (completed) {
        continue;
      }
      // add all incomplete courses in the requirement to mandatory coursed if they must be taken
      else if (requirement.length == 1 && requirement[0].credits_required >= available_credits) {
        requirement[0].courses.forEach(course => {
            mandatory_courses.add(course.course_id)
        });
      }
      else {
        console.log(curr_options);
        console.log(available_credits);
        plan_options.push(curr_options);
      }
    }
  }

  // return the plan_options (an array of arrays of objects), mandatory_courses (an array of course_id strings), completed_courses (an array of course_id strings), and completed_credits (a number)
  return {
    plan_options: plan_options,
    mandatory_courses: Array.from(mandatory_courses),
    completed_courses: Array.from(completed_courses),
    completed_credits: completed_credits
  };
}