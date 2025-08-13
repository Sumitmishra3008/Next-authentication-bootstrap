# How to run

clone this repo<br>
`git clone https://github.com/Sumitmishra3008/Next-authentication-bootstrap.git`<br>

Install all the dependencies by running<br>
`npm install`<br>

Create .env file in root folder and update all the environment variables<br>

```
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=github_provider_id
GITHUB_SECRET=github_provider_secret
DATABASE_URL="postgresql://postgres:test123@localhost:5432/postgres"
GOOGLE_ID=google_provider_id
GOOGLE_SECRET=google_provider_secret
```

<br>
You can get your clientId and clientSecret from github and google account .<br>
Take help from any web tutorial and obtain your id and secret and paste it<br>
to the .env structure.If you face issues while migrating database make a .env<br>
file in ./lib/db and provide the DATABASE_URL there too .<br>

You can use postgres connection url that you can get from platforms like supabase<br>
or avion etc. In case you are using docker to run postgres container .<br>
Run<br>
`docker -e POSTGRES_PASSWORD=test123 -p 5432:5432 -d postgres`<br>
that would start a postgres container which has connection string as<br>
`"postgresql://postgres:test123@localhost:5432/postgres"`<br>
Navigate to ./lib/db and run <br>
`npx prisma migrate dev --name "migration_name"`<br>
and generate prisma client by running <br>
`npx prisma generate` <br>
After you have obtained a working postgres connection either online or locally ,<br>
run <br>
`npm run dev`<br>
