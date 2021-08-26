import { Grid } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../../Components/Question/Question";
import "./Quiz.css";

const Quiz = ({ questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ]),
    );
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className='quiz-content'>
      {questions ? (
        <>
          <div className='quizInfo'>
            <Grid item xs={6}>
              <span>{questions[currQues].category}</span>
            </Grid>
            <Grid item xs={3}>
              <span>Score : {score}</span>
            </Grid>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <div className='category-section'>
          <CircularProgress color='inherit' size={150} thickness={1} />
        </div>
      )}
    </div>
  );
};

export default Quiz;
