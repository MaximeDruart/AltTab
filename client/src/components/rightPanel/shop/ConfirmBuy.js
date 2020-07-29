import React, { useEffect, useCallback } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { styles, Button } from "../../../assets/defaultStyles"
import closeSvg from "../../../assets/icons/close.svg"
import Avatar from "../../Avatar"
import { useDispatch, useSelector } from "react-redux"
import { buyItem, setBuyConfirmed } from "../../../redux/actions/profileActions"

const ConfirmBuyContainer = styled.div`
  ${styles.flexCentered};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  .confirm-wrap {
    position: relative;
    z-index: 1001;
    background-color: ${styles.black.medium};
    width: 580px;
    padding: 50px 50px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-radius: 12px;
    * {
      font-family: NexaBold;
    }
    .close {
      position: absolute;
      top: 2.5vh;
      right: 2.5vh;
      ${styles.flexCentered};
      background-color: ${styles.blue};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      img {
        width: 60%;
        height: 60%;
      }
    }
    .title {
      font-size: ${styles.txtSize.XLarge};
    }
    .confirm-container {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      .item-infos {
        margin: 40px 0;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        width: 80%;

        .preview {
          width: 210px;
          height: 210px;
          svg {
            width: 100%;
            height: 100%;
          }
        }
        .infos {
          .name {
            font-size: ${styles.txtSize.mediumPlus};
          }
          .type {
            font-size: ${styles.txtSize.medium};
            color: ${styles.txtColor2};
          }
        }
      }
      .balance-check {
        width: 100%;
        margin-bottom: 20px;
        .balance-line {
          margin-bottom: 20px;
          width: 100%;

          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          &.item {
            position: relative;
            margin-bottom: 30px;
            &:after {
              content: "";
              position: absolute;
              bottom: -12px;
              width: 100%;
              height: 1px;
              background: ${styles.txtColor1};
            }
          }
          .balance-left {
            font-size: ${styles.txtSize.mediumPlus};
          }
          .balance-right {
            font-size: ${styles.txtSize.medium};
            color: ${styles.txtColor2};
          }
        }
      }
    }
  }
`

const Filter = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.75;
  z-index: 1000;
  cursor: pointer;
`

const formattedName = (name) =>
  name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/[0-9]/g, "")

const ConfirmBuy = ({ hide, item }) => {
  const dispatch = useDispatch()
  const { user, buyConfirmed } = useSelector((state) => state.auth)

  const finalBuy = () => {
    dispatch(buyItem(item))
  }

  useEffect(() => {
    dispatch(setBuyConfirmed(false))
  }, [dispatch])

  useEffect(() => {
    buyConfirmed && hide()
  }, [buyConfirmed, hide])

  useEffect(() => {
    const toggle = ({ key }) => key === "Escape" && hide()
    window.addEventListener("keydown", toggle)
    return () => window.removeEventListener("keydown", toggle)
  }, [hide])

  const userHasEnoughMoney = useCallback(() => user.money - item.price >= 0, [item, user.money])

  return (
    <>
      <ConfirmBuyContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="confirm-wrap"
        >
          <div onClick={hide} className="close">
            <img src={closeSvg} alt="" />
          </div>
          <div className="title">Confirm your purchase</div>
          <div className="confirm-container">
            <div className="item-infos">
              <div className="preview">
                {item.type === "avatar" && (
                  <Avatar
                    naked={true}
                    randomizeOnClick={true}
                    optionProps={{
                      topType: item.name,
                    }}
                  />
                )}
              </div>
              <div className="infos">
                <div className="name">{formattedName(item.name)}</div>
                <div className="type">Item for : {item.type}</div>
              </div>
            </div>
            <div className="balance-check">
              <div className="actual balance-line">
                <div className="balance-left">Actual balance</div>
                <div className="balance-right actual-balance">{user.money} Dollex</div>
              </div>
              <div className="item balance-line">
                <div className="balance-left">{formattedName(item.name)} </div>
                <div className="balance-right item">{item.price} Dollex</div>
              </div>
              <div className="new balance-line">
                <div className="balance-left">New balance</div>
                <div
                  style={{
                    color: !userHasEnoughMoney() ? styles.red : styles.txtColor1,
                  }}
                  className="balance-right new-balance"
                >
                  {user.money - item.price} Dollex
                </div>
              </div>
            </div>
            <Button variant={!userHasEnoughMoney() && "disabled"} onClick={finalBuy} size="large">
              Buy
            </Button>
          </div>
        </motion.div>
        <Filter initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} exit={{ opacity: 0 }} onClick={hide} />
      </ConfirmBuyContainer>
    </>
  )
}

export default ConfirmBuy
