import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  // console.log('Appointment ', props.interview);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  function confirmCancel() {
    transition(DELETING);
    props.cancelInterview(props.id)
    transition(EMPTY); 
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interview={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (    
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave = {save}
        />
      )}

      {mode === SAVING && (
        <Status message={"Saving"}/>
      )}

      {mode === DELETING && (
        <Status message={"Deleting"}/>
      )}

      {mode === CONFIRM && (
        <Confirm 
          onConfirm={confirmCancel}
          onCancel={() => transition(SHOW)}
        />
      )}
    </article>
  );
};