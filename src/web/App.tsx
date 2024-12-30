import React from "react";
import { Digits } from "./background/Digits";
import "./main.css";
import Gallery from "./gallery/Gallery";

export default function App() {
  return (
    <>
      <Digits length={40} />
      <Gallery />
    </>
  );
}
