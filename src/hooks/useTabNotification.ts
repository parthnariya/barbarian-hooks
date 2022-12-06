import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
const originalTitle = document.title;

const tick = (message: string) => {
  document.title = document.title === message ? originalTitle : message;
};

function useTabNotification  (interval = 1000):[Dispatch<SetStateAction<string | undefined>>,() => void] {
  const [message, setMessage] = useState<string>();

  const intervalRef = useRef<number | null>();

  
function clearMessages() {
    document.title = originalTitle;
    setMessage(undefined);
  }
  

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(tick, interval, message);
    } else {
      resetTimer();
    }
  }, [message]);
                                              
  return [setMessage,clearMessages];
};
export default useTabNotification;
