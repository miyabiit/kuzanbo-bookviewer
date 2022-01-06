import { memo, useCallback, useEffect } from "react";
import { useReserves } from "../../../hooks/useReserves";

export const Home = memo(() => {
  const { getReserves, loading, reserves } = useReserves();
  
  useEffect(() => getReserves(), [getReserves]);
  
  return(
    <>
      <h1>HOME</h1>
    </>
  )
});
