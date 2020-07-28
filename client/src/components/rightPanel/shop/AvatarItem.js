import React from "react"
import styled from "styled-components"
import Avatar from "../../Avatar"
import { styles, Button } from "../../../assets/defaultStyles"

const AvatarContainer = styled.div`
  width: 180px;
  height: 250px;
  background-color: ${styles.black.light};
  margin-right: 25px;
  margin-bottom: 25px;
  border-radius: 12px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  .shop-avatar {
    width: 100px;
    height: 100px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`

const AvatarItem = ({ item, buy, equip }) => {
  const itemTyped = { ...item, type: "avatar" }
  return (
    <AvatarContainer>
      <div className="shop-avatar">
        <Avatar
          naked={true}
          optionProps={{
            topType: item.name,
          }}
        />
      </div>
      <div className="price">{item.price}</div>
      <div className="actions">
        <Button size="small" onClick={() => buy(itemTyped)}>
          buy
        </Button>
      </div>
    </AvatarContainer>
  )
}

export default AvatarItem
