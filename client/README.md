## Tech stack:

-   Development tool: Vite
-   Router: react-router-dom
-   UI library: React + Material UI + React Query
-   Image slider: react-slick
-   State management: redux

## Note:

1. After calling `fetch`, the response have a `Response` type from node, and it's data (payload) is the json thing returned from our backend, so we need to call `response.json()` to get the response data backend sent (for e.g `res.status(201).json(responseData)`)
2. Image storing: Convert the image to base64 and save this string to db
