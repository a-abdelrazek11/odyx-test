import type { APIRequestContext, APIResponse } from "@playwright/test";

export async function getJson(context: APIRequestContext, path: string): Promise<APIResponse> {
  return context.get(path);
}

export async function postJson(context: APIRequestContext, path: string, data: unknown): Promise<APIResponse> {
  return context.post(path, { data });
}

export async function readJson(response: APIResponse): Promise<unknown> {
  return response.json();
}
