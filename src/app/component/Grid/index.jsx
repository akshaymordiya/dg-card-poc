import React from "react";
import styles from "./styles.module.scss";

const Grid = ({ children, classNames = "", ...props }) => {
  return (
    <div className={`${styles.grid_container} ${classNames}`} {...props}>
      {children}
    </div>
  );
};

Grid.displayName = "Grid";

Grid.Item = ({
  children,
  xs = undefined,
  sm = undefined,
  md = undefined,
  lg = undefined,
  xl = undefined,
  itemClass = "",
  deviceSize,
  ...props
}) => {
  const getClassNames = () => {
    const breakpoints = {
      'xs': xs || 12,
      'sm': sm || xs,
      'md': md || sm || xs,
      'lg': lg || md || sm || xs,
      'xl': xl || lg || md || sm || xs,
    };

    return Object.entries(breakpoints).reduce((cls, [key, breakpoint]) => {
      if (breakpoint) {
        cls += ` ${styles[`${key}-${breakpoint}`]}`;
        // cls += `${key}-${breakpoint}`;
      }

      return cls;
    }, "");
  };

  return (
    <div className={`${styles.grid_item} ${getClassNames()} ${itemClass}`} {...props}>
      {children}
    </div>
  );
};
Grid.Item.displayName = "Grid.Item";

export default Grid;
