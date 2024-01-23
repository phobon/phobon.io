import { compose, space, layout, position } from "styled-system";
import { gridPosition } from "./gridPosition";

const allLayoutProps = compose(space, layout, position, gridPosition);
const { propNames } = allLayoutProps;
const allProps = [
  "fullWidth",
  "fullHeight",
  "cover",
  ...(propNames as string[]),
];

/**
 * A utility function to destructure layout props from a set of props.
 * This is useful for positioning items within an Higher Order Component and simplify the incoming API.
 */
export const destructureLayoutProps = (props: {
  [key: string]: any;
}): { [key: string]: any }[] => {
  const passthroughProps = {};
  const layoutProps = {};
  Object.keys(props).forEach((key: string) => {
    const prop = props[key];

    if (!allProps.includes(key)) {
      passthroughProps[key] = prop;
      return false;
    }

    layoutProps[key] = prop;
    return true;
  });

  return [layoutProps, passthroughProps];
};
