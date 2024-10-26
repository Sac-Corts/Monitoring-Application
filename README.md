
# NOC Project
The objective is to create a series of tasks using Clean Architecture with TypeScript.

## Development
1. Clone the .env.template file to .env.
2. Configure the environment variables.
3. Run the command npm install.
4. Start the databases with the command:
   ```
   docker compose up -d
   ```
5. Run 
   ```
   npx prisma migrate dev
   ```
6. Run ```npm run dev```

## Get Gmail Key
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)