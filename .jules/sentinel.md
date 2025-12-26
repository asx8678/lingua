# Sentinel Journal

This journal tracks CRITICAL security learnings, vulnerabilities, and patterns specific to this codebase.

## Format
`## YYYY-MM-DD - [Title]`
`**Vulnerability:** [What you found]`
`**Learning:** [Why it existed]`
`**Prevention:** [How to avoid next time]`

## 2025-02-17 - ReDoS in Validation
**Vulnerability:** Email regex validation was running before length validation. This could allow a ReDoS attack if a very long string was sent to the server.
**Learning:** Developers often chain validators logically without considering computational cost. Regex operations should always happen *after* cheap checks like string length.
**Prevention:** In validation logic, always order checks from cheapest/fastest to most expensive. Enforce hard length limits before regex.
