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
      .catch(() => transition(ERROR_SAVE, true));
  };
  
  function destroy() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }
  
  return (
    <article className="appointment" data-testid="appointment">
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
          onCancel={back}
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
          message={"Could not delete appointment"}
          onClose={back}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error 
          message={"Could not save appointment"}
          onClose={back}
        />
      )}
    </article>
  );
};