import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import AnswerList from './AnswerList.jsx';

const Answers = (props) => {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    getAnswers();
  }, []);

  let getAnswers = () => {
    let id = props.id || 95294;
    if (answers.length === 0) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/answers`, header)
      .then((answersList) => {
        setAnswers(answersList.data.results);
      })
      .catch( (err) => {console.error(err)})
    }
  };

  return (
    <div>
      {answers.length> 0 ?
      <div>
      {answers.slice(0, 2).map( (answer, index) => {
        let date = new Date(answer.date)
        return (
          <div key = {index}>
            <span className = 'answer_body'>
            A: {answer.body}
            </span>
            by {answer.answerer_name},
            {date.toDateString().substring(4)}  |

            <span className = 'answer_helpfulness'>
            Yes {answer.helpfulness}
            </span>


          </div>
          )
      })}
      </div>
      : null
    }
    </div>
  )
}

export default Answers;