---
name: 'feature-integration'
description: 'Integrate a backend API/feature into an ALREADY-CREATED screen in a React Native (Expo Router) app that uses RTK Query and plop — scaffolds the API layer and wires its hooks into the existing screen. Does NOT create the screen, copy, or styling. USE THIS whenever the user asks to "integrate the X screen", "wire up/hook up the X page or feature", "connect X to the API", "add the X endpoint", or otherwise work with files under apis/.'
argument-hint: 'Optional: the screen/feature name and what it should do'
user-invocable: true
disable-model-invocation: false
---

## User Input

```text
$ARGUMENTS
```

# Feature / Screen Integration

For React Native apps on **Expo Router** with a **feature-scoped/shared** component
system, **RTK Query** for all networking, and **plop** for scaffolding.

**The screen/page component already exists.** This skill does *not* create
screens or routes, nor handle copy/translations or styling — it scaffolds the API
layer and wires its hooks into the existing page. Follow the order below; skip
steps that don't apply. Adapt the exact paths and tokens (reducer path, env var
names) to whatever the repo uses.

## Project map

| Layer | Location | Notes |
| --- | --- | --- |
| Routes (expo-router) | `app/(<group>)/<screen>/` | `<group>` is whatever route groups the app uses (e.g. `(main)`, `(auth)`, …); `index.tsx` just re-exports a named screen from the feature's barrel |
| Feature barrel (entry point) | `components/features/<group>/index.ts` | the **only** path anything outside the feature imports through — never a deep `screens/` or `components/` path (documented exception: side-effect modules such as `notifications/NotificationListenerContainer`) |
| Page components | `components/features/<group>/screens/<Name>/` | the real screen logic + API hooks live here; re-exported from the feature's `index.ts` as `<Name>Screen` |
| Screen layout | `components/shared/layout/ScreenWrapper/` | every screen renders inside `ScreenWrapper` (auth layout by default, `variant="main"` for main-flow screens) |
| Reusable UI | `components/shared/{ui,layout,wrappers}/` | ui (generic primitives), layout (navigation/chrome), wrappers (container/overlay) |
| Feature-scoped components | `components/features/<feature>/` | scoped to specific product features (e.g. auth, main, notifications); sub-components usually under `components/features/<feature>/components/` |
| Hooks | `hooks/use<Name>.ts` | shared hooks (what `npx plop create <Name> hook` emits); a hook only one feature uses may be colocated under `components/features/<feature>/`, but prefer `hooks/` first |
| API instance + auth/refresh | `apis/index.ts` | single `splitApi`, do not re-create |
| Endpoints per domain | `apis/services/<feature>/index.ts` | `api.injectEndpoints` + exported hooks |
| Request/response types | `apis/services/<feature>/types.ts` | imported by the sibling `index.ts`; shared `PaginatedResponse<T>` from `apis/@types/general.ts` |
| Cache tags | `apis/tagTypes.ts` | wired via `providesTags`/`invalidatesTags` |
| Global error toast | `apis/middlewares/errorMiddleware.ts` | opt out with `skipGlobalErrorHandling` |
| Scaffolding | `plopfile.js`, `plop-templates/` | `npx plop create` |

## Scaffolding (preferred starting point)

Run the generator instead of hand-creating files — it enforces the folder layout:

```bash
npx plop create <Name> integration
```

Types (the `type` prompt): `component | screen | hook | util | svg | integration`.

- **integration** → scaffolds the whole RTK Query API layer in one shot under a per-feature folder: `apis/services/<camelName>/types.ts` (list/detail/params/create/update types) and `apis/services/<camelName>/index.ts` (injected `get…s` / `get…Details` / `create…` / `update…` / `delete…` endpoints + exported hooks, URLs kebab-cased and pluralised, types imported from `./types`), and auto-registers the `"<Name>"` and `"<Name>s"` cache tags in `apis/tagTypes.ts`. Then fill in the `TODO`s with the real backend fields. **Prefer this over hand-writing the API files.**

To locate the existing screen's logic: the route `app/(<group>)/<screen>/index.tsx`
typically just re-exports a named screen from the feature's barrel, e.g.
`export { <Name>Screen as default } from "@/components/features/<group>";` — barrel
screen exports carry a `Screen` suffix on the alias (only the alias, not the folder)
to stay visually distinct from plain component exports. Follow the base name into
`components/features/<group>/screens/<Name>/` (e.g. `LoginScreen` →
`components/features/auth/screens/Login/`) — that page component is the file
you wire into (edit it directly; do not import/re-export through the barrel from
inside the same feature).

## Step-by-step integration

### 1. API layer

Scaffold it with `npx plop create <Name> integration`, then edit and remove the unneccessary code in the generated `apis/services/<feature>/types.ts` and `apis/services/<feature>/index.ts`:

1. **Types** (`types.ts`) — replace the `TODO`s with the real backend fields: list item, detail (`extends` item), params, create/update bodies.
2. **Service** (`index.ts`) — keep/trim the generated `get…s` / `get…Details` / `create…` / `update…` / `delete…` endpoints to match the real routes; fix the URL paths if they aren't a simple plural; hooks are already exported. Paginated lists stay wrapped in `PaginatedResponse<T>`.
3. **Tags** — the generator registers `"<Name>"`/`"<Name>s"` in `apis/tagTypes.ts` and wires `providesTags`/`invalidatesTags`; adjust if the real invalidation graph differs.

