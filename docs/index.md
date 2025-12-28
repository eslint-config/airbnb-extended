---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'ESLint'
  text: 'Airbnb Extended'
  tagline: A powerful ESLint configuration extending the popular Airbnb style guide, with added support for TypeScript.
  image:
    src: /logo.png
    alt: Image
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Config
      link: /config/installation
    - theme: alt
      text: CLI
      link: /cli/guide

features:
  - icon: 🏛️
    title: Airbnb Base Configuration
    details: Built on top of Airbnb's highly opinionated ESLint config.
  - icon: 🔄
    title: 1:1 Replacement
    details: Provides a one-to-one replacement for Old Airbnb ESLint configs.
  - icon: 🔋
    title: All batteries included
    details: All required ESLint plugins and resolvers are bundled internally.
  - icon: 📦
    title: TypeScript Support
    details: Out-of-the-box TypeScript support for all your code.
  - icon: 🛠️
    title: Customizable
    details: Easily extend or modify settings to match your project's coding style.
  - icon: 💻
    title: CLI Utility for Quick Setup
    details: Set up your project in seconds with a simple command-line tool.
---

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      {{ trustedBy.title }}
    </template>
    <template #lead>
      {{ trustedBy.description }}
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="trustedBy.members" />
</VPTeamPage>

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme';

const trustedBy = {
  title: 'Trusted By',
  description:
    'Built on the foundations of Airbnb’s style guide and extended for real-world production needs, trusted by teams that ship at scale.',
  members: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/6154722',
      name: 'Fluent UI',
      org: 'Microsoft',
      desc: 'Fluent UI is comprehensive set of utilities and components designed to help build consistent, modern web experiences.',
      links: [{ icon: 'github', link: 'https://github.com/microsoft/fluentui' }],
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/131524',
      name: 'Nunjucks',
      org: 'Mozilla',
      desc: 'Nunjucks is flexible templating engine that offers inheritance, async rendering, and powerful features for dynamic content.',
      links: [{ icon: 'github', link: 'https://github.com/mozilla/nunjucks' }],
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/13690587',
      name: 'Recharts',
      org: 'Recharts',
      desc: 'Recharts is modern charting library for React that provides customizable, responsive visualizations built on top of D3.',
      links: [{ icon: 'github', link: 'https://github.com/recharts/recharts' }],
    },
  ],
};
</script>

<style>
  .VPTeamMembers .avatar, .VPTeamMembers .avatar-img {
    border-radius: 6px;
  }
</style>
