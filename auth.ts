import { addUser } from "@/app/service/user";
import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import google from "next-auth/providers/google";

const providers: Provider[] = [google];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return {
      id: providerData.id,
      name: providerData.name,
    };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google],
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      if (!email || !id) {
        return false;
      }
      console.log(id, name, email);
      addUser({
        id,
        username: email.split("@")[0],
        name: name || "",
        image,
        email,
      });
      return true;
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0] || "",
          id: token.id as string,
        };
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
