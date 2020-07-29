import React, { useState, useEffect, useCallback } from "react"
import Avatar from "avataaars"
import resetSvg from "../assets/icons/reset.svg"
import { useSelector, useDispatch } from "react-redux"
import { editAvatar } from "../redux/actions/profileActions"
import debounce from "lodash.debounce"

const avatarOptions = {
  avatarStyle: ["Circle"],
  topType: [
    "NoHair",
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

const nakedButOneOptions = (specificOption) => {
  let options = {}
  for (const prop in avatarOptions) {
    if (prop === Object.keys(specificOption)[0]) {
      options[prop] = specificOption[prop]
    } else {
      options[prop] = "a"
    }
    options.avatarStyle = "Circle"
  }
  return options
}

const RandomAvatar = ({ enableChange, optionProps, naked, randomizeOnClick }) => {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [options, setOptions] = useState(naked ? nakedButOneOptions(optionProps) : optionProps || user.avatar)

  // first create a debounced function that dispatch the edit action
  const debouncedEditAvatar = debounce((options) => {
    dispatch(editAvatar(options))
  }, 1000)
  // then memoize so it's not redefined on each rerender which would cause the debounce timer to reset
  const memoUpdateAvatar = useCallback(debouncedEditAvatar, [])

  useEffect(() => {
    let int
    if (randomizeOnClick) {
      int = setInterval(() => {
        const newOptions = randomOptions()
        newOptions.topType = optionProps.topType
        setOptions(newOptions)
      }, 500)
    }

    return () => clearInterval(int)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateOptions = () => {
    const newOptions = randomOptions()
    setOptions(newOptions)
    if (isAuthenticated) memoUpdateAvatar(newOptions)
  }

  useEffect(() => {
    setOptions(naked ? nakedButOneOptions(optionProps) : optionProps || user.avatar)
  }, [optionProps, naked, user])

  return (
    <>
      <Avatar {...options} />
      {enableChange && (
        <div onClick={updateOptions} className="change">
          <img src={resetSvg} alt="" />
        </div>
      )}
    </>
  )
}

export default RandomAvatar
