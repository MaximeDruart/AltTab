import React, { useState, useCallback, useEffect } from "react"
import styled from "styled-components"
import shopDataRaw from "./data.json"
import Field from "./Field"
import AvatarItem from "./AvatarItem"
import ConfirmBuy from "./ConfirmBuy"
import { styles } from "../../../assets/defaultStyles"
import { AnimatePresence, motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { toggleAuth, setAuthMode } from "../../../redux/actions/interfaceActions"
import cloneDeep from "lodash.clonedeep"
import { editAvatar } from "../../../redux/actions/profileActions"

const ShopContainer = styled.div`
  width: 94%;
  height: 100%;
  /* blocks on the left are 91vh high and centered so we're offsetting it by (100 - 91) /2 */
  padding-top: 4.5vh;
  * {
    font-family: NexaBold;
  }

  .shop-options {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;

    .list-type {
      svg {
        margin: 0 5px;
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover {
          filter: saturate(2);
        }
        line,
        rect {
          transition: all 0.15s ease;
        }
      }
    }
    .visibility-toggles {
      margin-left: 10px;
      display: flex;
      flex-flow: row nowrap;
      .toggle {
        white-space: nowrap;
        margin: 0 10px;
      }
    }
  }
`

const Shop = () => {
  const [shopData, setShopData] = useState(shopDataRaw)
  const [showSale, setShowSale] = useState(true)
  const [showOwned, setShowOwned] = useState(false)
  const [[showConfirm, confirmItem], setShowConfirm] = useState([false, null])
  const [listType, setListType] = useState("SQUARE") // is "SQUARE" or "LIST"
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const equipAvatar = (item) => {
    // change in db
    const fullAvatar = {
      ...user.avatar,
      topType: item.name,
    }
    dispatch(editAvatar(fullAvatar))
    // change in socket
  }

  const isItemOwned = (itemName, field) => user && user.acquiredItems[field].includes(itemName)

  useEffect(() => {
    if (!user) return
    const newShopData = cloneDeep(shopDataRaw)
    for (const field in newShopData) {
      newShopData[field].items = newShopData[field].items.filter((item) =>
        // if user has it in inventory, return the boolean "shoul we show owned items ?" else return the boolean "should we show other items ?"
        isItemOwned(item.name, field) ? showOwned : showSale
      )
    }
    setShopData(newShopData)
  }, [showSale, showOwned, user])

  const buyAvatar = useCallback(
    (avatar) => {
      if (isAuthenticated) {
        setShowConfirm([true, avatar])
      } else {
        dispatch(setAuthMode("LOGIN"))
        dispatch(toggleAuth())
      }
    },
    [isAuthenticated, dispatch]
  )

  const hideConfirm = () => {
    setShowConfirm([false, null])
  }
  return (
    <ShopContainer>
      <AnimatePresence exitBeforeEnter={true}>
        {showConfirm && <ConfirmBuy item={confirmItem} hide={hideConfirm} />}
      </AnimatePresence>
      <div className="shop-options">
        <div className="list-type">
          <svg onClick={() => setListType("LIST")} width="22" height="23" viewBox="0 0 22 23">
            <line
              x1="4.86554"
              y1="1.32489"
              x2="20.9972"
              y2="1.32489"
              stroke={listType === "LIST" ? styles.blue : styles.darkBlue}
              strokeWidth="2.00452"
              strokeLinecap="round"
            />
            <line
              x1="2.00226"
              y1="1.32489"
              x2="1.90681"
              y2="1.32489"
              stroke={listType === "LIST" ? styles.blue : styles.darkBlue}
              strokeWidth="2.00452"
              strokeLinecap="round"
            />
            <line
              x1="4.86554"
              y1="8.00604"
              x2="20.9972"
              y2="8.00604"
              stroke={listType === "LIST" ? styles.blue : styles.darkBlue}
              strokeWidth="2.00452"
              strokeLinecap="round"
            />
            <line
              x1="2.00226"
              y1="8.00702"
              x2="1.90681"
              y2="8.00702"
              stroke={listType === "LIST" ? styles.blue : styles.darkBlue}
              strokeWidth="2.00452"
              strokeLinecap="round"
            />
            <line
              x1="4.86554"
              y1="14.6882"
              x2="20.9972"
              y2="14.6882"
              stroke={listType === "LIST" ? styles.blue : styles.darkBlue}
              strokeWidth="2.00452"
              strokeLinecap="round"
            />
            <line
              x1="2.00226"
              y1="14.6882"
              x2="1.90681"
              y2="14.6882"
              stroke={listType === "LIST" ? styles.blue : styles.darkBlue}
              strokeWidth="2.00452"
              strokeLinecap="round"
            />
            <line
              x1="4.86554"
              y1="21.3698"
              x2="20.9972"
              y2="21.3698"
              stroke={listType === "LIST" ? styles.blue : styles.darkBlue}
              strokeWidth="2.00452"
              strokeLinecap="round"
            />
            <line
              x1="2.00226"
              y1="21.3703"
              x2="1.90681"
              y2="21.3703"
              stroke={listType === "LIST" ? styles.blue : styles.darkBlue}
              strokeWidth="2.00452"
              strokeLinecap="round"
            />
          </svg>
          <svg onClick={() => setListType("SQUARE")} width="23" height="23" viewBox="0 0 23 23">
            <rect
              x="0.000976562"
              width="10.4018"
              height="10.4018"
              rx="2.9"
              fill={listType === "SQUARE" ? styles.blue : styles.darkBlue}
            />
            <rect
              x="12.4023"
              width="10.4018"
              height="10.4018"
              rx="2.9"
              fill={listType === "SQUARE" ? styles.blue : styles.darkBlue}
            />
            <rect
              x="12.4014"
              y="12.4019"
              width="10.4018"
              height="10.4018"
              rx="2.9"
              fill={listType === "SQUARE" ? styles.blue : styles.darkBlue}
            />
            <rect
              y="12.4019"
              width="10.4018"
              height="10.4018"
              rx="2.9"
              fill={listType === "SQUARE" ? styles.blue : styles.darkBlue}
            />
          </svg>
        </div>
        {isAuthenticated && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            className="visibility-toggles"
          >
            <div className="toggle owned">
              <input
                onChange={() => setShowOwned(!showOwned)}
                checked={showOwned}
                type="checkbox"
                id="owned"
                name="owned"
              />
              <label htmlFor="owned">Show owned</label>
            </div>
            <div className="toggle sale">
              <input onChange={() => setShowSale(!showSale)} checked={showSale} type="checkbox" id="sale" name="sale" />
              <label htmlFor="sale">Show for sale</label>
            </div>
          </motion.div>
        )}
      </div>
      <div className="shop-container">
        <Field title={shopData.avatar.title} desc={shopData.avatar.desc}>
          {shopData.avatar.items.map((item, index) => (
            <AvatarItem
              isOwned={isItemOwned(item.name, "avatar")}
              isEquipped={item.name === user?.avatar.topType}
              key={index}
              equip={equipAvatar}
              buy={buyAvatar}
              item={item}
            ></AvatarItem>
          ))}
        </Field>
        <Field title={shopData.gummy.title} desc={shopData.gummy.desc}></Field>
      </div>
    </ShopContainer>
  )
}

export default Shop
