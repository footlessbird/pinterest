# Pinterest Clone
***https://ppinterest.herokuapp.com/***

### About this project
[freeCodeCamp](https://www.freecodecamp.org/learn/coding-interview-prep/take-home-projects/build-a-pinterest-clone)


### Prerequisites
| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| [yarn](https://yarnpkg.com/lang/en/docs/install/) | `^1.22.0` | 
| [Node.js](http://nodejs.org)| `^13.8.0`| 
| [TypeScript](https://www.typescriptlang.org/) | `^3.9.5`  |
| [React.js](https://reactjs.org/) | `^16.13.1` |
| [Express.js](https://expressjs.com/) | `^4.17.1` |
| [Mongoose](https://mongoosejs.com/) | `^5.9.15` |


### Getting Started

Cloning repository
```
git clone https://github.com/footlessbird/pinterest.git
cd A_Directory_You_Set
```

Installing packages 
```
[In root directory] yarn install
cd client && yarn install
cd sever && yarn install
```

ENV
>In server directory, place .env file with the following contents
```
MONGODB_URI=<Mongo Connection URI>
PORT=<Port to run server>
SECRET=<Secret for using passport>
GITHUB_CLIENT_ID=< Get from GitHub Developer API >
GITHUB_CLIENT_SECRET=< Get from GitHub Developer API >
GITHUB_CALLBACK_URL=<Redirection address after Twitter Verifies account> 
*Please note that callback url should not be deeper url shape.
e.g. http://localhost:5000/auth/github/callback *(bad)
     http://localhost:5000/github/ *(good)   
```

