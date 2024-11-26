import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../constant/env";

const SocketContext = createContext<Socket | null>(null);

const socket = io(API_URL);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default SocketProvider;
