import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`  px-4  ${className}`}>
      {children}
    </div>
  );
};

export default Container;
