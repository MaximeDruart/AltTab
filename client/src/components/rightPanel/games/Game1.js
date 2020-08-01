/* eslint-disable */
import React, { useState, useEffect, useRef, Suspense } from "react"
import * as THREE from "three"
import { Canvas, useFrame, Dom, extend } from "react-three-fiber"
import { Physics, useBox, useSphere, usePlane, useCylinder } from "use-cannon"

import { styles } from "../../../assets/defaultStyles"
import OrbitControls from "./threeHelpers/OrbitControls"
import { getExtrudedEllipse, gradientMap } from "./threeHelpers/utils"

const arenaShape = getExtrudedEllipse(64, 5)

const extrudeSettings = {
  steps: 6,
  depth: 0.8,
  bevelEnabled: true,
  bevelThickness: 0.4,
  bevelSize: 0.5,
  bevelOffset: 0,
  bevelSegments: 5,
}

const Plane = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2 - Math.PI / 32, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  )
}

function Ball(props) {
  const [ref] = useSphere(() => ({ mass: 1, args: [1], ...props }))
  return (
    <mesh castShadow receiveShadow ref={ref}>
      <sphereBufferGeometry args={[1, 64, 64]} attach="geometry" />
      <meshToonMaterial gradientMap={gradientMap} color={styles.red} attach="material" />
    </mesh>
  )
}

const Arena = ({ ...props }) => {
  const [arenaMesh, arenaMeshApi] = useCylinder(() => ({ args: [5, 5, 1, 64], ...props }))
  const [arenaPosition, setArenaPosition] = useState()

  useFrame(({ mouse }) => {
    setArenaPosition({
      rotation: { y: (mouse.x * Math.PI) / 12, x: (mouse.y * Math.PI) / 12 },
    })
  })

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    arenaMeshApi.rotation.set(arenaPosition.rotation.x, 0, arenaPosition.rotation.y)

    let [x, y, z] = props.position
    arenaMeshApi.position.set(x, y, z)
  })

  return (
    <mesh castShadow receiveShadow ref={arenaMesh}>
      {/* <extrudeBufferGeometry args={[arenaShape, extrudeSettings]} attach="geometry" /> */}
      <cylinderBufferGeometry args={[5, 5, 1, 64]} attach="geometry" />
      <meshToonMaterial gradientMap={gradientMap} color={styles.red} attach="material" />
    </mesh>
  )
}

const Scene = () => {
  return (
    <Physics>
      <Arena position={[0, 2, 0]} />
      <Ball position={[0, 5, 0]} />
      <Plane position={[0, -2, 0]} />
    </Physics>
  )
}

const Game1 = () => {
  return (
    <Canvas
      gl={{ alpha: false, antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(styles.blue)
        gl.gammaFactor = 2.2
      }}
      camera={{ position: [0, 4, -10] }}
      colorManagement
      shadowMap
    >
      <ambientLight intensity={0.4} />
      <gridHelper args={[50, 50]} />
      <directionalLight castShadow position={[5, 10, 0]} intensity={1.5} />
      {/* <pointLight castShadow position={[5, 10, 0]} intensity={1.6} /> */}
      <OrbitControls enableDamping={true} enablePan={false} />
      <Suspense fallback={<Dom>loading...</Dom>}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}

export default Game1
