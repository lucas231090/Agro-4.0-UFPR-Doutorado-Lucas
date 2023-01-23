/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./tempo.css";
import axios from "axios";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiArrowLeft } from "react-icons/fi";
import moment from "moment";

export default function Tempo() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: "8b25dd1655df3b0958b746ba4de9fb04",
          lang: "pt",
          units: "metric",
        },
      }
    );
    setWeather(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (location == false) {
    return (
      <Fragment>Você precisa habilitar a localização no browser o/</Fragment>
    );
  } else if (weather == false) {
    return (
      <Fragment>
        <Header />
        <div className="content">
          <Title name="Previsão do Tempo">
            <Link to="/dashboard">
              <FiArrowLeft size={45} />
            </Link>
          </Title>
          Carregando o clima...
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>

        <Header />
        <div className="content">
          <Title name="Previsão do Tempo">
            <Link to="/dashboard">
              <FiArrowLeft size={45} />
            </Link>
          </Title>

          <h3>
            Clima agora em sua geolocalização (
            {weather["weather"][0]["description"]})
          </h3>
          <hr />
          <ul>
            <li>Temperatura atual: {weather["main"]["temp"]}°</li>
            <li>Temperatura máxima: {weather["main"]["temp_max"]}°</li>
            <li>Temperatura minima: {weather["main"]["temp_min"]}°</li>
            <li>Pressão: {weather["main"]["pressure"]} hpa</li>
            <li>Umidade: {weather["main"]["humidity"]}%</li>
          </ul>

        </div>
      </Fragment>
    );
  }
}
