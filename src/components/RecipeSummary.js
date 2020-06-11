import React from "react"
import * as styles from "./RecipeSummary.module.css"

function Recipe(props) {
  return (
    <section className={styles.root}>
      <h2 className={styles.title}>
        <a href={props.href}>
          <b>{props.title}</b>
        </a>
      </h2>
      <p className={styles.summary}>
        {props.children}
        <a className={styles.readNow} href={props.href}>Read now ›</a>
      </p>
    </section>
  )
}

export default Recipe
