/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";

import Head from "next/head";

import styles from "../styles/Home.module.css";

import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    async function getVeggie() {
      const check = localStorage.getItem("veggie");
      if (check) {
        // console.log(JSON.parse(check));
        // console.log(check);
        setVeggie(JSON.parse(check));
      } else {
        if (typeof window !== "undefined") {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=4&tags=vegetarian`
          );
          const data = await response.json();
          localStorage.setItem("veggie", JSON.stringify(data.recipes));

          setVeggie(data.recipes);
        }
      }
    }
    getVeggie();
  }, []);

  return (
    <>
      {veggie.map((recipe) => (
        <div className={styles.card} key={recipe.id}>
          <Link href={`/recipes/${recipe.id}`}>
            <a>
              <img src={recipe.image} alt={recipe.title} />
              <h3> {recipe.title}</h3>
            </a>
          </Link>
        </div>
      ))}
    </>
  );
}
