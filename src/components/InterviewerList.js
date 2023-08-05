import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviews = props.interviewers.map((interviewer) => {
    console.log('props ', props);
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={props.setInterviewer}
        selected={interviewer.id === props.interviewer}
        interviewer={interviewer}
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviews}
      </ul>
    </section>
  );
}