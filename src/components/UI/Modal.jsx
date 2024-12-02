/*Defines a reusable Modal component that leverages HTML <dialog> element and React Portals to create a Modal (Popup) interface.*/

import { useEffect } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = ''}) {
    const dialog = useRef(); //creates a reference to directly access the underlying DOM node for <dialog> element.

    useEffect(() => { //runs a side effect whenever the open prop changes
        const modal = dialog.current; //accesses the <dialog> element through the useRef hook.

        if(open) {
            modal.showModal(); //method of <dialog> element
        }

        return () => modal.close();
    }, [open]);

    return createPortal( //Portals allow rendering the modal in a DOM node outside the component's regular DOM hierarchy, this ensures the modal is not affected by parent container styles and can appear globally.
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}> 
            {children}
        </dialog>, //ref=dialog binds the dialog reference to the <dialog> DOM node
        document.getElementById('modal')
    );
}