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
		withTRPC: _withTRPC,
	};
}

type trpcRemixReturn<TRouter extends AnyRouter> = {
	proxy: CreateTRPCReact<TRouter, unknown, null>;
	withTRPC: (Component: FC<{}>) => ReactElement<any, string | JSXElementConstructor<any>>;
};
