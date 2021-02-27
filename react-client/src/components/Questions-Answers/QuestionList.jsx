import React from 'react';
import Questions from './Questions.jsx';

const QuestionList = ({questions}) => {
  if (!questions) {
    return <div></div>
  }
  return (
    <div>
      {questions.map((review, index) => <Questions key={index} review={review} />)}
    </div>
  );
};

export default QuestionList;
