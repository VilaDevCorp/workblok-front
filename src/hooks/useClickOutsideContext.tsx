import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useClickOutsideContext = (tableBodyRef: React.MutableRefObject<HTMLElement | null>, contextRef: React.MutableRefObject<HTMLElement | null>, onClick: () => void) => {

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            //The tablebodyref is used to avoid calling onClick when a element is selected, setting the selectedItems to []
            if (contextRef.current && !contextRef.current.contains(e.target as Node) && tableBodyRef.current && !tableBodyRef.current.contains(e.target as Node)) {
                onClick()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [tableBodyRef, contextRef]);
}

