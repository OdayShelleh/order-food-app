import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useHttp from "../../hooks/use-http";
import React, { useEffect, useState } from "react";
import Modal from "../Cart/Modal";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchData } = useHttp();
  useEffect(() => {
    fetchData(
      {
        url: "https://order-food-app-508f6-default-rtdb.firebaseio.com/meals.json",
      },
      (data) => {
        let mealsData = [];
        for (const meal in data) {
          mealsData.push({ id: meal, ...data[meal] });
        }
        setMeals(mealsData);
      }
    );
  }, [fetchData]);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <Modal>loading...</Modal>}
        {error && !isLoading && (
          <p>There is something wrong {error.message.toString()}</p>
        )}
        {meals.length === 0 && !error && !isLoading && <p>No data found</p>}
        {meals.length > 0 && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
