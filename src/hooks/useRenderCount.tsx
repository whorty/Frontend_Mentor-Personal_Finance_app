import { useRef } from "react";

export function useRenderCount(name: string) {
  const count = useRef(1);
  console.log(`${name} render #${count.current++}`);
}
