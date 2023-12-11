<script setup lang="tsx">
import { computed, type FunctionalComponent } from 'vue';
import { RouterLink } from 'vue-router';
import IconCompose from 'virtual:icons/ion/compose';
import IconSettings from 'virtual:icons/ion/gear-a';
import { useUser } from '../../api/hooks/user.get';
import { isNotNull } from '@realworld/utils';
import { Avatar } from './avatar';
import type { RoutePath } from '../../router/routes.const';

interface Item {
  id: string;
  name: string;
  icon?: FunctionalComponent;
  href: RoutePath;
}

const itemsPublic: Item[] = [
  { id: 'home', name: 'Home', href: '/' },
  { id: 'login', name: 'Sign in', href: '/login' },
  { id: 'register', name: 'Sign up', href: '/register' },
];

const itemsPrivate: Item[] = [
  { id: 'home', name: 'Home', href: '/' },
  {
    id: 'new_article',
    name: 'New Article',
    icon: IconCompose,
    href: '/editor',
  },
  { id: 'settings', name: 'Settings', icon: IconSettings, href: '/settings' },
];
const userItem = computed<Item | null>(() =>
  user.value
    ? {
        id: 'user',
        name: user.value.username ?? '',
        href: `/profile/${user.value.username}`,
        icon: () => <Avatar user={user.value!} size="sm" />,
      }
    : null
);

const { user } = useUser();

const items = computed(() =>
  user.value ? [...itemsPrivate, userItem.value].filter(isNotNull) : itemsPublic
);
</script>

<template>
  <header>
    <div class="flex items-center justify-between max-w-6xl px-4 py-2 mx-auto text-md h-14">
      <!-- logo -->
      <RouterLink to="/" class="text-2xl leading-[3.75rem] font-bold text-primary font-title">
        conduit
      </RouterLink>

      <!-- menu -->
      <nav>
        <ol class="flex h-full gap-4">
          <li v-for="item in items" :key="item.id" class="h-full">
            <RouterLink
              :to="item.href"
              active-class="active !text-base-content/100"
              class="flex items-center h-full text-base-content/60 hover:text-base-content/90"
            >
              <component :is="item.icon" v-if="item.icon" class="w-6 h-6 mr-1" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </li>
        </ol>
      </nav>
    </div>

    <!-- page header -->
    <router-view name="header" />
  </header>
</template>

<style scoped></style>
