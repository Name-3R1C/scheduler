export function getAppointmentsForDay (state, day) {
  const result = [];
  const dayInfo = state.days.find(dayInList => dayInList.name === day);
  
  if (state.days.length === 0 || !dayInfo) {
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

export function getInterviewersForDay(state, day) {
  const result = [];
  const dayFound = state.days.find(dayInList => dayInList.name === day);
  
  if (state.days.length === 0 || !dayFound) {
    return [];
  };

  for (const interviewerID of dayFound.interviewers) {
    result.push(state.interviewers[interviewerID]);
  };
  
  return result;
};