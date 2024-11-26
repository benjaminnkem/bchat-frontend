import { NextAuthOptions } from "next-auth";
import ClientProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    ClientProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        return { id: crypto.randomUUID() };
      },
    }),
  ],
};

export default authOptions;
