# Clio + Calliope Website

## Contributing

After cloning the repo, run `npm install` to install all the npm packages.

This project uses Webpack to compile styles, optimize file sizes, and generally build the development and production bundles. The following scripts are available to you:

<!-- - `gulp watch` runs a local server and serves up **app/index.html** at http://localhost:3000. It also automatically reloads when any files are changed. -->
- `npm run build` prepares production-ready build in a **build/** folder which also uglifies the javascript. Open **build/index.html** in your browser to see the production code.
<!-- - `gulp deploy` deploys the current **build/** to the `gh-pages` branch and pushes it to Github. You can then see it at https://siakaramalegos.github.io/clioandcalliope/. -->

**IMPORTANT**: Only edit code in the **app/** folder. The build folder's contents are deleted with every build so that code is never saved.

