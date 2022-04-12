/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../../styles/Details.module.css";

import Link from "next/link";
import { useRouter } from "next/router";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Details() {
  const {
    query: { id },
  } = useRouter();

  //   console.log(query.id);

  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    async function getDetail() {
      const check = localStorage.getItem(`${id}`);
      if (check) {
        // console.log(JSON.parse(check));
        // console.log(check);
        setRecipeDetail(JSON.parse(check));
      } else {
        if (typeof window !== "undefined") {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
          );
          const data = await response.json();
          localStorage.setItem(`${id}`, JSON.stringify(data));

          setRecipeDetail(data);
        }
      }
    }

    if (id) {
      getDetail();
    }
  }, [id]);

  if (!recipeDetail) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{recipeDetail.title}</title>
      </Head>

      <div>
        <Link href="/">
          <a>Back Home</a>
        </Link>
      </div>

      <div className={styles.card}>
        <div>
          <img
            className={styles.picture}
            src={recipeDetail.image}
            alt={recipeDetail.title}
          />
          <p> Ready in {recipeDetail.readyInMinutes} minutes. </p>
        </div>

        <div className={styles.title}>{recipeDetail.title}</div>
        <div className={styles.type}>{recipeDetail.dishTypes.join(", ")}</div>
        <div className={styles.diets}>{recipeDetail.diets.join(", ")}</div>
        <div className={styles.occasions}>
          {recipeDetail.occasions.join(", ")}
        </div>

        <div>
          <ul>
            {recipeDetail.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} className={styles.ingredient}>
                {ingredient.original}
              </li>
              // <li>{ingredient.unit}</li>
            ))}
          </ul>
        </div>

        <div>
          <ul>
            {recipeDetail.analyzedInstructions.map((name) =>
              name.steps.map((step) => <li key={step.number}>{step.step}</li>)
            )}
          </ul>
        </div>

        <div className={styles.type}>
          {recipeDetail.vegan === true ? <p>vegan</p> : <p></p>}
          {recipeDetail.vegetarian === true ? <p>vegetarian</p> : <p></p>}
          {recipeDetail.glutenFree === true ? <p>gluten free</p> : <p></p>}
          {recipeDetail.cheap === true ? <p>cheap</p> : <p></p>}
        </div>
      </div>
    </>
  );
}
