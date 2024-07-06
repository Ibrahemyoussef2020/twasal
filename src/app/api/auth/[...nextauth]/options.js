import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
        authorization: { params: { scope: 'read:user user:email' } },
    }),
    // ...add more providers here
  ],
  debug: true,
};
