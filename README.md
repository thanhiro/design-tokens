# Design Tokens for Unified Portal Platform

This project is the master repository for the Unifier Portal Design Tokens. It serves as a centralized source for managing and distributing design tokens across various platforms and applications within the Unified Portal ecosystem.

## Overview

The Design Tokens for Unified Portal Platform project uses the [Style Dictionary](https://amzn.github.io/style-dictionary/) tool to convert Figma's Tokens Studio managed design tokens into platform-specific formats such as `.css` and `.js` files. These files can then be consumed by various implementations within the Unified Portal ecosystem, ensuring a consistent and cohesive user experience.

## What are Design Tokens?

Design tokens are a way to represent and manage design values in a centralized and organized manner. They provide a single source of truth for design values, making it easier to maintain consistency across different platforms and applications. They were invented by Salesforce and are now used widely in various organizations.

Design tokens are closely related to Design Systems. Tokens are the foundation of a Design System; the building blocks that define the visual characteristics and properties of a design, in a systematic manner.

For more information on design tokens, you can refer to the following resources:

- [Design Tokens by Salesforce](https://cult.honeypot.io/reads/design-tokens-with-theo-desforge/)
- [Introducing Design Tokens](https://css-tricks.com/introducing-design-tokens/)
- [Material Design tokens](https://m3.material.io/foundations/design-tokens/overview)

## Getting Started

To get started with the Design Tokens for Unified Portal Platform project, follow these steps:

1. Install dependencies: `pnpm install`
2. Build the design tokens: `pnpm run build`

The build command will generate the platform-specific token files in the `build` directory.

They are currently _manually_ copied to uiotp-components project. TODO: automation.

## Example

Here's an example of a design token in the Style Dictionary format, along with the generated CSS properties and JSON fields:

**Design Token Definition**

```json
// tokens.json
{
  "color": {
    "background": {
      "main": {
        "value": "#393a36",
        "type": "color"
      }
    }
  }
}
```

**Generated CSS Properties**

```css
/* colors.css */
:root {
  --color-background-main: #393a36;
}
```

**Generated JSON Fields**

```json
// tokens.json
{
  "color": {
    "background": {
      "main": "#393a36"
    }
  }
}
```

You can then use these generated values in your CSS or JavaScript files to ensure consistency across your application:

**CSS**

```css
.some-class {
  background-color: var(--color-background-main);
}
```

**JavaScript**

```js
import tokens from './tokens.json';

const backgroundColor = tokens.color.background.main;
```
