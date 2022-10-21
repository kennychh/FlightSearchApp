import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Plane = (props) => {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.083 5.217H2.6l1.034 1.4h3l-1.55-5.4h1.95l3.083 5.4H13.4c.389 0 .716.133.983.4.267.266.4.594.4.983s-.133.717-.4.983c-.266.267-.594.4-.983.4h-3.283l-3.083 5.4h-1.95l1.55-5.4h-3l-1.034 1.4H1.083L1.983 8l-.9-2.783z"
        fill="#757575"
      />
    </Svg>
  );
};
