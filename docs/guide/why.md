---
title: 'Why Airbnb ESLint Extended Exists'
description: 'Why eslint-config-airbnb-extended exists: the original Airbnb ESLint config is unmaintained, lacks TypeScript support and does not work with ESLint 9 flat config.'
---

# Why? {#why}

Writing clean and consistent code is super important, not just for you, but for your entire team. A consistent coding style makes projects easier to maintain, reduces bugs, and helps every developer quickly understand each other’s code.

That’s exactly why we rely on **[ESLint](https://eslint.org/)**, a powerful tool that analyzes your code and provides instant feedback to keep things in shape.

## Problem 😬 {#problem}

One of the most popular ESLint style guides out there is the **Airbnb ESLint Config**. For years, developers have trusted it as a reliable, opinionated set of rules that enforce best practices and readable code. It became a kind of _“gold standard”_ in the JavaScript community.

But here’s the issue:

- The Airbnb config hasn’t been updated in **over 4 years**.
- It doesn’t work well with **ESLint 9** (and beyond).
- It lacks **TypeScript support**.
- It contains **some rules** that create unnecessary friction.

In today’s fast-moving JavaScript ecosystem, four years is a long time. By the time ESLint 9 came around, the old Airbnb config simply couldn’t keep up.
