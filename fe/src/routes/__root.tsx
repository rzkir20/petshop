import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import Pathname from '../hooks/Pathname'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'PawsomeShop - Premium Pet Supplies & Care',
      },
      {
        name: 'description',
        content:
          'PawsomeShop helps pet parents discover premium food, toys, accessories, and trusted care tips for dogs, cats, birds, and aquatic pets.',
      },
      {
        name: 'keywords',
        content:
          'pet shop, pet supplies, dog food, cat toys, pet accessories, pet care, pawsomeshop',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        property: 'og:title',
        content: 'PawsomeShop - Premium Pet Supplies & Care',
      },
      {
        property: 'og:description',
        content:
          'Shop trusted pet essentials and explore practical pet care resources in one place.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'PawsomeShop - Premium Pet Supplies & Care',
      },
      {
        name: 'twitter:description',
        content:
          'Quality pet products, friendly support, and helpful guides for every pet parent.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <Pathname>{children}</Pathname>
        <Scripts />
      </body>
    </html>
  )
}
