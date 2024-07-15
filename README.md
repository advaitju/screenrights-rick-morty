# screenrights-rick-morty

## Quick start

```
npm install
npm run build
npm run preview
```

## Assumptions and Tech choices

With all React projects at this time SSR (Next.js / Remix) is a consideration. I explored the possibility of using either however decided to stick with a client-side SPA using Vite **due to GraphQL**.

The reasons for this choice were:

1. **Bad fit with SSR:** There is a rich data fetching ecosystem on the client-side with Apollo Client and other libraries that are not available in a Node backend.
   - All of these benefits are lost as Apollo has little to nothing in the way of SSR fetching conveniences.
   - Code maintainability, caching, refetching and mutations suffer if GraphQL queries are fetched on the backend with web `fetch`. Many of these will need to reimplemented with workarounds.
1. **Performance concerns:** Next.js / Remix SSR, streaming, server actions etc. are well suited for REST APIs since they can be called directly. However, GraphQL introduces an in-between layer that is an added network call.
   - Browser -> Next.js -> GraphQL server -> Backend -> Database / 3rd party

## Features and optimisations

- Searches and paginations are saved in session.
  - So navigating between the list of characters and the detailed view doesn't lose the user's state.
  - Navigating by manually editing the URL and the back button works without losing search state.
- Dark mode toggle.
- Browser-based image lazy-loading.
- Loading spinners.
- Instant / responsive search.
- Error state messages.
- Mobile responsive UI.

## Improvements that could be made

- The codebase needs to be refactored for tidiness.
- TypeScript was used hastily with GQL queries. There are better solutions worth investigating / implementing.
- I didn't have time to add tests.
  - `CharacterCard.tsx` could use simple tests.
  - The search functionality requires extensive mocking to ensure its functionality doesn't break.
