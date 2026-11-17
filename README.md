# Playwright baseline

This folder is a generic Playwright and TypeScript baseline. It has no application pages, selectors, credentials, URLs, or test cases. A project adds those after ADLC copies this baseline into that project's own test-automation repository.

The current ADLC phase runs UI tests only. `test:api` is here for a later phase and is not invoked by that phase.

## Architecture

- `tests/ui` and `tests/api` hold project specs. This baseline ships both folders empty.
- `pages` holds page objects. Start from `BasePage`.
- `components` holds reusable UI parts. Start from `Component`.
- `fixtures/test.ts` provides an isolated browser page, configuration, test data, an API context, and an optional authenticated page.
- `utils` holds locators, interactions, assertions, environment reads, and API helpers.
- `config/environment.ts` reads and checks environment variables.
- `test-data` holds non-secret JSON data.
- `types` holds shared TypeScript types.
- `reports` receives HTML output, traces, screenshots, and videos.
- `playwright.config.ts` is the only browser and reporter configuration.

Chromium is always included. Firefox and WebKit are available by setting `TEST_BROWSERS` to a comma-separated list that includes them. ADLC currently installs and launches Chromium.

## Installation

From this folder:

1. `npm install`
2. `npx playwright install chromium`
3. Copy `.env.example` to a local environment file and fill the values there. Do not commit that file.

## Environment

`TEST_APP_URL` is the UI address. `TEST_ENV` names the target environment, such as QA. `TEST_EMAIL` and `TEST_PASSWORD` are required only by a test that asks for `authenticatedPage`. `TEST_BASE_URL` and `TEST_API_BASE_URL` are optional API addresses.

The ADLC worker supplies these values at execution time. Do not put real values in this repository.

## Create a UI test

Add a TypeScript spec under `tests/ui`. Import `test` and `expect` from `../../fixtures/test`. Use a page object instead of copying selectors into the spec. Give each project control a locator from the live page, not a guessed selector.

## Page objects

Extend `BasePage`, pass the Playwright `page`, and keep selectors inside the page object. Open a path with `open`. Compose repeated controls with `Component`.

## Fixtures

`test` from `fixtures/test.ts` isolates browser context and page for each test. `appConfig` exposes the resolved URLs. `testData` loads a fresh data object. `apiContext` exists for a future API phase. `authenticatedPage` checks that the account variables are present and opens `TEST_APP_URL`. A project replaces the body of that fixture with its own login steps. Credentials are not written to logs.

## Execute

- `npm run test:list` discovers tests and does not judge the application.
- `npm run test:ui` runs UI specs.
- `npm test` runs every spec in this folder.
- `npm run typecheck` runs the TypeScript checker.
- `npm run test:report` opens the HTML report under `reports/html`.

Failed tests keep a trace, a screenshot, and a video under `reports`. The list reporter prints the duration and the failure.

## Authentication

Use the `authenticatedPage` fixture only for tests that need the registered account. Public tests should use the normal `page` fixture so a missing account does not block them. Store the account in the worker's secret configuration, not in Git.

## Project-specific utilities

Add project helpers under `utils`, `pages`, or `components`. Keep them free of secrets. Add non-secret data under `test-data`.

## Template updates

`TEMPLATE_VERSION` is the approved baseline version. ADLC records that version and the source commit on the project copy. Updating this shared repository does not change an existing project copy. A later upgrade is a separate, reviewed operation.

## Safety

This baseline must not contain project credentials, customer data, production URLs, or application-specific selectors and tests.
