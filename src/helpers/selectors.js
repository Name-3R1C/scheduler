export function getAppointmentsForDay (state, day) {
  let result = [];
  const dayInfo = state.days.find(dayInList => dayInList.name === day);
  
  if (!dayInfo) {
    return [];
  };

  for (const appointmentID of dayInfo.appointments) {
    result.push(state.appointments[appointmentID]);
  };

  return result;
};

export function getInterview (state, interview) {
  if (!interview) {
    return null;
  };
  
  const result = {};
  const interviewID = interview.interviewer;
  result.student = interview.student;
  result.interviewer = state.interviewers[interviewID];

  return result;
};