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

  function updateSpots(targetDay, diff) {
    console.log('updateSpots ', state);
    const findDay = state.days.find(day => day.name === targetDay);
    // const newDay = {...findDay, spots: (findDay.spots + diff)}
    // const days = state.days.map((day) => (day.name === targetDay? newDay : day));
    // setState(prev => ({...prev, days}));
    const availableSpots = findDay.appointments.filter(
      (appointmentID) => state.appointments[appointmentID].interview === null
    ).length;
    const newDay = {...findDay, spots: availableSpots};
    const days = state.days.map((day) => (day.name === targetDay? newDay : day));
    console.log('days ', days, availableSpots);
    setState(prev => ({...prev, days}));

    // console.log('after setstate ', state);
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
          // setState({ ...state, appointments });
          setState(prev => ({ ...prev, appointments }));
          updateSpots(state.day, -1);
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
        updateSpots(state.day, 1);
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
  console.log('useApplicationData ', state);
  return { state, setDay, bookInterview, cancelInterview }
}