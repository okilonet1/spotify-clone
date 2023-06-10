import { FC } from "react";
import SupabaseProvider from "./SupabaseProvider";
import { MyUserContextProvider } from "@/hooks/useUser";
import ModalProvider from "./ModalProvider";
import ToasterProvider from "./ToasterProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ToasterProvider />
      <SupabaseProvider>
        <MyUserContextProvider>
          <ModalProvider />
          {children}
        </MyUserContextProvider>
      </SupabaseProvider>
    </>
  );
};

export default Providers;
