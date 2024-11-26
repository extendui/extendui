import React from 'react';

export const hasNestedElementOfType = (
  children: React.ReactNode,
  types: any[],
): boolean => {

  const typeDisplayNames = new Set(types.map(type => type.displayName));
  
  const checkChild = (child: React.ReactNode): boolean => {
    if (!React.isValidElement(child)) {
      return false;
    }

    const childType = child.type as any
    if (
      types.includes(childType) || 
      (childType.displayName && typeDisplayNames.has(childType.displayName))
    ) {
      return true;
    }

    if ((child.props as React.PropsWithChildren)?.children ) {
      if (React.Children.count((child.props as React.PropsWithChildren).children) > 0) {
        let hasMatch = false;
        React.Children.forEach((child.props as React.PropsWithChildren).children, (nestedChild) => {
          if (checkChild(nestedChild)) {
            hasMatch = true;
          }
        });
        return hasMatch;
      }
    }

    return false;
  };

  const childrenArray = React.Children.toArray(children);
  
  return childrenArray.some(child => checkChild(child));
};