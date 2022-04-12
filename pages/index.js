/* eslint-disable @next/next/no-img-element */

import React from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";

import Veggie from "../components/Veggie";
import Popular from "../components/Popular";


export default function Home() {
  
  return (
    <>

    <Head>
        <title>Recipes</title>

      </Head>

    <div className={styles.container}>
    

      
      <Veggie></Veggie>
      
      <Popular></Popular>
      
    </div>
    </>
  );
}
