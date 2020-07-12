import React from "react"
import styled from "styled-components"
import { styles, Button, ButtonSmall } from "../../assets/defaultStyles"
import { useDispatch } from "react-redux"
import { toggleAuth, setAuthMode } from "../../redux/actions/interfaceActions"

const mockupUser = {
  username: "Zoomer",
  email: "maxime.druart@hetic.net",
  stats: {},
}

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
  }
  .head {
    margin-top: 25px;
    width: 85%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .pfp {
      width: 115px;
      height: 115px;
      border-radius: 50%;
      background-color: ${styles.blue};
      flex-shrink: 0;
      position: relative;
      .add {
        position: absolute;
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
  const isLoggedIn = false
  const dispatch = useDispatch()
  return (
    <ProfileContainer>
      <div className="disconnect">dc</div>
      <div className="head">
        <div className="pfp">
          <div className="img"></div>
          <div className="add"></div>
        </div>
        <div className="infos">
          <div className="name">{mockupUser.username}</div>
          {isLoggedIn && <div className="email">{mockupUser.email}</div>}
        </div>
      </div>
      {isLoggedIn ? (
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
            <ButtonSmall
              onClick={() => {
                dispatch(setAuthMode("LOGIN"))
                dispatch(toggleAuth())
              }}
              variant="dark"
            >
              Log in
            </ButtonSmall>
          </div>
        </div>
      )}
    </ProfileContainer>
  )
}

export default Profile
