
# rvr-launcher

RVRlauncher creates a button and places it in the lower right corner of the screen. The user clicking the button will be able to launch the current page they are viewing in Reportal in VR/AR mode.
If you use it as a part of a bundle, import it and use it there. if you place this module as a standalone one, you need to upload files from the dist folder into the FileLibrary and reference them on your PageMaster that is used across the non-VR pages. Then you may use the following snippet:

``` html
<link rel="stylesheet" href="/isa/BDJPFRDMEYBPBKLVADAYFQCDAVIOEQJR/YourProjectFolder/rvr-launcher.css">
<script src="/isa/BDJPFRDMEYBPBKLVADAYFQCDAVIOEQJR/YourProjectFolder/rvr-launcher.bundle.js"></script>
<script>
// we don't want to launch it when it's inside an iframe that we already load from VR mode
(function(){ if(window.self == window.top){return new Reportal.RVRlauncher('b222f4a4-2b35-4622-9cbf-cf03c981b852', true)} })();
</script>
```

## Customize

The following CSS variables (with their default values) are used to customize the color of the button, so if you have the necessary palette in your project, then it will take the default values of the primary and accent colors:

```css
:root{
  --rvr-launcher-background:var(--default-primary-color, #03a9f4);
  --rvr-launcher-hover-background:var(--dark-primary-color, #0277bd);
  --rvr-launcher-active-background:var(--accent-color, #4caf50);
  --rvr-launcher-color: var(--text-primary-color, #fff);
}
```


### Commands (configured in package.json)

- `npm install` installs all dependencies of the project
- `npm run build:prd` generates minified build files under `/dist` folder 
- `npm run build:dev` generates build files under `/dist` folder and starts watching all changes made to the project during this session, appending them to the build files
- `npm test` Runs tests that have been written and put into `/src/__tests__` folder. (Note: test should follow name convention: `NameOfClass-test.js` which is a test for `NameOfFile.js`)
- `npm run lint` Lints your JavaScript code placed in src folder.
- `npm run docs` generates documentation for your project `.js` files that use JSDoc3 comments and puls them into `docs` folder
- `npm run docs-commit`  publishes documentation to `http://ConfirmitASA.github.io/[RepoName]/[version]/` where `[RepoName]` is name of your repository as well as name specified in `package.json -> name` AND `[version]` is the version in your `package.json`. 
Please make sure you have the `npm run docs-commit` command configured properly with the correct name of repo to be used there.
