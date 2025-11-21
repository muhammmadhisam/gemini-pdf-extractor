import type Elysia from "elysia";
import { t } from "elysia";
import * as controller from "../controllers/extraction.controller";

// Register extraction routes on an existing Elysia app instance
export function registerExtractionRoutes(app: Elysia) {
    app.post(
        "/extract/invoice",
        controller.extractInvoice,
        {
            body: t.Object(
                {
                    file: t.File({ format: "application/pdf", type: "application/pdf", }),
                },
                {
                    description: "Upload an invoice",
                }
            ),
            tags: ["Invoice"],
        }
    );

    app.post(
        "/extract/pelng",
        controller.extractPELNG,
        {
            body: t.Object({
                file: t.File({ format: "application/pdf" }),
            }),
            tags: ["Invoice"],
            
        }
    );
}
