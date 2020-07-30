import React from "react"
import styled from "styled-components"
import { motion, useDragControls } from "framer-motion"
import { styles } from "../../assets/defaultStyles"
import { useRef } from "react"

const StyledRange = styled(motion.div)`
  width: 100%;
  position: relative;
  .rail {
    background: ${styles.black.light};
    height: 20px;
    width: 100%;
    border-radius: 10px;
  }

  .sphere {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background: ${styles.blue};
    height: 25px;
    width: 25px;
    border-radius: 50%;
    ${styles.flexCentered};
  }
`

const clamp = (number, min, max) => Math.min(Math.max(number, min), max)

const RangeSelector = ({ value, setValue, range = 16 }) => {
  const constraintsRef = useRef(null)

  const dragControls = useDragControls()

  const startDrag = (event) => {
    dragControls.start(event, { snapToCursor: true })
  }

  const onDragHandler = (event, { offset }) => {
    let val = offset.x / constraintsRef.current.getBoundingClientRect().width
    val = clamp(val, 0, 1)
    val *= range
    val = Math.floor(val)
    if (val !== value) setValue(val)
  }

  return (
    <StyledRange>
      <div onMouseDown={startDrag} ref={constraintsRef} className="rail"></div>
      <motion.div
        drag="x"
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragControls={dragControls}
        className="sphere"
        onDrag={onDragHandler}
      >
        <span>{value}</span>
      </motion.div>
    </StyledRange>
  )
}

export default RangeSelector
