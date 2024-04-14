import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={Logo} alt="lots of food in a table" priority />
          Next Level Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meals</Link>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
