# TODO

## 2023-09-02

### NPM Registry
- [x] NPM Publish - take major, minor, patch input and use to bump version number before publish
- [x] Fix loss of packages when rebuilding registry container (create volume for storage)
- [x] figure out how to either style or disable registry UI
- [x] test package pull as a user
- [ ] ~~create process to add/remove users to htpasswd~~
- [ ] document how to get NPM set up as a user
- [ ] test it out
- [x] build api to get list of versions available
- [x] create trial signup api (email for license key)
- [ ] create trial package
- [ ] create pro (licensed) package
- [x] build seeders for database
- [ ] build license key checker

## 2024-02-21

- [x] UGLGrid Story 
- [x] DataTable (and all sub-components) Story
- [x] Factor our Primitives tree
- [x] Factor out connections to Storybook directory
- [ ] production site build
    - [x] fix browser warnings
    - [x] fix headless styles
    - [x] fix hitting reload on docs loads homepage
    - [x] fix icons not loading for themes
    - [ ] enable unit tests on build
- [ ] production lib build
    - [ ] update components file
    - [ ] tree shaking component import
- [x] Run Unit Tests to get sense of rehab work
- [ ] DataTable Overflow & VirtualScroll 
    - [ ] ColumnSort Handling
- [ ] create one theme
- [ ] animations
- [ ] a11y




Extra

- [ ] consider switch to npm repo & license checker & EULA
- [ ] refactor older components to use Primitive