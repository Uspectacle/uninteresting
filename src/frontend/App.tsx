import React from "react";
import "./main.css";
import { Digits } from "./components/background/Digits";
import Gallery from "./components/gallery/Gallery";

export default function App() {
  return (
    <>
      <Digits length={40} />
      <Gallery />
    </>
  );
}
