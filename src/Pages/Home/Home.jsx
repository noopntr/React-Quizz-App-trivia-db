/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "./Home.css";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";

// helpers
import Difficulties from "../../Components/Data/Difficulties.js";
// import Categories from '../../Components/Data/Categories.js'
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const createMarkup = (text) => {
  return { __html: text };
};

const Home = ({ fetchQuestions, Category, Difficulty }) => {
  const classes = useStyles();

  const [category, setCategory] = useState("");
  const [quizCategories, setQuizCategories] = useState([]);
  const [difficulty, setDifficulty] = useState([0]);
  const [error, setError] = useState(false);

  const API_CAT = "https://opentdb.com/api_category.php";

  const Categories = async () => {
    await axios
      .get(API_CAT)
      .then((response) => {
        setQuizCategories(response.data.trivia_categories);
      })
      .catch((err) => {
        console.log(err);
        history.push("/");
      });
  };
  
  useEffect(() => {
    Categories();
  }, []);

  //   Handles Submits and Changes
  const handleSelectChange = (e) => {
    const selectedCategory = quizCategories.find((cat) => cat.id === e.target.value);
    setCategory(selectedCategory);
  };

  const handleDifficultyChange = (e) => {
    const selectedDifficulty = Difficulties.find((diff) => diff.id === e.target.value);
    setDifficulty(selectedDifficulty);
  };

  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || difficulty.name === Difficulties.name) {
      setError(true);
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  return (
    <div className='category-section'>
      <form onSubmit={handleSubmit}>
        {/* Select Quiz Category */}
        {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
        <Grid container spacint={4}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='category'>Category</InputLabel>
              <Select
                labelId='category'
                id='category-select'
                name='category'
                value={category.id || ""}
                onChange={handleSelectChange}
              >
                {quizCategories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Select Quiz Difficulty */}
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='Difficulty'>Difficulty</InputLabel>
              <Select
                labelId='Difficulty'
                id='Difficulty-select'
                name='Difficulty'
                value={difficulty.id || ""}
                onChange={handleDifficultyChange}
              >
                {Difficulties.map((diff) => (
                  <MenuItem key={diff.id} value={diff.id}>
                    {diff.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button variant='contained' color='primary' type='submit'>
          Take a Quiz
        </Button>
      </form>
    </div>
  );
};

export default Home;
