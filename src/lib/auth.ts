import { db } from '@/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { jwt, organization, username } from 'better-auth/plugins';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { oauthProvider } from "@better-auth/oauth-provider"; 
import * as schema from '@/db/schema';
import { ac, owner, admin, member } from "@/auth/permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username(), 
    tanstackStartCookies(),
    jwt(),
    oauthProvider({ 
      loginPage: "/auth/login", 
      consentPage: "/consent", 
      // ...other options
    }),
    organization({
      ac,
      dynamicAccessControl: {
        enabled: true,
      }
      // roles: {
      //   owner,
      //   admin,
      //   member,
      // }
    }),
  ],
});
