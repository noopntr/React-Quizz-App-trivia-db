import axios from "axios";

const API_CAT = "https://opentdb.com/api_category.php";

const categories = async () => {
  const { data } = await axios.get(API_CAT).catch((err) => {
    console.log(err);
  });
  console.log(data);
};

export default categories;
