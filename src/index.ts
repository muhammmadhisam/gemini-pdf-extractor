import openapi from "@elysiajs/openapi";
import Elysia from "elysia";
import { registerExtractionRoutes } from "./routes/extraction.route";

const app = new Elysia();

app
  .use(
    openapi({
      path: "/docs",
    })
  )
  .get("/health", () => "Ok")
  ;

// register extraction endpoints
registerExtractionRoutes(app);

app.listen(3000);
console.log("server start at port:", 3000);
