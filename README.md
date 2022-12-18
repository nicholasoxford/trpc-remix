# `@noxford1/trpc-remix`

> Connect a [tRPC](https://trpc.io) router to remix.

## Installation

```bash
# npm
npm install @noxford1/trpc-remix @trpc/react-query @tanstack/react-query

# Yarn
yarn add @noxford1/trpc-remix @trpc/react-query @tanstack/react-query

# pnpm
pnpm add @noxford1/trpc-remix @trpc/react-query @tanstack/react-query
```

## Goal

Rewrite the great [work by ggrandi](https://github.com/ggrandi/trpc-remix) to use most up to date react query and trpc packages.

Enable ssr ?

### The old code

```ts
import { createReactQueryHooks, createReactQueryHooksProxy } from "@trpc/react";
import type { AnyRouter } from "@trpc/server";
import { type WithTRPCNoSSROptions, withTRPC } from "./withTRPC";

export type Hooks<TRouter extends AnyRouter> = ReturnType<typeof createReactQueryHooks<TRouter>>;

export function createTRPCRemix<TRouter extends AnyRouter>(
	opts: WithTRPCNoSSROptions<TRouter>
): {
	proxy: ReturnType<typeof createReactQueryHooksProxy<TRouter>>;
	useContext: Hooks<TRouter>["useContext"];
	useInfiniteQuery: Hooks<TRouter>["useInfiniteQuery"];
	useMutation: Hooks<TRouter>["useMutation"];
	useQuery: Hooks<TRouter>["useQuery"];
	useSubscription: Hooks<TRouter>["useSubscription"];
	withTRPC: ReturnType<typeof withTRPC<TRouter>>;
	queries: Hooks<TRouter>["queries"];
} {
	const hooks = createReactQueryHooks<TRouter>();
	const proxy = createReactQueryHooksProxy<TRouter>(hooks);

	const _withTRPC = withTRPC<TRouter>(opts);

	return {
		proxy,
		useContext: hooks.useContext,
		useInfiniteQuery: hooks.useInfiniteQuery,
		useMutation: hooks.useMutation,
		useQuery: hooks.useQuery,
		useSubscription: hooks.useSubscription,
		withTRPC: _withTRPC,
		queries: hooks.queries,
	};
}
```

What I think might be the right approach

```ts
import { CreateTRPCReact, createTRPCReact } from "@trpc/react-query";
import type { AnyRouter } from "@trpc/server";
import { FC, JSXElementConstructor, ReactElement } from "react";
import { type WithTRPCNoSSROptions, withTRPC } from "./withTRPC";

export type Hooks<TRouter extends AnyRouter> = ReturnType<typeof createTRPCReact<TRouter>>;

export function createTRPCRemix<TRouter extends AnyRouter>(
	opts: WithTRPCNoSSROptions<TRouter>
): trpcRemixReturn<TRouter> {
	const proxy = createTRPCReact<TRouter>({});

	const _withTRPC = withTRPC<TRouter>(opts);

	return {
		proxy,
		_withTRPC,
	};
}

type trpcRemixReturn<TRouter extends AnyRouter> = {
	proxy: CreateTRPCReact<TRouter, unknown, null>;
	_withTRPC: (Component: FC<{}>) => ReactElement<any, string | JSXElementConstructor<any>>;
};
```
