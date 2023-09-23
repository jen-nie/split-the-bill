# CORS Configuration:

Next.js handles it internally for server-side requests. For client-side requests, CORS can be configured in the dashboard

Addition:

The standard way of NextJs is a same-origin policy. That's why the  correct headers have to be configured on the NextJS server to allow certain cross origin requests.
In our case, we don't need to request any external resources, which is why we can just stick to the default same-origin policy of NextJS and don't need to configure CORS additionally.

# Content Security Policy (CSP):

When using CSP in combination with Next.js it helps in mitigating the risks of attacks by controlling the resources that are allowed to load and execute on the Next.js application. Next.js has built-in support for integrating CSP, allowing developers to add security headers easily and configure security policies according to the application’s needs.


# SQL Injection Vulnerabilities:

Since you don't have to write actual raw SQL queries when using Supabase, the risk of SQL injections are low. The queries are parameterized -> user inputs are separated from the query itself.

# Cross-Site Scripting (XSS) Vulnerabilities:

Next.js escapes content by default. We still need to be careful using external scripts.

CSP also helps here to prevent cross-site scripting (XSS), clickjacking, and other code injection attacks resulting from the execution of malicious content
in the trusted web page context. It is implemented via a web header that the server returns, which acts like a whitelist, specifying which dynamic resources are allowed to load and execute.

