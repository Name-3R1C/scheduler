import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => {
        transition(ERROR_SAVE, true)
        console.log("save catch error", mode);
      });
  };

  function destroy() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => {
        console.log("delete catch error")
        transition(ERROR_DELETE, true)
      });
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}

      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interview={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (    
        <Form
          interviewers={props.interviewers}
          onCancel={back}
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
          onConfirm={destroy}
          onCancel={() => transition(SHOW)}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={back}
          onSave = {save}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          onClose={transition(SHOW)}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          onClose={transition(SHOW)}
        />
      )}
    </article>
  );
};