# MH ZURB Web Template
Based on v6.5 of Foundation 

This is a variant of the [ZURB Foundation Template for Sites](https://github.com/zurb/foundation-zurb-template).  It has a Gulp-powered build system with these features:

- Handlebars HTML templates with Panini
- SCSS compilation and prefixing
- JavaScript concatenation for our scripts
- Built-in BrowserSync server
- Style Sherpa style guide generator
- Poduction builds also include CSS and JS compression

## Before Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (Version 8.12 or greater)
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/)
- Depending upon your operating system, you may also need [windows-build-tools with python](https://www.npmjs.com/package/node-gyp)

To download the currect repo, change into the desired directory (for example: IWTemp) and clone the repo. 

```bash
cd \IWTemp
git clone https://github.com/SCarrero/newsite newsite
```

Then open the repo folder in your command line, and run `yarn` to install the needed dependencies:

```bash
cd newsite
yarn
```

## Once Installed

Before you start making any changes, create your own git branch for version control, so that you aren't editing content in the master branch.  Run this command from inside your repo folder:

```bash
git checkout -b branchname
```

Run Gulp to build your site and watch your files for changes as you develop.  Your development site will be created in a folder called `dist`, viewable at `http://localhost:8000`. Run this command from inside your repo folder:

```bash
yarn start
```

## Production Ready Build

To create compressed, production-ready assets that you can upload to the web server, run this command from inside your repo folder:

```bash
yarn build
```

## Developer SASS Notes
- Remember to create a new Git branch before you make changes, so that you aren't updating the master.
- Do not include browser-prefixes in the scss, they will be generated for you.
- If you are designing a variation of an element, add the new styles to the appropriate scss file.  If you are designing a new "widget" that is unique in purpose from existing elements, create a new scss file for it and update app_corp.css to include it.
- When the production code is generated, all white space and comments are trimmed, so format your code for ease of readability using multiple lines and indentations for each style definition, and use comments whenever you need to include explanation for other developers. 
- Avoid the use of the & to concatenate strings in your SCSS classes, avoid nesting styles, and avoid overriding existing styles (always search through all files to insure that the style you are creating isn't already defined). 
- Whenever possible (and when not conflicting with foundation class names) follow the SMACSS methodology: keep all styles lowercased, use hyphens instead of underscores, and aim for block-element-modify order (for example class footer-promo-cta). 

