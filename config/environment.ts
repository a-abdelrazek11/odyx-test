import { optionalEnv } from "../utils/env";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function appUrl(): string | undefined {
  return httpUrl("TEST_APP_URL", optionalEnv("TEST_APP_URL"));
}

export function apiUrl(): string | undefined {
  return httpUrl("TEST_BASE_URL", optionalEnv("TEST_BASE_URL") ?? optionalEnv("TEST_API_BASE_URL"));
}

export function targetEnv(): string | undefined {
  return optionalEnv("TEST_ENV");
}

export function credentials(): { email: string; password: string } | undefined {
  const email = optionalEnv("TEST_EMAIL");
  const password = optionalEnv("TEST_PASSWORD");
  if (!email && !password) return undefined;
  if (!email || !EMAIL.test(email) || !password) {
    throw new Error("TEST_EMAIL and TEST_PASSWORD must both be set before an authenticated test runs.");
  }
  return { email, password };
}

function httpUrl(name: string, value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (!/^https?:\/\//i.test(value)) {
    throw new Error(`${name} must be an http or https URL.`);
  }
  return value;
}
