# Test data

Keep reusable, non-secret data in this folder. `example.json` is the default file. When `TEST_ENV` is `QA`, the loader reads `qa.json` if a project adds that file.

Each test receives its own parsed object from the `testData` fixture. Do not mutate a shared object that another test also uses.

Do not store real customer data, production data, passwords, or tokens in this folder.
