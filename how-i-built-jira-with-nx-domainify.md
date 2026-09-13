# How I built a Jira product with nx-domainify

> Outline first. The full walkthrough follows.

## Outline

1. Why I am talking to you like this
2. I did not start with folders or generators
3. Strategic design: what is this product actually about?
4. Finding the language of the business
5. Drawing bounded contexts — and throwing some away
6. Why I kept four domains, not seven
7. Shared is not a fifth product domain
8. How I mapped DDD onto nx-domainify tags
9. Creating the Angular monorepo
10. Installing the plugin and running `init`
11. The first domain landed at the workspace root
12. Generating in order: domain, then everything else
13. UI libraries are empty on purpose
14. Filling the kernel: one store, many facades
15. Why the only API sits on the issue domain
16. Boundary fights I actually hit
17. Composing screens without cheating
18. Making it look like Jira
19. What I would copy, and what I would not
20. A checklist you can run tomorrow
