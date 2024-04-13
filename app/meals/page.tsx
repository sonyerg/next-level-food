import Link from "next/link";
import React from "react";

const style: React.CSSProperties = {
  color: "white",
  textAlign: "center",
};

export default function MealsPage() {
  return (
    <main style={style}>
      <h1>MealsPage</h1>
      <p style={style}>
        <Link href="/meals/share">Share</Link>
      </p>
      <p>
        <Link href="/meals/meal-1">Meal 1</Link>
      </p>
    </main>
  );
}
