# QA Automation Assessment

This repository contains a Playwright-based automation project created for a QA assessment.

## Repository

GitHub: [https://github.com/jairizesp/qa-automation-assesment](https://github.com/jairizesp/qa-automation-assesment)

## Project Structure

```
.
├── src/                 # Page objects and helper functions
├── tests/               # Test cases
├── .env                 # Environment variables
├── playwright.config.ts # Playwright configuration
├── package.json         # Project dependencies and scripts
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jairizesp/qa-automation-assesment.git
cd qa-automation-assesment
```

2. Install dependencies:

```bash
npm install
```

## Configuration

1. Copy `.env` file and update environment variables if needed:

```bash
cp .env.example .env
```

2. Configure `playwright.config.ts` for browser, base URL, and other settings.

## Running Tests

- Run all tests:

```bash
npx playwright test
```

- Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

- Open Playwright Test Runner UI:

```bash
npx playwright test --ui
```

## Reporting

- HTML report:

```bash
npx playwright show-report
```

- Additional reporters (e.g., Allure) can be configured in `playwright.config.ts`.

## Notes

- The project uses TypeScript with Playwright.
- Page Object Model (POM) is applied for maintainability.
- Environment variables are managed through `.env`.

## License

This project is for assessment purposes and does not have a specific license.
