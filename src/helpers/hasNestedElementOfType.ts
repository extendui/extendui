import React from 'react';

export const hasNestedElementOfType = (
  children: React.ReactNode,
  types: any[],
): boolean => {
  // Create a Set of component displayNames for faster lookup
  const typeDisplayNames = new Set(types.map(type => type.displayName));
  
  const checkChild = (child: React.ReactNode): boolean => {
    if (!React.isValidElement(child)) {
      return false;
    }

    // Check both the direct type and displayName
    const childType = child.type as any
    if (
      types.includes(childType) || 
      (childType.displayName && typeDisplayNames.has(childType.displayName))
    ) {
      return true;
    }

    // Check children recursively
    if (child.props?.children) {
      // Handle both single child and array of children
      if (React.Children.count(child.props.children) > 0) {
        let hasMatch = false;
        React.Children.forEach(child.props.children, (nestedChild) => {
          if (checkChild(nestedChild)) {
            hasMatch = true;
          }
        });
        return hasMatch;
      }
    }

    return false;
  };

  // Use Children.toArray to handle null/undefined children safely
  const childrenArray = React.Children.toArray(children);
  
  // Check each child in the array
  return childrenArray.some(child => checkChild(child));
};