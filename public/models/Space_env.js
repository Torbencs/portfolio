/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/space_env.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.mountain_1.geometry} material={nodes.mountain_1.material} />
      <mesh geometry={nodes.mountain_3.geometry} material={materials['Material_0.004']} />
      <mesh geometry={nodes.mountain_2.geometry} material={nodes.mountain_2.material} />
      <mesh geometry={nodes.Plane.geometry} material={materials.groun} scale={0.1} />
    </group>
  )
}

useGLTF.preload('/space_env.glb')
