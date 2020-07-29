import React from "react"
import styled from "styled-components"
import Avatar from "../../Avatar"
import { styles, Button } from "../../../assets/defaultStyles"
import { motion } from "framer-motion"

const AvatarContainer = styled(motion.div)`
  width: 180px;
  height: 250px;
  background-color: ${styles.black.medium};
  margin-right: 35px;
  margin-bottom: 35px;
  border-radius: 12px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  cursor: ${(props) => (!props.isEquipped ? "pointer" : "auto")};
  .shop-avatar {
    width: 100px;
    height: 100px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`

const AvatarItem = ({ item, buy, isOwned, isEquipped, equip }) => {
  const itemTyped = { ...item, type: "avatar" }
  return (
    <AvatarContainer
      isEquipped={isEquipped}
      variants={{
        open: { opacity: 1, scale: 1 },
        collapsed: { opacity: 0, scale: 0 },
        hover: { scale: 1.08, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.29)" },
        loading: { opacity: [1, 0.7, 1], transition: { loop: Infinity, duration: 2.2, ease: "easeInOut" } },
      }}
      whileHover="hover"
      onClick={() => (!isOwned ? buy(itemTyped) : !isEquipped && equip(itemTyped))}
    >
      <div className="shop-avatar">
        <Avatar
          naked={true}
          optionProps={{
            topType: item.name,
          }}
        />
      </div>
      <div className="name">{item.name}</div>
      <div className="price">{item.price} D</div>
      <div className="actions">
        {!isOwned ? (
          <Button size="small" onClick={() => buy(itemTyped)}>
            Buy
          </Button>
        ) : (
          <Button
            variant={isEquipped ? "disabled" : "dark"}
            size="small"
            onClick={() => !isEquipped && equip(itemTyped)}
          >
            {isEquipped ? "Equipped" : "Equip"}
          </Button>
        )}
      </div>
    </AvatarContainer>
  )
}

export default AvatarItem
