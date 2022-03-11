import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { Suspense } from "react";
import {
  Environment,
  OrbitControls,
  useHelper,
  PerspectiveCamera,
  OrthographicCamera,
  Plane,
  softShadows,
} from "@react-three/drei";
import { PointLightHelper } from "three";

import SpaceEnv from "./models/Space_env";

//Models
import { DirectionalLightHelper } from "three";

const Play = (props) => {
  const Light = () => {
    const ref = useRef();

    useHelper(ref, DirectionalLightHelper, 1, "black");
    return (
      <>
        <directionalLight
          color="white"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          intensity={1}
          position={[1, 10, 20]}
          ref={ref}
        />
      </>
    );
  };

  return (
    <Canvas shadows colorManagement>
      <Suspense fallback={null}>
        <OrthographicCamera makeDefault position={[0, 10, 4]} zoom={100} />
        <ambientLight intensity={1} />
        <OrbitControls />
        <Light />
        <SpaceEnv />
      </Suspense>
    </Canvas>
  );
};

export default Play;
