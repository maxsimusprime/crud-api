# crud-api application
- Crud-api is application that creates simple api server and provide simple interface to communicate via http.

### How to run
Application support several commands to run:
- `npm run start:dev` - to run in single-thread developing mode
- `npm run start:multi` - to run in multi-thread mode
- `npm run start:prod` - to run bundler and run the bundle in single-thread mode
- `npm run test` - to run jest tests

### Web Interface
Application support communication with sending http requests on `localhost` port `4000`
- GET request to `/api/user` to get all users
- GET request to `/api/user/{uid}` with providing {uid} to get expected user
- POST request to `/api/user` with body to create new user
- PUT request to `/api/user/{uid}` with body to update user that has provided {uid}
- PUT request to `/api/user/{uid}` to delete user with provided {uid}

Body should contain necessary fields:
```ts
{
  id: string;
  username: string;
  age: number;
  hobbies: string[];  // Array of strings or empty array
}
```
URL command examples
- `localhost:4000/api/users/d0b78099-7cdc-44eb-a3ae-b2f35b3ffb70` with `GET` method to get user