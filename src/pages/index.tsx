import React from "react";
import Hero from "../components/home/Hero";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { AiFillVideoCamera } from "react-icons/ai";
import { BsBroadcastPin, BsNewspaper } from "react-icons/bs";
import Services from "../components/home/Services";
import FAQ from "../components/home/FAQ";

const Home = () => {
  const services = [
    {
      id: 1,
      name: "Game",
      icon: MdOutlineSportsBasketball,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta..",
      urlPath: "/games",
    },
    {
      id: 2,
      name: "Broadcast",
      icon: BsBroadcastPin,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta..",
      urlPath: "/events",
    },
    {
      id: 3,
      name: "Highlight",
      icon: AiFillVideoCamera,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta..",
      urlPath: "/highlights",
    },
    {
      id: 4,
      icon: BsNewspaper,
      name: "News",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta..",
      urlPath: "/news",
    },
  ];

  const FAQs = [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta",
      content:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta, adipisci debitis delectus molestiae nostrum incidunt",
    },
    {
      id: 2,
      title:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta",
      content:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta, adipisci debitis delectus molestiae nostrum incidunt",
    },
    {
      id: 3,
      title:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta",
      content:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta, adipisci debitis delectus molestiae nostrum incidunt",
    },
    {
      id: 4,
      title:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta",
      content:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem fuga, dicta, adipisci debitis delectus molestiae nostrum incidunt",
    },
  ];
  return (
    <>
      <Hero />
      <Services services={services} />
      <FAQ FAQs={FAQs} />
    </>
  );
};

export default Home;
