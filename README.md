# 📚 Iverson Publishing App

## Setup instructions
Before you start to run this project the following tools need to be installed on your machine, `homebrew`, `postgres` (mysql works too) and `node`
### 1. Environment
First we need to install node.js, this can be done through homebrew using.
```console
$ brew install node
```
Optionally if you don't have one already, you'll need a sql-like database ready on your machine. This can be either postgres or mySQL but postgres is preferred.
```console
$ brew install postgres
```
### 2. Node
The backbone of the website is built on `node.js` and `next` so next we need to install and setup both. First we need to verify that both are up to date and installed correctly.
```console
$ npm --version
This should be v8.11.0 or later

$ node --version
This should be v18.3.0 or later
```
Providing that both of these don't fail, we can now install the project dependencies using.
```console
$ npm i
```
### 3. Database
For this part i'll be assuming that you already have a blank database to use and if not you'll need to do that. Fist thing is to setup your environment variables so that the project knows where to look.

inside the file `/prisma/schema.prisma` edit the following and replace these parts where needed
```
datasource db {
  provider = "[mysql or postgres]"
  url      = "[mysql or postgres]://[username]:[password]@[url]:[port]/[database]"
}
```
Once that's done, save the file and enter the following commands
```console
$ npx prisma format

$ npx prisma db push
```
If all goes well then a set of blank tables should be in your database and while it's not required you can use 
```console
$ npx prisma studio
```
to edit data directly to your database in a way that can use prisma's advanced types and enums, it's also a good chance to make yourself a user in the `Users` table
### 4. All done 
Now everything is ready, you can run the startup command and a server should start at `localhost:3000`
```console
$ npm run dev
```