import React from "react";

export const hasNestedElementOfType = (
    children: React.ReactNode,
    types: Array<React.JSXElementConstructor<any>>
  ): boolean => {
    let found = false;
  
    const checkChild = (child: React.ReactNode) => {
      if (React.isValidElement(child)) {
        if (types.includes(child.type as React.JSXElementConstructor<any>)) {
          found = true;
          return;
        }
        if (child.props.children) {
          React.Children.forEach(child.props.children, checkChild);
        }
      }
    };
  
    React.Children.forEach(children, checkChild);
    return found;
  };
  