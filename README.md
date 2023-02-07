

# MyContactsApp (PET)
##### JSON-SERVER + REACT + TYPESCRIPT + ZUSTAND

A simple web-application with authorization where you can find people by the search panel and save them into your contacts. 

![](https://github.com/yphwd/PET-my-contacts-app/blob/main/assets/preview.gif?raw=true)


### Tech stack
- Powered by **Typescript** (v4.9.5+).
- Version of **NodeJS** is 18.13.0.
- You need to have **NPM** (v8.13.2+) and **YARN** (v1.22.19+) installed globally.

#### Server-side
- **JSON-SERVER** to provide an CRUD interaction with db.json file that stores data.  This package makes it possible to create, remove, update (particularly and completely) your data. Though it is similar to the real database, it do not deliver any selecting tools unfortunately so I had need to write a couple of controllers.
- **JSON-SERVER-AUTH** is responsible for authentication and authorization. In additional it provides a more easier way to set up private routes.
- **EXPRESS** provides routing and convenient way to set up controllers.

#### Client-side
- **VITE** is a package manager (it's my first experience).
- **REACT** v18+ provides many instruments to create dynamic pages and reuse JS DOM objects that translates into HTML by a simple for a developer way.
- **ZUSTAND** is a state manager, the main idea of which is divide the single state (like in Redux) to a few modules of state that is almost not linked to each other. It also provides an opportunity to stop thinking about deep copying, this one do it instead of programmer.
- **TAILWIND**. I love this tool more than native CSS or Bootstrap because it has a cgood documentation and clear in use.
- **MUI** is a component library. It was my first expreriense of using such things. I'm really satisfied of fashion-styled buttons and inputs.



### Installation

##### The first way

1. The first step is installing dependencies. Open root redictory and run the command:
```sh
npm run modules
```
2. Create in `/client` directory a file `.env` and write there this line:
```sh
VITE_BACKEND_URL='http://localhost:3001/'
```

3. When all dependencies installed, you can run the application by a command:
```sh
npm run dev
```

##### The second way

If something went wrong in the first way, you can try the another one. You need to run two scripts in different therminals. 
1. The first step is installing and launching backend part. Open your therminal, so you need go to folder `/backend` and install required dependencies:
```sh
cd backend/
npm install 
```
After installation, you have to run it by the command:
```sh
npm run dev
```

2. Open `/client` directory and install dependencies to frontend implementation:
```sh
cd frontend/
yarn install
```
Create in the same directory a file `.env` and write there this line:
```sh
VITE_BACKEND_URL='http://localhost:3001/'
```
After installation you can already run application:
```sh
npm run dev
```
That's all! Now you can enjoy the application.

### Afterword
I used to create frontend apps with such state managers as Redux or MobX, but recently I met a new tool called Zustand. While developing this PET project I found it thoroughly simple and convenient, because I had no need to think about a deep copy when state changes and bother with many action creators and thunks which, by the way, require extra npm packages.
