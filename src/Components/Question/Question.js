import { Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

// materia ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Question = ({
  currQues,
  setCurrQues,
  questions,
  setQuestions,
  options,
  correct,
  setScore,
  score,
}) => {
  const classes = useStyles();

  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const history = useHistory();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    setDisabled(true);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = (e) => {
    e.preventDefault()
    if (currQues >= 4 && selected) {
      history.push("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
      setDisabled(false);
    } else setError("Please select an answer first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  return (
    <div className='question-container'>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>Question {currQues + 1} :</h1>
          </Grid>

          <Grid item xs={12}>
            <h2>{questions[currQues].question}</h2>
          </Grid>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <Grid item xs={6} key={i}>
                <Button
                  size='large'
                  variant='contained'
                  className={`singleOption ${selected && handleSelect(i)}`}
                  onClick={() => handleCheck(i)}
                  disabled={disabled}
                >
                  {i}
                </Button>
              </Grid>
            ))}
          <div className='options'>
            <Grid item xs={6}>
              <Button
                variant='contained'
                color='secondary'
                size='large'
                style={{ width: 185 }}
                href='/'
                onClick={() => handleQuit()}
              >
                Restart
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                style={{ width: 185 }}
                onClick={handleNext}
              >
                {currQues >= 4 ? "Submit" : "Next"}
              </Button>
            </Grid>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default Question;
