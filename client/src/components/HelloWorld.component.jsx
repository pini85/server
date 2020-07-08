import React, { useEffect, useState } from 'react';
const HelloWorld = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchFunc = async () => {
      const response = await fetch('/test');
      const data = await response.json();
      setMessage(data.data);
    };
    fetchFunc();
  });
  return <div>{message}</div>;
};
export default HelloWorld;
