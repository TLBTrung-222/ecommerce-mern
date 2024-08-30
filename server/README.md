## Note

-   When update new entity, the update form sent from client can contains properties that not belong to entity's properties, and
    we will just get the necessary properties and ignore others
-   Controller layer handle req/res, validate user input. It will delegate other business logic to Service layer. Controller do the heavy thing, mainly interact with req/res
-   Service layer execute complex business logic, interact with db and give the result to Controller layer (also throw error if exists to Controller)
-   I choose not to use try-catch block in Service layer for Single Responsibility Principle, the error get from Service will be
    buble up to be catched by Controller
-   Model: return user | null (for not found scenario) | throw error (for update/delete...)
    Service: handle result returned from model (for e.g if Model return null, it throw error)
    Controller: Catch error from both layers, aggregate error + pass to error middleware
-   Do not store sensitive information on jwt, because payload is just base 64 and can be decoded easily.
-   JWT: stored `refreshToken` on cookit with httpOnly to prevent XSS attack (accessible via JS code), stored `accessToken` on `localStorage` for easy to retrieve and if it stealed, no much worry  
    Drawback: Storing `refreshToken` in cookie mean client send it along with every request to resrouce server => CSRF attack
    Storing any token in `localStorage` will make it vurnarable to XSS (cross-site scripting) attack
-   Because this app will store user's image in base64, if the image is large, express will throw error `request entity too large`. To prevent it, please increase the limit of bodyParser and urlencoded middlewares as [here](https://stackoverflow.com/questions/19917401/error-request-entity-too-large)

## Todo

1. Move validation logic to a seperate middleware to make controller more lightweight
2. Define a util function to catch error (same as asyncHandler) and reduce repitive try-catch pattern
3. Use meaningful custom Error in Service or Model, Controller only need to get the error and pass to next: next(err)
    - only use `next(err)` for internal server error, and `next(new CustomError(...))` for custom error with status code ✅
4. Use a http status code library instead of remembering status code
5. Send jwt to user when register done
6. Store refresh token in database (Redis cache, ...)
7. Move auth routes from UserRouter to a seperate AuthRouter
8. Move all types to index.ts

## Learn

1. Override req object type from Express by using [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html). For more detai, read here [stackoverflow](https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript)
2. Devide request handler to Controller, Service, Model layer
3. Config swagger to both use yml spec and jsdoc spec
4. Error handling: Create custom meaningful error instance
5. Refresh token mechanism in JWT: - Why access token have short-lived time?  
    If access token has been stealed, attacker only have short time to act as user. - Why exist both access token and refresh token?
   Access token have short-lived time => reduce user UX, we need a high-lived time => refresh token - Diff between access token and refresh token
   Refresh token stored on both server + client, access token should only be stored on client => if that is the case, it can not be invalidated

Main reasons to use refresh token:

-   Perform invalidating (delete) user if they steal access
-   Take all authentication + authorization code from resource server and move to a different server (authen server)

6. Cookie: Browser's cookie will attach the cookie it received from server (if exist) in subsequent requests to the same domain.

## Issue

If postgresql is not working, read the log file on /Library/PostgreSQL/16/data/log, also log file from pgAdmin. After that follow these steps:

1. Check if postgres server is running:

```shell
sudo -u postgres /Library/PostgreSQL/16/bin/pg_ctl status -D /Library/PostgreSQL/16/data
```

2. If it's not running, Start PostgreSQL service

```shell
sudo -u postgres /Library/PostgreSQL/16/bin/pg_ctl start -D /Library/PostgreSQL/16/data
```

3. Verify PostgreSQL is listening on the correct port:

```shell
sudo lsof -i :5432
```

4. If the log file or command above throw some permission error, we can set permission for /Library/PostgreSQL/16/data:

```shell
sudo chmod 700 /Library/PostgreSQL/16/data
```

700: (user read/write/execute only)
Then try to start the postgresql service again, it should works
