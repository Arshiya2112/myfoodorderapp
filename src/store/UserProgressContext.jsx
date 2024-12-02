/*This file defines a React Context for managing and sharing the state of a user's progress across multiple components */

import { useState } from "react"; //used to manage and update state in functional components.
import { createContext } from "react"; //creates a context object. This is used to share state or methods across components without passing props manually at every level.

const UserProgressContext = createContext({ //initializes a context with a default value
    progress: '', //represents the current user progress state
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}, //placeholder functions that are later replaced by actual implementations provided by context provider.
});

export function UserProgressContextProvider({ children }) { //a component that wraps other components to give them access to the context
    const [userProgress, setUserProgress] = useState(''); //initializes state userProgress and updates it

    function showCart() { //utility methods for updating userProgress state
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() { 
        setUserProgress('');
    }

    const userProgressCtx = { //an object that bundles the current state (userProgress) and state management functions. This object will be provided to any components wrapped by UserProgressContext.Provider
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    };

    return (
        <UserProgressContext.Provider value = {userProgressCtx}> 
            {children} 
        </UserProgressContext.Provider> //Context provider component with values as data and methods to be made available to consuming components, children are the child components that will have access to context.
    );
}

export default UserProgressContext;