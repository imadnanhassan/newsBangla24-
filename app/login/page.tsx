import { Metadata } from "next";
import LoginClient from "../../components/clients/LoginClient";

export const metadata: Metadata = {
  title: "Login - NewsBangla24",
  description: "Login to access your NewsBangla24 account.",
  keywords: "login, authentication, news, bangla",
};

export default function LoginPage() {
  return <LoginClient />;
}
