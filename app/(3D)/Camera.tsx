import React from 'react'
import { useFrame } from '@react-three/fiber'

function Camera({ zoom } : { zoom: number }) {

  useFrame(({ camera, mouse, size:{width} }) => { 
      if (width < 768) return;
      
        camera.position.z = zoom;
        camera.position.x = mouse.x * 2.25;
    })

  return (<perspectiveCamera position={[0, 0, 2]} far={80} near={0.1} />
  )
}

export default Camera