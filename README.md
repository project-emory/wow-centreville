# WOW Centreville

A full-stack ordering platform for WOW Fresh Meat Centreville.

## Best Practice

Here are some best practices when contributing to the WOW Centreville project:

### Git

- You **cannot** and **should not** commit to either `main` or `dev`!

  - Instead, create a new branch off of `dev` when working on a feature, preferably named `username/feature` (ie, `andrewtlu/menu-endpoints`).
  - Once you're done, create a pull request describing your changes and add both [andrewtlu](https://github.com/andrewtlu) and [esunn0412](https://github.com/esunn0412) as reviewers.
  - DO NOT work on someone else's branch unless you have their permission! However, you can create a new branch from their branch.

- Commit often, commit well!

  - Whenever you make a logical group of changes (ie, changed a model or implemented part of a component), stage and commit your changes so we can see what you've done and you don't accidentally lose any changes.
  - Name your changes in present tense with a semi-descriptive message (ie, `Add submit button component`, _NOT_ `changed stuff`).
  - Make sure to push your changes to your branch frequently so that the branch in GitHub is up to date.

### Style

- We have predefined styles in the project! We use `prettier` on the frontend, and `ruff` on the backend.
  - To format the frontend, you can run `npm run format`
  - To format the backend, you can run `ruff format ./`
  - There may be issues with your code outside of formatting - see the respective READMEs for more information.
  - GitHub will notify you if your code is not up to our style guidelines. It is preferable you run these before every commit; your code MUST be styled properly to be merged into dev/main.

## Setup

See `frontend/` and `backend/` for their respective instructions. For general setup:

1. **Read through the [best practices](#best-practice)!** <- this is **_VERY_** important

2. Install [git](https://git-scm.com/downloads)

3. Set up the repository locally and configure proper git credentials.

   - Clone the repository via HTTPS or SSH (click the big green `<> Code` button)
   - Configure your git credentials either with a [personal access token](https://github.com/settings/tokens) (if cloning via HTTPS) or an [SSH key](https://github.com/settings/keys) (if cloning via SSH)

4. Join our slack to keep in touch outside of club meetings
