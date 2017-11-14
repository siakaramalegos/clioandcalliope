# Clio + Calliope Website

## Contributing

After cloning the repo, run `npm install` or `yarn` to install all the npm packages.

If you don't already have [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) installed on your system, add it with `npm install --global gulp-cli`.

Now you can run the following tasks:

- `gulp watch` runs a local server and serves up **app/index.html** at http://localhost:3000. It also automatically reloads when any files are changed.
- `gulp build` prepares production-ready build in a **build/** folder. Open **build/index.html** in your browser to see the production code.
- `gulp deploy` deploys the current **build/** to the `gh-pages` branch and pushes it to Github. You can then see it at https://siakaramalegos.github.io/clioandcalliope/.

**IMPORTANT**: Only edit code in the **app/** folder. The build folder's contents are deleted with every build so that code is never saved.

If you get an error like `Error: EACCES: permission denied, mkdir '/build'` when trying to run `gulp build`, preface it with `sudo` instead: `sudo gulp build`. You will have to enter the admin password on your computer.

### Webpack

- `npm run build` creates the build files for production
