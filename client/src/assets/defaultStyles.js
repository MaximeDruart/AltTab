import styled, { css } from "styled-components"

export const styles = {
  txtSize: {
    small: "16px",
    medium: "20px",
    large: "34px",
    XLarge: "40px",
  },
  txtColor1: "#E2E2E2",
  txtColor2: "#BEBEBE",
  txtColorDisabled: "#858585",
  blue: "#7D63FF",
  darkBlue: "#463988",
  black: {
    light: "#272732",
    medium: "#1B1B26",
    dark: "#0F0F12",
  },
  red: "#C32A2A",
  flexCentered: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
}

export const Button = styled.button`
  border: none;
  border-radius: 10px;
  display: inline-block;
  padding: 1.2rem 2.4rem;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  font-size: 28px !important;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #7d63ff;

  &:hover,
  &:focus {
    /* border: 2px solid white; */
  }
`

export const ButtonSmall = styled.button`
  border: none;
  border-radius: 10px;
  display: inline-block;
  padding: 0.8rem 2rem;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  font-size: 20px !important;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #7d63ff;

  &:hover,
  &:focus {
    /* border: 2px solid white; */
  }
`
