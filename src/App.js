import React, { useRef } from 'react'
import { Illustration, Shape, Ellipse, useRender, Anchor } from 'react-zdog'
import './App.css'
import * as Color from 'color2'

function Slice(props) {
  const sliceRef = useRef()
  const TAU = Math.PI * 2
  let rotate = 0

  /*useRender(t => {
    if (props.last && rotate > -TAU / 4) {
      rotate -= 0.01
      sliceRef.current.rotate.x = rotate
    }
  })
*/
  return (
    <Anchor
      translate={{
        z: props.z
      }}
    >
      <Shape
        ref={sliceRef}
        translate={{ z: -120, x: -40 }}
        path={[
          { x: 0, y: 0 }, // start
          {
            bezier: [
              { x: -40, y: 0 }, // start control point
              { x: 0, y: -60 }, // end control point
              { x: 45, y: -60 } // end point
            ]
          },
          {
            bezier: [
              { x: 90, y: -60 }, // start control point
              { x: 120, y: 0 }, // end control point
              { x: 90, y: 0 } // end point
            ]
          },
          {
            line: [
              { x: 90, y: 70 }
            ]
          },
          { line: [{ x: 0, y: 70 }] },
          { line: [{ x: 0, y: 0 }] }
        ]}
        stroke={20}
        fill
        closed={false}
        color={props.color}
      />
    </Anchor>
  )
}

function Loaf() {
  const loafRef = useRef()
  const rand = (min, max) => Math.random() * (max - min) + min

  useRender(t => {
    loafRef.current.rotate.y += 0.005

    loafRef.current.rotate.z -= 0.005
  })

  const slices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  console.log(rand(0, 1))
  return (
    <Anchor ref={loafRef}>
      {slices.map(n => {
        let ryebrown = new Color('#ae7646')
        return (
          <Slice
            z={n * 20}
            color={ryebrown.darken(Math.min(((1/(n/1.2))) -0.1, 0.4))}
            last={n === slices.length - 1}
          />
        )
      })}
    </Anchor>
  )
}

function App() {
  return (
    <main className='loaf'>
      <Illustration zoom={2}>
        <Loaf />
      </Illustration>
    </main>
  )
}

export default App
