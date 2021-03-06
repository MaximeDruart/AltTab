import React from "react"
import styled from "styled-components"
import { styles, Button } from "../../assets/defaultStyles"
import logoutSvg from "../../assets/icons/logout.svg"
import { useDispatch, useSelector } from "react-redux"
import { toggleAuth, setAuthMode } from "../../redux/actions/interfaceActions"
import { logoutUser } from "../../redux/actions/authActions"
import Avatar from "../Avatar"

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  * {
    font-family: NexaBold;
  }
  .disconnect {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .head {
    margin-top: 25px;
    width: 85%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .pfp {
      ${styles.flexCentered};
      width: 100px;
      height: 100px;
      flex-shrink: 0;
      position: relative;
      svg {
        width: 100%;
        height: 100%;
        /* offsetting it a bit as the head doesn't fit in the circle */
        position: absolute;
        top: -7%;
        transition: opacity 0.3s ease-in-out;
      }
      .change {
        ${styles.flexCentered};
        position: absolute;
        width: 25px;
        height: 25px;
        background: ${styles.blue};
        border-radius: 50%;
        bottom: 15%;
        right: 2%;
        cursor: pointer;
        img {
          width: 70%;
          height: 70%;
        }
      }
    }
    .infos {
      padding-left: 15px;
      .name {
        font-size: ${styles.txtSize.large};
      }
      .email {
        font-size: ${styles.txtSize.XSmall};
        color: ${styles.txtColor2};
      }
    }
  }
  .section {
    margin-top: 40px;
    width: 85%;
    .header {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .title {
        font-size: ${styles.txtSize.mediumPlus};
      }
      .edit {
        border: none;
        border-radius: 5px;
        display: inline-block;
        padding: 0.4rem 1.2rem;
        margin: 0;
        text-decoration: none;
        color: #ffffff;
        font-size: ${styles.txtSize.XSmall};
        cursor: pointer;
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: #7d63ff;

        &:hover,
        &:focus {
          /* border: 2px solid white; */
        }
      }
    }
    .content {
      background-color: ${styles.black.light};
      width: 100%;
      height: 150px;
      border-radius: 10px;
    }
  }
  .not-logged-in {
    display: flex;
    flex-flow: column nowrap;
    /* height: 100%; */

    .body {
      ${styles.flexCentered};
      flex-flow: column nowrap;
      height: 40vh;
      .sad-chammy {
      }
      .txt {
        margin-top: 20px;
        text-align: center;
        width: 70%;
      }
    }
    .buttons {
      * {
        margin: 20px auto;
      }
    }
  }
`

const Profile = () => {
  const dispatch = useDispatch()

  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const socketData = useSelector((state) => state.socket.socketData)

  return (
    <ProfileContainer>
      <div onClick={() => dispatch(logoutUser())} className="disconnect">
        <img src={logoutSvg} alt="" />
      </div>
      <div className="head">
        <div className="pfp">
          {isAuthenticated ? <Avatar enableChange={true} /> : socketData && <Avatar optionProps={socketData.avatar} />}
        </div>
        <div className="infos">
          {isAuthenticated ? (
            <>
              <div className="name">{user?.username || "Visiteur"}</div>
              <div className="email">{user?.email}</div>
            </>
          ) : (
            <div className="name">{socketData?.name}</div>
          )}
        </div>
      </div>
      {isAuthenticated ? (
        <>
          <div className="personal-infos section">
            <div className="header">
              <div className="title">Your infos</div>
              <div className="edit">Edit</div>
            </div>
            <div className="content"></div>
          </div>
          <div className="stats section">
            <div className="header">
              <div className="title">Your stats</div>
            </div>
            <div className="content"></div>
          </div>
        </>
      ) : (
        <div className="not-logged-in">
          <div className="body">
            <div className="sad-chammy">sad chammy :(</div>
            <div className="txt">Create an account to have access to skins, levels and save your stats !</div>
          </div>
          <div className="buttons">
            <Button
              onClick={() => {
                dispatch(setAuthMode("REGISTER"))
                dispatch(toggleAuth())
              }}
            >
              Sign up
            </Button>
            <Button
              onClick={() => {
                dispatch(setAuthMode("LOGIN"))
                dispatch(toggleAuth())
              }}
              size="small"
              variant="dark"
            >
              Log in
            </Button>
          </div>
        </div>
      )}
    </ProfileContainer>
  )
}

export default Profile
