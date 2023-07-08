import * as Sentry from "@sentry/browser";
import config from "../config";
import { Analysis } from "aws-sdk/clients/quicksight.js";

const isLocal = process.env.NODE_ENV === "development";

export function initSentry() {
  if (isLocal) {
    return;
  }

  Sentry.init({ dsn: config.SENTRY_DSN });
}

export function logError(error: any, errorInfo: any = null): void {
  if (isLocal) {
    return;
  }

  Sentry.withScope((scope: any) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

export function onError(error: Error): void {
  let errorInfo: any = {};
  let message: string = error.toString();

  // Auth errors
  if (!(error instanceof Error) && (error as any).message) {
    errorInfo = error;
    message = (error as any).message;
    error = new Error(message);
  }
  // API errors
  else if ((error as any).config && (error as any).config.url) {
    errorInfo.url = (error as any).config.url;
  }

  logError(error, errorInfo);

  alert(message);
}
