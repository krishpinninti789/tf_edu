import React from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
