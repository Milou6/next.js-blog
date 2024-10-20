'use client';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './page.module.scss';

export default function BlogPage() {
  const codeTypography = `
@mixin display-large {
  font-size: getFontSize($body-font-size, $scale-ratio, 12);
}
// @mixin display-medium {...}
// @mixin display-small {...}

@function getFontSize($root-size, $scale-ratio, $scale-position) {
  @return round(calc($root-size * pow($scale-ratio, $scale-position)), 1px);
}
`;

  return (
    <article className={styles.article}>
      <h1>About this blog</h1>
      <p>
        This Next.js website is a personal project to showcase effective typography & theming, but also a playground to
        test the new{' '}
        <a
          href="https://m3.material.io/styles/color/dynamic/choosing-a-source"
          target="_blank"
          rel="noopener noreferrer"
        >
          Material Dynamic color scheme
        </a>
        . Post contents were auto-generated and are just meant as an example (LLM opinions not my own!).
      </p>

      <h3>Color Scheme</h3>

      <p>
        The color picker FAB uses the great{' '}
        <a
          href="https://github.com/material-foundation/material-color-utilities/tree/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          material-color-utilities
        </a>{' '}
        library behind the scenes to create the CSS color scheme. The Material guide constantly references the{' '}
        <a href="https://www.figma.com/community/file/1035203688168086460" target="_blank" rel="noopener noreferrer">
          Figma M3 Design Kit
        </a>{' '}
        to build a color scheme, but I&apos;ve found it a bit clunky to use: the plugin takes a long time to update all
        design files every time you switch the source color, and it doesn&apos;t have an option to choose between all
        the different scheme types.
      </p>

      <p>
        By using the library directly, I&apos;m able to choose my preferred scheme type (<code>SchemeFidelity</code> on
        this blog) and dynamically update the blog&apos;s CSS variables for different color roles (
        <code>--primary</code>, <code>--onPrimary</code>, <code>--secondary</code>, etc...).
      </p>

      <p>
        The <code>&lt;ColorPicker&gt;</code> component also saves the user&apos;s color preference to localStorage. To
        avoid writing to storage too often, I&apos;ve implemented a <code>debouncedSaveColor()</code> method that makes
        sure the component only writes to it at most once per second.
      </p>

      <h3>Rendering</h3>

      <p>
        To fully take advantage of Next.js&apos; capabilities, I&apos;ve chosen Static Site Generation (<b>SSG</b>) to
        pre-render all possible blog routes at build time. This means that all dynamic routes like{' '}
        <code>posts/[year]/[slug]</code> implement the <code>generateStaticParams()</code> function, which runs during
        the build step to generate all possible parameter combinations and their associated HTML page. This is
        appropriate for a blog since the content is mostly static: blog markdown files are not updated that often.
      </p>

      <p>
        One drawback of this approach is that user preferences (such as their favorite color) are not known at build
        time, which creates a{' '}
        <a href="https://en.wikipedia.org/wiki/Flash_of_unstyled_content" target="_blank" rel="noopener noreferrer">
          FOUC
        </a>{' '}
        (in our case, Flash Of <i>Unwanted Color</i> when the user loads the blog). A naive fix to this problem would be
        to implement a loading screen while the saved color is fetched on the client-side, but this negates the faster
        First Paint that SSG gives us. Josh Comeau has a very good explanation of different rendering strategies on his{' '}
        <a
          href="https://www.joshwcomeau.com/react/server-components/#a-quick-primer-on-server-side-rendering-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          primer on Server Side Rendering
        </a>
        .
      </p>

      <p>
        Another solution would be to use cookies, but this would make the framework automatically switch to Dynamic
        Rendering (instead of our preferred Static Rendering). The real issue, of course, is that the server
        doesn&apos;t have access to user preferences saved client-side.
      </p>

      <p>
        The solution I chose was to directly inject a <code>&lt;script&gt;</code> tag in the HTML head of the global
        layout. The script does need access to the Material <code>SchemeFidelity</code> class, so I had to bundle it
        into a minified js file with webpack, but the resulting bundle is not very big at 54 kB (16kB transferred), and
        it is cached by the browser. The script also only needs to run once, when the first blog page is loaded. The
        result is great: <i>FOUC is completely gone!</i>
      </p>

      <h3>Typography</h3>

      <p>
        The blog uses the AR One Sans variable font for both headings and body type. Paragraphs have an increased
        line-height and a <code>max-width: 65ch</code> that makes it easy to scan text at a glance. Conversely, headings
        have a tighter letter-spacing to make them more legible. Compare the default & tightened spacing :
      </p>

      <div className="headings-comparison">
        <h1 className="default-spacing">Default Spacing</h1>
        <h1>Tighter Spacing</h1>
      </div>

      <p>
        I&apos;ve created a simple system to automatically generate type scales for typography tokens. It uses a default{' '}
        <code>$scale-ratio: 1.125</code> (Major second type scale,{' '}
        <a
          href="https://m3.material.io/styles/typography/type-scale-tokens#2a57c8f0-d45b-470a-984f-eb4f89f425fa"
          target="_blank"
          rel="noopener noreferrer"
        >
          as recommended by Material
        </a>
        ) with a body font size of 16px to create a cohesive set of font sizes:
      </p>

      <SyntaxHighlighter language="scss" style={atomOneDarkReasonable}>
        {codeTypography.trim()}
      </SyntaxHighlighter>

      <p>
        This makes it very easy to adjust typography when switching fonts, by only having to modify a handful of
        variables.
      </p>
    </article>
  );
}
