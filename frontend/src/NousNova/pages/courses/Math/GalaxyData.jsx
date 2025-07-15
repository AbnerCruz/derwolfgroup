
import { preCalculoPlanets } from "./solarSystems/planets/PlanetsData";

export const galaxyData = {
  math: [
    {
      id: "pre-calculo",
      title: "Pré-Cálculo",
      subtitle: "Fundamentos Essenciais para o Cálculo",
      introTitle: "O que você aprenderá",
      introText: "Neste módulo você irá revisar e consolidar os conceitos fundamentais necessários para compreender cálculo diferencial e integral.",
      totalDiscount: 10,
      checkoutURL: "https://checkout.nousnova.com/pre-calculo",

      planets: preCalculoPlanets,
    },

    {
      id: "calculo-diferencial-1",
      title: "Cálculo Diferencial I",
      subtitle: "Derivadas e Taxas de Variação",
      introTitle: "O que você aprenderá",
      introText: "Você aprenderá o conceito de derivada, suas regras de cálculo, interpretações geométricas e aplicações em otimização.",
      totalDiscount: 25,
      checkoutURL: "https://checkout.nousnova.com/calculo-diferencial",

      planets: [],
    },

    {
      id: "calculo-integral-1",
      title: "Cálculo Integral I",
      subtitle: "Integrais e Áreas",
      introTitle: "O que você aprenderá",
      introText: "Cálculo de integrais definidas e indefinidas, aplicações em áreas, volumes e problemas físicos.",
      totalDiscount: 15,
      checkoutURL: "https://checkout.nousnova.com/calculo-integral",

      planets: [],
    },

    {
      id: "calculo-diferencial-2",
      title: "Cálculo Diferencial II",
      subtitle: "Funções de Várias Variáveis",
      introTitle: "O que você aprenderá",
      introText: "Você irá explorar derivadas parciais, gradientes, integrais múltiplas e integrais de linha.",
      totalDiscount: 30,
      checkoutURL: "https://checkout.nousnova.com/calculo-multivariavel",

      planets: [],
    },

    {
      id: "calculo-integral-2",
      title: "Cálculo Integral II",
      subtitle: "Funções de Várias Variáveis",
      introTitle: "O que você aprenderá",
      introText: "Você irá explorar derivadas parciais, gradientes, integrais múltiplas e integrais de linha.",
      totalDiscount: 30,
      checkoutURL: "https://checkout.nousnova.com/calculo-multivariavel",

      planets: [],
    },
  ],

  physics: [
    {
      id: "mecanica",
      title: "Mecânica Clássica",
      subtitle: "Movimento, Forças e Energia",
      introTitle: "O que você aprenderá",
      introText: "Cinemática, dinâmica, leis de Newton, trabalho e energia.",
      totalDiscount: 20,
      checkoutURL: "https://checkout.nousnova.com/mecanica",

      planets: [],
    },
  ],
};