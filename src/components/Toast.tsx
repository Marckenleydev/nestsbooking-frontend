import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-3 rounded-md bg-white text-green-600 bg-green-100 max-w-md"
      : "fixed top-4 right-4 z-50 p-3 rounded-md bg-white text-red-500 max-w-md bg-red-100";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-normal">{message}</span>
      </div>
    </div>
  );
};

export default Toast;