"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store";

type Props = PropsWithChildren;

const queryClient = new QueryClient({});

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </SessionProvider>

      <ReactQueryDevtools client={queryClient} />
    </QueryClientProvider>
  );
};

export default Providers;
