import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text3D, OrbitControls, useMatcapTexture, Center } from '@react-three/drei'
import { Model } from '../model/Gyrocomp'
import ModelR from '../model/Reactor'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

function Timer(props) {
    const [matcapTexture] = useMatcapTexture("CB4E88_F99AD6_F384C3_ED75B9");
    const ref = useRef();
    const [time, setTime] = useState(1)
    useEffect(() => {
        setTimeout(() => {
            setTime((count) => count + 1);
        }, 1000);
    });
    return (
        <>

            <Center scale={[0.9, 1, 1]}>
                <Text3D
                    scale={[0.3, 0.3, 0.3]}
                    ref={ref}
                    font={"/gt.json"}
                    curveSegments={24}
                    brevelSegments={1}
                    bevelEnabled
                    bevelSize={0.08}
                    bevelThickness={0.03}
                >
                    {props.text}
                    <meshStandardMaterial emissive='red' emissiveIntensity={1} toneMapped={false} />

                </Text3D>
            </Center>
        </>
    );
}


export default function Main(props) {
    return (
        <div>
            <Canvas style={{ ...props.style }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <ModelR></ModelR>
                <Timer text={props.text} />
                <Model rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                {props.interactive ? <OrbitControls /> : <></>}
            </Canvas>
        </div>
    )
}

Main.defaultProps = {
    text : '.'
}
