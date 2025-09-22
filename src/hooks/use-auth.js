import { useContext } from "react";
import { AuthCtx } from "@/contexts/auth.context";

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
