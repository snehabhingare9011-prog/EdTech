import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {

  console.log("ref,handler",ref,handler)
  useEffect(() => {

    const listener = (event) => {
      // Check if the click/touch happened outside
      if ( ref.current && !ref.current.contains(event.target) ) {
        handler(event);

      }

    //   "dropdownRef.current.contains(event.target) checks whether the element that the user clicked is inside the DOM element referenced by dropdownRef. If it returns true, the click is inside the dropdown, so we don't close it. If it returns false, the click is outside the dropdown, so we call setOpen(false) to close it."

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

//Q 1  "useEffect runs once because the dependency array is empty. During that execution, addEventListener registers the listener function with the browser for the mousedown event. After that, the browser is responsible for listening for mousedown. Whenever a mousedown occurs, the browser automatically calls the registered listener with the event object. useEffect does not run again for every click."

//Q 2 "useState is used to store and manage state. When we update state using its setter function, React re-renders the component. useRef is used to persist a value between renders, and it can also hold a reference to a DOM element. Updating ref.current does not cause the component to re-render."

// Q 3 "The cleanup function removes the event listener when the component unmounts or before the effect is re-run. Without cleanup, old listeners can remain attached to the document. If the component mounts again, additional listeners may be added, causing multiple handlers to execute for a single event and potentially causing performance or memory issues."