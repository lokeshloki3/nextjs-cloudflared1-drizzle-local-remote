Demo - https://nextjs-cloudflared1-drizzle-local-remote.pages.dev/


npx create-next-app@latest nextjs-cloudflared1-drizzle-local-remote

cd ./ and npm i

wrangler whoami
wrangler logout
wrangler login - login to cloudflare via Chrome link

overwrite and update package.json dev and prod dependencies this will install these automatically(npm install wrangler @cloudflare/next-on-pages drizzle-kit drizzle-orm@latest cross-env better-sqlite3)

package.json
"dependencies": {
    "@tanstack/react-query": "^5.62.10",
    "jose": "^5.9.6",
    "next": "15.1.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "server-only": "^0.0.1",
    "superjson": "^2.2.2",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@cloudflare/next-on-pages": "^1.13.7",
    "@cloudflare/workers-types": "^4.20241224.0",
    "@eslint/eslintrc": "^3",
    "@t3-oss/env-nextjs": "^0.11.1",
    "better-sqlite3": "^11.7.0",
    "cross-env": "^7.0.3",
    "drizzle-kit": "^0.23.0",
    "drizzle-orm": "^0.31.0",
    "eslint": "^9",
    "eslint-config-next": "15.1.6",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "wrangler": "^3.99.0"
  },
  "engines": {
    "node": "20.17.0"
  }

npm i
npm update

npm install --force

Update wrangler.toml
Upgate Scripts and Node Engine in package.json
drizzle.config.js
next.config.mjs
.node-version (Most important for deployment - Your version by node -v command 20.17.0 - save this in file)
.gitignore
.env
env.js
db/schema.js
db/index.js
.github/workflows/prod.yml and prod-migration.yml

npm run db:generate

npm run db:migrate:dev

In package.json - "db:studio:dev": "cross-env DB_LOCAL_PATH=.wrangler/state/v3/d1/miniflare-D1DatabaseObject/3095f66bdf147a1af06cac8789b263350220e937d2ce4225bec653a189ab06e9.sqlite drizzle-kit studio --port 3094",
Change path with exact db file

npm run db:migrate:prod

To see db -
npm run db:studio:dev  (local db) - has location of local db path in scripts
npm run db:studio:prod  (remote db)

db id -
Either create manually or by command npx wrangler d1 create your-database-name
Add bindings in wrangler.toml

To see database id - wrangler d1 list
To see account id - wrangler whoami
To see api token - Create one from cloudflare profile with D1, Scripts, Pages - Edit permission

Create a Cloudflare Pages - select Next.js and rest defaults

wrangler.toml

name = "nextjs-cloudflared1-drizzle-local-remote"  - Cloudflare Pages name
compatibility_date = "2025-02-05"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "nextdb" # When you create your D1 DB, you choose the name
database_id = "5d351442"

Add flag on Cloudflare Page settings - nodejs_compat
And also add Variable as Key Value pair NODE_VERSION 20.17.1

Add these three in Github Repo settings - Actions then Repo secrets - 
CLOUDFLARE_ACCOUNT_ID=c953a6df9
DB_REMOTE_DATABASE_ID=5d35625
CLOUDFLARE_API_TOKEN=9_qPe
JWT_TOKEN=

Create Random JWT Token for Oauth 2.0 - node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

Now create all files for frontend and api
But write functions in functions folder - we will interact will it only - No directly hitting and endpoint

As "pages:build": "npm next-on-pages", doesn't work on Windows so we will check all features by
npm run dev with local db interactions
And when deploy on Github - Github Actions will run all Linux commands for us and deploy the website then we can check website with remote db

npm run dev - To test site locally


For frontend icons - npm install lucide-react

use Web Crypto API (crypto.subtle.digest) method for password hashing with SHA-256 as bcrypt not supported in edge environment

use jose method for token as jsonwebtoken not supported in edge environment

npm i jose

Extra things to install for frontend -
npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
npm install lucide-react

    "@fullcalendar/daygrid": "^6.1.15",
    "@fullcalendar/interaction": "^6.1.15",
    "@fullcalendar/react": "^6.1.15",
    "@fullcalendar/timegrid": "^6.1.15",
    "lucide-react": "^0.474.0",
	
Install sqlite editor extension to see local db in VS Code
