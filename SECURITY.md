# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Primavera3D, please report it responsibly:

1. **DO NOT** create a public GitHub issue
2. Email security@madfam.io with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes

We will acknowledge receipt within 48 hours and provide a detailed response within 7 days.

## Security Measures

### Authentication & Authorization

- **Janua SSO Integration**: All authentication flows through Janua identity provider
- **Session Management**: Secure HTTP-only cookies with SameSite=Strict
- **CSRF Protection**: Token-based CSRF protection on all state-changing operations
- **Rate Limiting**: API endpoints protected with Upstash Redis rate limiting

### Data Protection

- **Transport Security**: TLS 1.3 enforced for all connections
- **Database Encryption**: PostgreSQL with encrypted connections
- **File Storage**: AWS S3 with server-side encryption (AES-256)
- **Secrets Management**: Environment variables, never committed to repository

### Content Security

- **CSP Headers**: Strict Content Security Policy preventing XSS attacks
- **3D Model Validation**: All uploaded models validated before processing
- **Input Sanitization**: All user inputs sanitized with Zod schemas
- **Image Processing**: Cloudinary handles image sanitization

### Infrastructure Security

- **Vercel Deployment**: SOC 2 compliant hosting
- **Environment Isolation**: Separate staging and production environments
- **Dependency Scanning**: Automated security updates via Dependabot
- **Code Review**: All changes require PR review before merge

## Security Headers

The application enforces the following security headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.sanity.io https://*.cloudinary.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## Incident Response

In case of a security incident:

1. **Immediate**: Isolate affected systems
2. **24 hours**: Initial assessment and containment
3. **48 hours**: User notification if data affected
4. **7 days**: Full incident report and remediation plan

## Compliance

- GDPR compliant data handling
- Mexico's LFPDPPP compliance for personal data
- Regular security audits scheduled quarterly

## Contact

Security Team: security@madfam.io
