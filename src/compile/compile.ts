import { AsyncResult, Ok, Err } from "sagittarius-types/result";
import fetch from "node-fetch";
import { SSD } from "../bindings/SSD";


type CompileResponse = {
  message: string;
  output: string;
};

export const compile = async (code: string): AsyncResult<CompileResponse> => {
  const compileUrl = "https://https://sagc.up.railway.app/api/compile";

  const response = await fetch(compileUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({"code" : code}),
  });

  if (!response.ok) {
    return Err(new Error(`Failed to compile code ${response.statusText}`));
  }

  const compileResponse: CompileResponse = await response.json() as CompileResponse;

  return Ok(compileResponse);
};
