---
title: MazLink
description: MazLink is a standalone component
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

<!--@include: ./../.vitepress/mixins/getting-started.md-->

## Basic usage

<ComponentDemo>
  <MazLink href="https://maz-ui.com" target="_blank"> View product detail </MazLink>

  <template #code>

  ```vue
  <template>
    <MazLink href="https://maz-ui.com" target="_blank"> View product detail </MazLink>
  </template>

  <script lang="ts" setup>
    import MazLink from 'maz-ui/components/MazLink'
  </script>
  ```

  </template>
</ComponentDemo>

## Color

<ComponentDemo>
  <div class="maz-flex maz-flex-col maz-gap-2 maz-justify-center">
    <MazLink color="primary"> View product detail </MazLink>
    <MazLink color="secondary"> View product detail </MazLink>
    <MazLink color="info"> View product detail </MazLink>
    <MazLink color="success"> View product detail </MazLink>
    <MazLink color="warning"> View product detail </MazLink>
    <MazLink color="danger"> View product detail </MazLink>
    <MazLink color="white"> View product detail </MazLink>
    <MazLink color="black"> View product detail </MazLink>
    <MazLink color="theme"> View product detail </MazLink>
  </div>

  <template #code>

  ```html
  <MazLink color="primary"> View product detail </MazLink>
  <MazLink color="secondary"> View product detail </MazLink>
  <MazLink color="info"> View product detail </MazLink>
  <MazLink color="success"> View product detail </MazLink>
  <MazLink color="warning"> View product detail </MazLink>
  <MazLink color="danger"> View product detail </MazLink>
  <MazLink color="white"> View product detail </MazLink>
  <MazLink color="black"> View product detail </MazLink>
  <MazLink color="theme"> View product detail </MazLink>
  ```

  </template>
</ComponentDemo>

## RouterLink

When you use the `to` prop, the component will be a `router-link` and will use the `router` to navigate.

<ComponentDemo>
  <MazLink :to="{ path: '/' }"> View product detail </MazLink>

  <template #code>

  ```html
  <MazLink :to="{ path: '/' }"> View product detail </MazLink>
  ```

  </template>
</ComponentDemo>

## Icons

You can add an icon on the left and right to the link text with the `left-icon` and `right-icon` props.

For more information about the icons, please check the [MazBtn](./maz-btn.md#icons) page.

<ComponentDemo>
  <MazLink left-icon="home" :right-icon="CheckIcon"> View product detail </MazLink>

  <template #code>

  ```vue
  <template>
    <MazLink left-icon="home" :right-icon="CheckIcon">
      View product detail
    </MazLink>
  </template>

  <script lang="ts" setup>
    import CheckIcon from 'maz-ui/icons/check.svg'
    import HomeIcon from 'maz-ui/icons/home.svg'
  </script>
  ```

  </template>
</ComponentDemo>

## External icon

When you use the `autoExternal` prop, the component will have an external icon if the link has the target `_blank`.

<ComponentDemo>
  <MazLink href="https://loicmazuel.com" target="_blank" auto-external> View product detail </MazLink>

  <template #code>

  ```html
  <MazLink href="https://loicmazuel.com" target="_blank" auto-external>
    View product detail
  </MazLink>
  ```

  </template>
</ComponentDemo>

<script setup lang="ts">
  import CheckIcon from 'maz-ui/icons/check.svg'
  import HomeIcon from 'maz-ui/icons/home.svg'
</script>
<!--@include: ./../.vitepress/generated-docs/maz-link.doc.md-->
