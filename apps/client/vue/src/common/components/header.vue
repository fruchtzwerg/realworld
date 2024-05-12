<script setup lang="tsx">
import { computed, type FunctionalComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import IconCompose from 'virtual:icons/ion/compose';
import IconSettings from 'virtual:icons/ion/gear-a';
import IconHome from 'virtual:icons/ion/home-outline';
import IconMenu from 'virtual:icons/ion/ellipsis-vertical';
import IconLock from 'virtual:icons/ion/lock-open-outline';
import IconRegister from 'virtual:icons/ion/person-add-outline';
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
  { id: 'home', name: 'Home', href: '/', icon: IconHome },
  { id: 'login', name: 'Sign in', href: '/login', icon: IconLock },
  { id: 'register', name: 'Sign up', href: '/register', icon: IconRegister },
];

const itemsPrivate: Item[] = [
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

const items = computed(() => (user.value ? itemsPrivate : itemsPublic));

const mobileMenuActive = ref(false);

const MenuItem: FunctionalComponent<{ item: Item; linkClass: string }> = ({
  item,
  linkClass,
  ...props
}) => (
  <li {...props} class="h-full">
    <RouterLink
      to={item.href}
      active-class="active !text-base-content/100"
      class={[linkClass, 'items-center text-base-content/60 hover:text-base-content/90']}
    >
      {item.icon && <item.icon class="w-6 h-6 mr-1" />}
      <span>{item.name}</span>
    </RouterLink>
  </li>
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
      <nav class="flex items-center gap-4">
        <RouterLink v-if="userItem" :to="userItem.href" class="flex items-center gap-2">
          <component :is="userItem.icon" v-if="userItem.icon" class="w-8 h-8" />
          <span>{{ userItem.name }}</span>
        </RouterLink>

        <!-- Mobile -->
        <button
          @click="mobileMenuActive = !mobileMenuActive"
          v-click-outside="() => (mobileMenuActive = false)"
          class="rounded-full md:hidden text-base-content/60 hover:text-base-content/90 hover:bg-base-content/30 size-8"
        >
          <IconMenu class="m-auto" />

          <ol
            v-show="mobileMenuActive"
            class="absolute right-0 z-10 w-40 rounded-md shadow-md top-14 bg-base-200"
          >
            <MenuItem
              v-for="item in items"
              :key="item.id"
              :item="item"
              linkClass="flex p-4 gap-2"
            />
          </ol>
        </button>

        <!-- Desktop -->
        <ol class="hidden h-full gap-4 md:flex">
          <MenuItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            linkClass="flex items-center h-full"
          />
        </ol>
      </nav>
    </div>

    <!-- page header -->
    <router-view name="header" />
  </header>
</template>

<style scoped></style>
