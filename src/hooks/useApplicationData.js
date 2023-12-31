import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state ,setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

  function updateSpots(currentState, targetDay) {
    const findDay = currentState.days.find(day => day.name === targetDay);
    const availableSpots = findDay.appointments.filter(
      (appointmentID) => currentState.appointments[appointmentID].interview === null
    ).length;
    const newDay = {...findDay, spots: availableSpots};
    const days = currentState.days.map((day) => (day.name === targetDay? newDay : day));
    
    setState(prev => ({...prev, days}));
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios
        .put(`/api/appointments/${id}`, {
          interview
        })
        .then(() => {
          setState(prev => ({ ...prev, appointments }));
          updateSpots({...state, appointments}, state.day);
        })
  };

  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const appointments = {
          ...state.appointments,
          [id]: {
            ...state.appointments[id],
            interview: null
          }
        };

        setState(prev => ({ ...prev, appointments }));
        updateSpots({...state, appointments}, state.day);
      })
  };
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then(all => {
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data}));
    });
  }, []);
  
  return { state, setDay, bookInterview, cancelInterview }
}