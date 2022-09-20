import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import AdminLayout from "../components/layouts/adminLayout";
import UserLayout from "../components/layouts/userLayout";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { AuthProvider } from "../contexts/auth";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-datetime/css/react-datetime.css";

const queryClient = new QueryClient();

const theme = extendTheme({
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps, router }: AppProps) {
  const getLayout =
    pageProps.typeLayout == "admin"
      ? () => (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        )
      : () => (
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        );

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {getLayout()}
            </PersistGate>
          </Provider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
