/*Defines a custom hook named useHttp which combines asynchronous logic, state management and side effects to simplify making API calls.*/

import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config); //sends a network request to the given url with specified config

    const resData = await response.json(); //convert response to JSON

    if(!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        );
    }

    return resData;
}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try {
                const resData = await sendHttpRequest(url, { ...config, body: data });
                setData(resData);
            } catch (error) {
                setError(error.message || 'Something went wrong');
            }
            setIsLoading(false);
        },
        [url, config]
    );

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };
}