import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

export const Airlines = (props) => {
  return (
    <Svg
      width={20}
      height={16}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#a)">
        <Path
          d="M3.8 14h11.55L17.6 2h-5.55L3.8 14zM0 16L10.05 1.375a3.2 3.2 0 011.088-1C11.578.125 12.05 0 12.55 0h5.05c.633 0 1.146.242 1.538.725.39.483.529 1.033.412 1.65L17 16H0zm3.8-2h11.55H3.8z"
        />
      </G>
    </Svg>
  )
}
