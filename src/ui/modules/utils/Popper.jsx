import React, { useState, useEffect } from "react";

const Popper = ({ message, type, isVisible, duration = 3000 }) => {
  const [visible, setVisible] = useState(false); // Directly control visibility

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer); // Cleanup timeout
    } else {
      setVisible(false); // If isVisible becomes false, hide the popper immediately
    }
  }, [isVisible, duration]);

  return visible ? (
    <div
      className={`fixed z-[999] bottom-10 left-1/2 transform -translate-x-1/2 p-4 rounded-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white shadow-lg`}
    >
      {message}
    </div>
  ) : null;
};

export default Popper;
