import { Effect } from "effect";
import { t } from "elysia";
import { InvoiceSchema, InvoiceSystemPrompt } from "../schema/invoice";
import {
  PELNG_EXTRACTION_SYSTEM_PROMPT,
  PELNGInvoiceSchema,
} from "../schema/pelng";
import { ExtractPDFService } from "../service/extract-pdf.service";
import { Runtime } from "../core/runtime";


export const extractInvoice = async ({ body }: { body: { file: File } }) => {
  const arrBuf = await body.file.arrayBuffer();
  const fileBuffer = Buffer.from(arrBuf);

  const program = Effect.all({
    svc: ExtractPDFService,
  }).pipe(
    Effect.andThen(({ svc }) =>
      svc.processInline(fileBuffer, InvoiceSystemPrompt, InvoiceSchema)
    ),
    Effect.catchTag("ExtractPDF/Process/Error", (error) =>
      Effect.succeed(
        Response.json(
          {
            message: error.message,
            error: error.error,
            status: "500",
          },
          {
            status: 500,
          }
        )
      )
    )
  );

  const result = await Runtime.runPromise(program);
  console.log({ result });
  return result;
};

export const extractPELNG = async ({ body }: { body: { file: File } }) => {
  const arrBuf = await body.file.arrayBuffer();
  const fileBuffer = Buffer.from(arrBuf);

  const program = Effect.all({
    svc: ExtractPDFService,
  }).pipe(
    Effect.andThen(({ svc }) =>
      svc.processInline(
        fileBuffer,
        PELNG_EXTRACTION_SYSTEM_PROMPT,
        PELNGInvoiceSchema
      )
    ),
    Effect.catchTag("ExtractPDF/Process/Error", (error) =>
      Effect.succeed(
        Response.json(
          {
            message: error.message,
            error: error.error,
            status: "500",
          },
          {
            status: 500,
          }
        )
      )
    )
  );

  const result = await Runtime.runPromise(program);
  console.log({ result });
  return result;
};
