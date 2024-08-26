## Note

-   Controller layer handle req/res, validate user input. It will delegate other business logic to Service layer. Controller do the heavy thing, mainly interact with req/res
-   Service layer execute complex business logic, interact with db and give the result to Controller layer (also throw error if exists to Controller)
-   I choose not to use try-catch block in Service layer for Single Responsibility Principle, the error get from Service will be
    buble up to be catched by Controller

## Todo

1. Move validation logic to a seperate middleware to make controller more lightweight
2. Define a util function to catch error (same as asyncHandler) and reduce repitive try-catch pattern
3. Use meaningful custom Error in Service or Model, Controller only need to get the error and pass to next: next(err)
    - only use `next(err)` for internal server error, and `next(new CustomError(...))` for custom error with status code
4. Use a http status code library instead of remembering status code
