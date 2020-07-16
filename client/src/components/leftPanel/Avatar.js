import React, { useState, useEffect } from "react"
import Avatar from "avataaars"
import resetSvg from "../../assets/icons/reset.svg"

const avatarOptions = {
  avatarStyle: ["Circle"],
  topType: [
    "NoHair",
    "Eyepatch",
    "Hat",
    "Hijab",
    "Turban",
    "WinterHat1",
    "WinterHat2",
    "WinterHat3",
    "WinterHat4",
    "LongHairBigHair",
    "LongHairBob",
    "LongHairBun",
    "LongHairCurly",
    "LongHairCurvy",
    "LongHairDreads",
    "LongHairFrida",
    "LongHairFro",
    "LongHairFroBand",
    "LongHairNotTooLong",
    "LongHairShavedSides",
    "LongHairMiaWallace",
    "LongHairStraight",
    "LongHairStraight2",
    "LongHairStraightStrand",
    "ShortHairDreads01",
    "ShortHairDreads02",
    "ShortHairFrizzle",
    "ShortHairShaggyMullet",
    "ShortHairShortCurly",
    "ShortHairShortFlat",
    "ShortHairShortRound",
    "ShortHairShortWaved",
    "ShortHairSides",
    "ShortHairTheCaesar",
    "ShortHairTheCaesarSidePart",
  ],
  accessoriesType: ["Blank", "Kurt", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers"],
  hairColor: [
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "PastelPink",
    "Platinum",
    "Red",
    "SilverGray",
  ],
  facialHairType: ["Blank", "BeardMedium", "BeardLight", "BeardMagestic", "MoustacheFancy", "MoustacheMagnum"],
  clotheType: [
    "BlazerShirt",
    "BlazerSweater",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "ShirtCrewNeck",
    "ShirtScoopNeck",
    "ShirtVNeck",
  ],
  eyeType: [
    "Close",
    "Cry",
    "Default",
    "Dizzy",
    "EyeRoll",
    "Happy",
    "Hearts",
    "Side",
    "Squint",
    "Surprised",
    "Wink",
    "WinkWacky",
  ],
  eyebrowType: [
    "Angry",
    "AngryNatural",
    "Default",
    "DefaultNatural",
    "FlatNatural",
    "RaisedExcited",
    "RaisedExcitedNatural",
    "SadConcerned",
    "SadConcernedNatural",
    "UnibrowNatural",
    "UpDown",
    "UpDownNatural",
  ],
  mouthType: [
    "Concerned",
    "Default",
    "Disbelief",
    "Eating",
    "Grimace",
    "Sad",
    "ScreamOpen",
    "Serious",
    "Smile",
    "Tongue",
    "Twinkle",
    "Vomit",
  ],
  skinColor: ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"],
}

const randomOptions = () => {
  let options = {}
  for (const prop in avatarOptions) {
    options[prop] = avatarOptions[prop][Math.floor(Math.random() * avatarOptions[prop].length)]
  }
  return options
}

const RandomAvatar = ({ enableChange, optionProps }) => {
  const [options, setOptions] = useState(optionProps)

  useEffect(() => {
    // if options are passed through props use them
    if (!optionProps) {
      // else check for local storage and if not found create options
      if (localStorage.getItem("avatarOptions")) {
        setOptions(JSON.parse(localStorage.getItem("avatarOptions")))
      } else {
        updateOptions()
      }
    }
  }, [])

  const updateOptions = () => {
    const newOptions = randomOptions()
    setOptions(newOptions)
    localStorage.setItem("avatarOptions", JSON.stringify(newOptions))
  }

  return (
    <>
      <Avatar {...(optionProps || options)} />
      {enableChange && (
        <div onClick={updateOptions} className="change">
          <img src={resetSvg} alt="" />
        </div>
      )}
    </>
  )
}

export default RandomAvatar
