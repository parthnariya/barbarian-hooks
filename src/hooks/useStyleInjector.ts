import React from "react";
import {CSSProperties, ReactElement} from "react";

function useStyleInjector (styles : CSSProperties,children : ReactElement[]) {
    return React.Children.map(children, (child) => {
        return React.cloneElement(child, { style: styles });
      });
}
export default useStyleInjector