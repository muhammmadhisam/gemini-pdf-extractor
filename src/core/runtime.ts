import process from "node:process";
import { Layer, Logger, LogLevel, ManagedRuntime } from "effect";
import { ModelProvider } from "../provider/model.provider";
import { ExtractPDFService } from "../service/extract-pdf.service";


const allLive = Layer.mergeAll(
  ExtractPDFService.Default,
  Logger.minimumLogLevel(LogLevel.fromLiteral(process.env.LOG_LEVEL || "All")),
  Logger.pretty
).pipe(Layer.provideMerge(ModelProvider.Default));

export const Runtime = ManagedRuntime.make(allLive);
