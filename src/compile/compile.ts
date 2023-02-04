import { AsyncResult, Ok, Err } from "../utils/result";
import fetch from "node-fetch";
import { SSD } from "../bindings/SSD";

import appLogger from "../logger";

type CompileResponse = {
  message: string;
  output: string;
};

export const compile = async (code: string): AsyncResult<CompileResponse> => {
  const compileUrl = "http://localhost:8796/compile";

  if (!compileUrl) {
    appLogger.error(`No compiler URL found. Using default compiler.`);
    return Err(new Error("No compiler URL found"));
  }

  const response = await fetch(compileUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({"code" : code}),
  });

  if (!response.ok) {
    appLogger.error(`Failed to compile code: ${response.statusText}`);
    return Err(new Error(`Failed to compile code ${response.statusText}`));
  }

  const compileResponse: CompileResponse = await response.json() as CompileResponse;

  return Ok(compileResponse);
};
