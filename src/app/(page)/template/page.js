import React from "react";
import Header from "../Header";
import HeaderView from "../HeaderView";
import Sheduled from "../Scheduled";
import Catelog from "../Catelog";
import Trending from "../Trending";
import Collection from "../Collection";
import Contact from "../Contact";
import Footer from "../Footer";

export default function Template() {
  return (
    <React.Fragment>
      <Header  />
      <HeaderView />
      <Sheduled />
      <Catelog />
      <Trending />
      <Collection />
      <Contact />
      <Footer />
    </React.Fragment>
  );
}
