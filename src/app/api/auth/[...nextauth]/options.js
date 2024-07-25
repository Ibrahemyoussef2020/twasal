import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
        authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],
  callbacks:{
    async session({session,token}){
      session.user.uid = token.sub ;
      session.user.username = session.user.name?.split(' ').join('');
      return session
    }
  }
};
