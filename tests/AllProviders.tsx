import { PropsWithChildren } from "react";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AllProviders = ({ children }: PropsWithChildren) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  return (
    <QueryClientProvider client={client}>
      {/* <CartProvider> */}
        <Theme>
          {children}
        </Theme>
      {/* </CartProvider> */}
    </QueryClientProvider>
  )
}

export default AllProviders;