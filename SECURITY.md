# CORS Configuration:

Next.js handles it internally for server-side requests. For client-side requests, CORS can be configured in the dashboard

# Content Security Policy (CSP):

Next has specialized CSP packages to manage CSP headers.

# SQL Injection Vulnerabilities:

Since you don't have to write actual raw SQL queries when using Supabase, the risk of SQL injections are low. The queries are parameterized -> user inputs are separated from the query itself.

# Cross-Site Scripting (XSS) Vulnerabilities:

Next.js escapes content by default. We still need to be careful using external scripts.
