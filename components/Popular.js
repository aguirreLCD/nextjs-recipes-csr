/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";

import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    async function getPopular() {
      const check = localStorage.getItem("popular");
      if (check) {
        // console.log(JSON.parse(check));
        // console.log(check);
        setPopular(JSON.parse(check));
      } else {
        if (typeof window !== "undefined") {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=4`
          );
          const data = await response.json();
          localStorage.setItem("popular", JSON.stringify(data.recipes));

          setPopular(data.recipes);
        }
      }
    }
    getPopular();
  }, []);

  return (
    <>
      {popular.map((recipe) => (
        <div className={styles.card} key={recipe.id}>
          <Link href={`/recipes/${recipe.id}`}>
            <a>
              <img src={recipe?.image} alt={recipe?.title} />
              <h3> {recipe.title}</h3>
            </a>
          </Link>
        </div>
      ))}
    </>
  );
}
