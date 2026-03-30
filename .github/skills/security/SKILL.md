---
name: security
description: Security analysis and vulnerability detection for the Excalidraw monorepo.
---

# Security Skill

## Overview
Security analysis and vulnerability detection for the Excalidraw monorepo.

## Capabilities

### Dependency Scanning
- Identify outdated or vulnerable packages
- Check `yarn audit` results
- Review transitive dependencies

### Code Security Checks
- Detect hardcoded secrets (API keys, tokens, credentials)
- Identify unsafe cryptographic practices
- Flag potential XSS/injection vulnerabilities in React components
- Check for unsafe DOM manipulation (innerHTML, eval)

### Configuration Review
- Audit environment variable exposure
- Review CORS, CSP, and security headers
- Check authentication/authorization patterns

### Best Practices Validation
- Verify secure data handling (PII, sensitive info)
- Check error messages don't leak sensitive data
- Validate input sanitization in canvas/drawing operations

## Usage Examples
