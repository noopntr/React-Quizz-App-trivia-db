import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import axios from "axios";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import { Container } from "@material-ui/core";

function App() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=5&category=${category.id}&difficulty=${difficulty.name}`,
    );
    setQuestions(data.results);
  };

  return (
    <div className='App'>
      <Container maxWidth='sm'>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home fetchQuestions={fetchQuestions} />
            </Route>
            <Route exact path='/quiz'>
              <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
              />
            </Route>
            <Route path='/result'>
              <Result score={score} />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
