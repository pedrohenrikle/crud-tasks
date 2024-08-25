<div align="center">

# **OpenCRUD API**

✨ A Node.js & Typescript based API, developed with [fastify](https://fastify.dev/) and uses JWT Token. Uses SQLite as database. ✨

[![GitHub Repo stars](https://img.shields.io/github/stars/pedrohenrikle/crud-tasks)](https://github.com/pedrohenrikle/crud-tasks)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

</div>

## Table of contents

- [Getting Started](#getting-started)
- [Features](#🛠️-features)
  - [Functional requirements](#frs-functional-requirements)
  - [Business rules](#brs-business-rules)
  - [Non-functional requirements](#nfrs-non-functional-requirements)
- [Endpoints](#🛑-endpoints)
  - [Users](#users)
  - [Tasks](#tasks)
- [Technologies](#🚀-technologies)
- [License](#📝-license)
- [Author](#✍-author)


## Getting Started

To get started with OpenCRUD API, follow these simple steps:

### 1. Installation

First of all, clone the repository and install de dependencies.

```shell
pnpm install
```

### 2. Setting up your environment

Now we must setup our environment variables. Create a file on root as ***.env***. Inside, put all data like is here in: [.env.example](https://github.com/pedrohenrikle/crud-tasks/blob/main/.env.example)

```shell
NODE_ENV=dev

# Auth
JWT_SECRET=YOUR_SECRET_HERE

# Database
DATABASE_URL="path_from_your_database"
```

### 3. Setting up database

Now we must setup our database. We're going to apply the migrations executing the following command:

```shell
npx prisma migrate deploy
```

### 4. Run

Now, you can run the API with 

```shell
pnpm run dev
```

## 🛠️ Features

### FRs (Functional requirements)

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to obtain the profile of a user;
- [x] It must be possible to edit a user;
- [x] It must be possible to delete a user;
- [x] It must be possible to create a new task;
- [x] It must be possible to edit a task;
- [x] It must be possible to list all tasks from a user;
- [x] It must be possible to delete a task


### BRs (Business Rules)

- [x] The user must not be able to register with a duplicate e-mail address;
- [x] All routes besides the user register and user log-in need to be logged-in;

### NFRs (Non-functional requirements)

- [x] The user's password must be encrypted;
- [x] The application data must be persisted in a SQLite database;
- [x] The user must be identified by a JWT (JSON Web Token);

## 🛑 Endpoints

Here you can see all the endpoints of the application. You'll need to use the prefix "/api", so to example: If you want to register a user, use: `[protocol]://[url]/api/users`.

### Users

- ```POST - '/users'```
  - This is the user's entry route, where the user will register with in the application. You must send the request with a ***data*** equal a some user's informations on the body of the requisition. "***name***" is optional.
  <br><br>

    | Params       | Type       | Default  | Optional |
    | :---         | :---       | :---     | :---     |
    | `name`       | **string** | -        | true     |
    | `email`      | **string** | -        | false     |
    | `password`   | **string** | -        | false     |


<br><br>

- `POST - '/users/login'`
  - This is the authenticate route. Here, the user can log-in on our application. Send the data as the body of the request as a JSON. After that, we will generate a access token that contains the **userId** and his **email**.
  <br><br>

    | Params       | Type       | Default  | Optional |
    | :---         | :---       | :---     | :---     |
    | `email`      | **string** | -        | false    |
    | `password`   | **string** | -        | false    |

<br><br>

- ```GET - '/users'```
  - This is the route to get all data about the user logged-in. Need to pass the JWT Token as Authorization Bearer to identify himself.
  <br><br>

    | Header           | Type       | 
    | :---             | :---       | 
    | `Authorization`  | **Bearer** |

<br><br>

- ```PUT - '/users/edit'```
  - This is the route dedicated to edit user's profile. First, the user need to pass his JWT Token as Authorization Bearer to identify himself. Also need to send the data as the body of the request as a JSON. 
  <br><br>

    | Header           | Type       | 
    | :---             | :---       | 
    | `Authorization`  | **Bearer** |

    ---

    | Params       | Type       | Default  | Optional |
    | :---         | :---       | :---     | :---     |
    | `name`       | **string** | -        | true     |
    | `email`      | **string** | -        | true     |
    | `password`   | **string** | -        | true     |

<br><br>

- ```DELETE - '/users/delete'```
  - This is the delete route for users. Here, the user can delete his own account, just passing the JWT Token as Authorization Bearer to identify himself.
  <br><br>

    | Header           | Type       | 
    | :---             | :---       | 
    | `Authorization`  | **Bearer** |

<br><br>

### Tasks

On ***Tasks***, every route needs to be authenticated, that means every request must have the following header with the JWT Token: `Authorization Bearer ${token}`.

- ```POST - '/tasks'```
  - This route is dedicated to create a new task. The data of the task shall be passed on the requisition's body. The new task is going to be assigned to the logged-in user.
  <br><br>

    | Params       | Type       | Default  | Optional |
    | :---         | :---       | :---     | :---     |
    | `title`      | **string** | -        | false    |
    | `description`| **string** | -        | true     |

<br><br>

- ```GET - '/tasks/user'```
  - This route is going to return all tasks that belong to the user logged-in.

<br><br>

- ```GET - '/tasks/:taskId'```
  - This route is going to return all data of a specific task. Need to pass the **task's ID** as a param on *url*.
  <br><br>
    | Params       | Type       | Default  | Optional |
    | :---         | :---       | :---     | :---     |
    | `taskId`     | **string** | -        | false    |

<br><br>

- ```PUT - '/tasks/:taskId'```
  - This is the route dedicated to edit a specific task. First, the user need to provide de taskId on the *url*. Also need to send the data that want to change as the body of the request as a JSON. 
  <br><br>

    | Params       | Type        | Default  | Optional |
    | :---         | :---        | :---     | :---     |
    | `title`      | **string**  | -        | true     |
    | `description`| **string**  | -        | true     |
    | `isFinished` | **boolean** | *false*  | true     |

<br><br>

- ```DELETE - '/tasks/:taskId'```
  - This route is going to delete a specific task. Need to pass the **task's ID** as a param on *url*. A user can only delete a task that is assigned to him.
  <br><br>
    | Params       | Type       | Default  | Optional |
    | :---         | :---       | :---     | :---     |
    | `taskId`     | **string** | -        | false    |

<br><br>

## 🚀 Technologies
  The technologies used to develop this application was:
  - [nodejs](https://nodejs.org/en)
  - [typescript](https://www.typescriptlang.org/)
  - [fastify](https://fastify.dev/)
  - [@fastify/cookie](https://github.com/fastify/fastify-cookie)
  - [@fastify/jwt](https://github.com/fastify/fastify-jwt)
  - [prisma](https://www.prisma.io/)
  - [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
  - [eslint](https://eslint.org/)
  - [tsx](https://github.com/privatenumber/tsx)

## 📝 License
OpenCRUD API is released under the MIT License.


## ✍ Author
<br>

<div style="display: flex; flex-direction: column; gap: 0.5rem">
  <img alt="Pedro Henrique Klein" title="Pedro Henrique Klein" src="https://github.com/pedrohenrikle.png" width="150">
  <p>
      Made with 💜 by Pedro Henrique Klein
  </p>
  <div style="display: flex; align-item: center; gap: 1rem">
      <a href="https://www.linkedin.com/in/pedro-klein/" target="_blank">
          <img align="center" src="https://img.shields.io/badge/LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn: pedro-klein" />
      </a>
      <a href="mailto:pedro.klein.sl@gmail.com" target="_blank">
          <img align="center" src="https://img.shields.io/badge/Gmail-FF0000?style=for-the-badge&logo=gmail&logoColor=white" alt="pedro.klein.sl@gmail.com" />
      </a>
  </div>
</div>