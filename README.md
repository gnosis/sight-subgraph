# Conditional Tokens Subgraph

Subgraph (thegraph.com) for Conditional Tokens platform

---

## Subgraphs available
- Test environments:
  - **rinkeby**
  - **mainnet**
- Production environments:
  - **mainnet**

## Deployment Instructions

1. [ONLY the first time] `yarn install`

2. [ONLY the first time] `npx graph auth https://api.thegraph.com/deploy/ <ACCESS_TOKEN>` (ACCESS_TOKEN is on thegraph.com)

3. `yarn build-deploy:rinkeby-test` | `yarn build-deploy:mainnet-test` | `yarn build-deploy:mainnet-prod` (Choose your network deployment)
