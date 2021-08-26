import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./Result.css";

const Result = ({ score }) => {
  const history = useHistory();

  useEffect(() => {
    if (!score) {
      history.push("/");
    }
  }, [score, history]);

  return (
    <div className='result-content'>
      <div className='result'>
        <span>Final Score : {score}</span>
        <Button
          className='result-btn'
          variant='contained'
          color='secondary'
          size='large'
          style={{ alignSelf: "center", marginTop: 20 }}
          href='/'
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

export default Result;
