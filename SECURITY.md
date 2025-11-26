# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

Please report (suspected) security vulnerabilities to **[security@example.com](mailto:security@example.com)**. You will receive a response within 48 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity but historically within a few days.

## Security Best Practices

When using this dashboard in production:

1. **Never commit API keys or secrets** - Use environment variables
2. **Implement proper authentication** - Replace mock authentication with real backend
3. **Use HTTPS** - Always serve the application over HTTPS in production
4. **Keep dependencies updated** - Regularly run `npm audit` and update packages
5. **Configure CORS properly** - Restrict API access to authorized domains
6. **Enable rate limiting** - Protect API endpoints from abuse
7. **Use secure headers** - Implement security headers (CSP, HSTS, etc.)
8. **Regular security audits** - Perform periodic security assessments

## Known Security Considerations

- This is a frontend application template. All security-sensitive operations should be handled by a secure backend API.
- The current authentication system is for demonstration purposes only and should be replaced with a production-ready solution.
- API keys should never be stored in the frontend code. Use environment variables and secure backend storage.


