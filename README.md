# Portfolio website

React, TypeScript, Vite, and Tailwind CSS.

## Development

```sh
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Structure

A small feature-based structure with flat folders:

```text
src/
  main.tsx                 # React startup and router provider
  App.tsx                  # Routes and not-found screen
  index.css                # Global theme and styles
  features/
    auth/
      LoginPage.tsx
    portfolio/
      PortfolioPage.tsx     # Assembles the portfolio page
      About.tsx
      Contact.tsx
      Footer.tsx
      Header.tsx
      Portfolio.tsx        # Projects and certificates section
      Resume.tsx
      Services.tsx
      SideNavigation.tsx
      data.ts              # Portfolio content and its types
  shared/
    ui.tsx                 # Reusable visual components and icons
    hooks.ts               # Reusable React hooks
    utils.ts               # Plain helper functions
public/                    # Static images and hosting files
```

Keep code inside the feature that owns it. Use `shared` for reusable,
feature-independent code; it should never import from a feature. Use relative
imports within a folder and `@/shared/...` for shared code.

Keep small related components, hooks, and types together. Add a feature folder
when a new area needs one, and split a file only when it becomes difficult to
navigate. No barrel files or separate folders for every component are needed.

Edit portfolio content in `src/features/portfolio/data.ts`, page composition in
`PortfolioPage.tsx`, routes in `src/App.tsx`, and global styling in
`src/index.css`.