See the **API conventions (detail)** section below for the rules behind the template.

### 2. Wire the hooks into the existing screen

Locate the existing page component (the route at `app/(<group>)/<screen>/index.tsx`
re-exports it by name from the feature's barrel at `components/features/<group>/index.ts`,
which in turn re-exports it from `components/features/<group>/screens/<Name>/`, where
`<group>` is whatever route group the screen belongs to). Edit the screen file directly — do not create it, and do not route the edit through the barrel.
Replace placeholder/mock data with the generated hooks:

- Read route params with `useLocalSearchParams<{ id: string }>()`; navigate with `useRouter()` from `expo-router`.
- Consume the API via the generated hooks, e.g.
  `const { data, isLoading, isError, refetch } = useGetXQuery({ id: Number(id) }, { skip: !token })`.
  Mutations: `const [createX, { isLoading }] = useCreateXMutation()`.
- Use the `skip` option to defer auth-gated queries until the token is present.
- Handle the `isLoading` / `isError` states and feed `data` into the components already on the screen.
- Keep the screen's existing `ScreenWrapper` (`components/shared/layout/ScreenWrapper`) as its root and render loading/error/empty states inside it — do not swap it for a new screen container.
- If the integration needs a new feature-only sub-component or hook, put it under that feature
  (`components/features/<feature>/`) and import it directly from inside the feature. Add a named
  export to the feature's `index.ts` only if code outside the feature consumes it.

---

## API conventions (detail)

Handled centrally in `apis/index.ts` — **never re-implement** (read that file to
confirm the specifics): the auth header (e.g. `Authorization: Token <token>`), the
base URL built from an env var + locale, automatic token refresh + retry on auth
failure, and no-internet detection.

Service template (this is what `npx plop create <Name> integration` emits — shown
here as reference; scaffold it rather than typing it out):

```ts
import api from "@/apis";
import { PaginatedResponse } from "@/apis/@types/general";
import { FooListItem, FooParams, CreateFooBody } from "./types";
import getSerializedQueryArgs from "@/utils/getSerializedQueryArgs";
import infintyPaginationMergeHandler from "@/utils/infintyPaginationMergeHandler";

export const fooApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFoos: build.query<PaginatedResponse<FooListItem>, FooParams>({
      query: (params) => ({ url: "/foos/", method: "GET", params }),
      // infinite-pagination trio (lists only):
      serializeQueryArgs: getSerializedQueryArgs,
      merge: infintyPaginationMergeHandler,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ["Foos"],
    }),
    createFoo: build.mutation<FooListItem, CreateFooBody>({
      query: (body) => ({ url: "/foos/", method: "POST", body }),
      invalidatesTags: ["Foos"],
    }),
  }),
});

export const { useGetFoosQuery, useLazyGetFoosQuery, useCreateFooMutation } = fooApi;
```

- `build.query` for reads, `build.mutation` for writes; generics `<ResultType, ArgType>` (use `void` when no args). Always export hooks; lists also export `useLazy…`.
- Naming: `get… / create… / update…` (PATCH) `/ delete…`. By-id args `{ id: number }`; update args `{ id: number } & SomeBody` with `query: ({ id, ...body }) => …`.
- Per-item tags: `providesTags: (_r, _e, { id }) => [{ type: "Foo", id }]`.
- **Pagination**: use the trio only for paginated lists; `getSerializedQueryArgs` caches by every arg except `page`, `infintyPaginationMergeHandler` appends pages, components page via the `useLazy…` hook.
- **Local error handling**: add `skipGlobalErrorHandling?: boolean` to the arg type and pass it through the request object; the error middleware reads `meta.arg.originalArgs.skipGlobalErrorHandling` to skip the global toast. Grep an existing service for `skipGlobalErrorHandling` for a working example.
- **Optimistic updates / response reshaping**: use `onQueryStarted` + `api.util.updateQueryData` with `undo()` on failure, and `transformResponse` to reshape payloads. Find an existing service that already does this in the repo and mirror its pattern.

## Finishing checklist

- [ ] API layer scaffolded with `npx plop create <Name> integration` (not hand-written).
- [ ] Generated `TODO`s filled in (`apis/services/<feature>/types.ts`); types match backend field names; unused endpoints trimmed in `index.ts`.
- [ ] Tags registered in `apis/tagTypes.ts` + wired via `providesTags`/`invalidatesTags`.
- [ ] Paginated lists use the `serializeQueryArgs`/`merge`/`forceRefetch` trio.
- [ ] Hooks wired into the **existing** page component in `components/features/<group>/screens/<Name>/` (no new screen/route created), still rendered inside its `ScreenWrapper`.
- [ ] Any new feature-only component/hook lives under `components/features/<feature>/`; code outside the feature imports it only via `@/components/features/<feature>`.
- [ ] No re-implementing auth headers, base URL, refresh, or global error handling.
- [ ] Typecheck/lint passes (project script, or `npx tsc --noEmit`).
