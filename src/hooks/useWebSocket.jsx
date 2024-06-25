import {useEffect, useRef, useCallback} from "react";

const useWebSocket = (url) => {
  const socketRef = useRef(null);

  const closeWebSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      console.log("WebSocket connection closed.");
    }
  }, []);

  const onMessageHandler = useCallback((callback) => {
    if (socketRef.current) {
      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        callback(message);
      };
    } else {
      console.error("Error: WebSocket connection not initialized.");
    }
  }, []);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    return () => {
      closeWebSocket();
    };
  }, [url, closeWebSocket]);

  return {onMessageHandler, closeWebSocket};
};

export default useWebSocket;
