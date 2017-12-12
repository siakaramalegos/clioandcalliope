# Clio + Calliope Website

## Contributing

After cloning the repo, run `npm install` to install all the npm packages.

This project uses Webpack to compile styles, optimize file sizes, and generally build the development and production bundles. The following scripts are available to you:

- `npm start` or `npm run start` runs the development server which both prepares the build and serves it up at http://localhost:8080/. The build files are saved in memory, not in a specific folder.
- `npm run build` prepares production-ready build in the **build/** folder which also uglifies the javascript and minifies the HTML. Assets are prepared for a root-level public path (www.clioandcalliope.com), thus viewing build/index.js locally will not render them correctly. Copy the contents of the **build/** folder to AWS.
- `npm run staging` prepares a staging-ready build in **build/** then deploys it to the `gh-pages` branch and pushes it to Github. You can then see it at https://siakaramalegos.github.io/clioandcalliope/. Note that opening build/index.js locally will not render assets correctly.

**IMPORTANT**: Only edit code in the **app/** folder. The build folder's contents are deleted with every build so that code is never saved.

