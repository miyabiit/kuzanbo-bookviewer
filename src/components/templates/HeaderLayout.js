import { memo } from "react";
import { Header } from "../../components/organisms/layout/header";

export const HeaderLayout = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});
