import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {

  console.log("ref,handler",ref,handler)
  useEffect(() => {

    const listener = (event) => {
      // Check if the click/touch happened outside
      if ( ref.current && !ref.current.contains(event.target) ) {
        handler(event);

      }

    };
    
    // Mouse devices
    document.addEventListener("mousedown", listener);

    // Touchscreen devices
    document.addEventListener("touchstart", listener);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}