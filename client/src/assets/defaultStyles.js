import styled, { css } from "styled-components"

export const styles = {
  txtSize: {
    XSmall: "14px",
    small: "16px",
    medium: "20px",
    mediumPlus: "27px",
    large: "34px",
    XLarge: "40px",
  },
  txtColor1: "#E2E2E2",
  txtColor2: "#BEBEBE",
  txtColorDisabled: "#858585",
  blue: "#7D63FF",
  disabledBlue: "#8881ab",
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
  display: block;
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
  display: block;
  padding: 0.8rem 2rem;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  font-size: 20px !important;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: ${(props) => (props.variant === "dark" ? "#463988" : "#7d63ff")};

  &:hover,
  &:focus {
    /* border: 2px solid white; */
  }
`

export const LargeButton = styled.button`
  border: none;
  border-radius: 10px;
  display: block;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  font-size: 26px !important;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: ${(props) =>
    props.variant === "dark" ? "#463988" : props.variant === "disabled" ? "#8881ab" : "#7d63ff"};
  width: 100%;

  &:hover,
  &:focus {
    /* border: 2px solid white; */
  }
`

export const Selector = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 300px;
  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 35px;
    background-color: #1b1b26;
    color: #bebebe;
    border: thin solid 272732;
    cursor: pointer;
    &.active {
      background-color: #272732;
      border: 1px solid #7d63ff;
      z-index: 10;
      color: #e2e2e2;
      cursor: default;
    }
  }
  .left {
    border-radius: 10px 0 0 10px;
  }
  .right {
    border-radius: 0 10px 10px 0;
  }
`
