"use client";

import { FC, useEffect } from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

interface AuthModalProps {}

const AuthModal: FC<AuthModalProps> = ({}) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { close, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      close();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      close();
    }
  }, [session, router, close]);

  return (
    <Modal
      title="Welcome back"
      description="Sign in to your account to continue"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        magicLink
        providers={[]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
