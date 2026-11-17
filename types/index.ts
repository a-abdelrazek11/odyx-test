import type { APIRequestContext, APIResponse, Locator, Page } from "@playwright/test";

export interface AppConfig {
  appUrl?: string;
  apiUrl?: string;
  env?: string;
}

export interface TemplateIdentity {
  repository: string;
  version: string;
  sourceCommitSha?: string;
  provisionedAt?: string;
}

export interface JsonObject {
  [key: string]: unknown;
}

export type { APIRequestContext, APIResponse, Locator, Page };
