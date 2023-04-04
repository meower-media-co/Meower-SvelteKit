# Contributing to SvelteKit Client (Meower-SvelteKit)

## Branch info

Development takes place on the `develop` branch, with `main` being the production branch which you see at https://sveltekit.meower.org.

The `development` branch is merged into `main` for each release. Please do not commit directly to `main` or `develop` unless you are a maintainer.

Other branches should be used for specific features, and should be merged into `develop` when ready. Try to name them your username and the feature name, like `tnix/cool-feature`.

## Setting up your development environment

Requirements:

- Node 16 or higher (18 is recommended)
- Yarn 1 (do not use Yarn 2)
- Git

To clone and run a development server on your machine (with hot reloading and your own branch):

```sh
# clones the repo and creates a new branch called your-branch-name that's based on develop
git clone https://github.com/meower-media-co/Meower-Svelte
cd Meower-SvelteKit
git switch develop
git branch your-branch-name
# install dependencies
yarn
# start a dev server
yarn dev
```

## Building for prod

To build the app for prod all you need to do is run `yarn build`. This will create a `build` folder with the compiled app. If you push to Github, Cloudflare Pages will create a preview URL for you are `https://[branchname].meower-svelte.pages.dev`.
