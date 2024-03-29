<h1 align="center">Angular - The modern web developer's platform</h1>

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/512px-Angular_full_color_logo.svg.png" alt="angular-logo" width="120px" height="120px"/>
  <br>
  <em>Angular is a development platform for building mobile and desktop web applications
    <br> using TypeScript/JavaScript and other languages.</em>
  <br>
</p>

<p align="center">
  <a href="https://angular.dev/"><strong>angular.dev</strong></a>
  <br>
</p>

<p align="center">
  <a href="CONTRIBUTING.md">Contributing Guidelines</a>
  ·
  <a href="https://github.com/angular/angular/issues">Submit an Issue</a>
  ·
  <a href="https://blog.angular.io/">Blog</a>
  <br>
  <br>
</p>

<p align="center">
  <a href="https://circleci.com/gh/angular/workflows/angular/tree/main">
    <img src="https://img.shields.io/circleci/build/github/angular/angular/main.svg?logo=circleci&logoColor=fff&label=CircleCI" alt="CI status" />
  </a>&nbsp;
  <a href="https://www.npmjs.com/@angular/core">
    <img src="https://img.shields.io/npm/v/@angular/core.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen" alt="Angular on npm" />
  </a>&nbsp;
  <a href="https://discord.gg/angular">
    <img src="https://img.shields.io/discord/463752820026376202.svg?logo=discord&logoColor=fff&label=Discord&color=7389d8" alt="Discord conversation" />
  </a>
</p>

<p align="center">
  <a href="https://app.circleci.com/insights/github/angular/angular/workflows/default_workflow?branch=main">
    <img src="https://dl.circleci.com/insights-snapshot/gh/angular/angular/main/default_workflow/badge.svg" alt="InsightsSnapshot" />
  </a>
</p>

<hr>

## Documentation

Get started with Angular, learn the fundamentals and explore advanced topics on our documentation website.

- Package Installation
- Configuration
- Dockerfile
- docker-compose

### Package Installation - Add package dependencies in package.json - Under block "devDependencies"
#### *Note: Make sure you have to choose compatible version*
```
"@angular-builders/custom-webpack": "8.1.0",
"@types/node": "8.9.5",
"@types/webpack": "^5.28.5",
"dotenv": "8.1.0"
```
##
### Configuration
#### ✅ Create webpack.config.js under configs folder
```
const { EnvironmentPlugin } = require('webpack');
module.exports = {
    plugins: [
        new EnvironmentPlugin([
            'API_URL',
            'PDF_URL',
            'PRINT_URL',
            'FILE_URL',
            'USERNAME',
            'PASSWORD'
        ])
    ]
};
```
*Variables from environment.prod.ts*
```
export const environment = {
    production: true,
    hmr       : false, 
    token: 'temp-token',

    apiUrl: process.env.API_URL,
    pdfUrl: process.env.PDF_URL,
    printUrl: process.env.PRINT_URL,
    fileUrl: process.env.FILE_URL,

    username: process.env.USERNAME,
    password: process.env.PASSWORD,
};
```
#### ✅ Add this under json block in tsconfig.app.json and under "compilerOptions" in tsconfig.json
```
"types": [
            "node"
        ]
```
#### ✅ In Angular.json, add this under "build" block
```
"builder": "@angular-builders/custom-webpack:browser",
"options": {
  "customWebpackConfig": {
    "path": "./configs/webpack.config.js"
  }
```
#### Under "server" block
```
"builder": "@angular-builders/custom-webpack:dev-server"
```
##
### Dockerfile
In Code Repository, I have separated two `Dockerfile`:
  - Ng.Dockerfile => *Run serve application*
  - Devk8s.Dockerfile => *Run build and Deploy*

### Docker Compose
<img src="https://i0.wp.com/codeblog.dotsandbrackets.com/wp-content/uploads/2016/10/compose-logo.jpg?ssl=1" alt="angular-logo" width="120px" height="120px"/>
Docker Compose is a tool for running multi-container applications on Docker
defined using the [Compose file format](https://compose-spec.io).
A Compose file is used to define how one or more containers that make up
your application are configured.
Once you have a Compose file, you can create and start your application with a
single command: `docker compose up`.

#### `Ng.Dockerfile`
```
version: '3.8'
services:
  osr-ng:
    container_name: ossr-f-angular
    build:
      context: ./ossr-web-angular/.
      dockerfile: Ng.Dockerfile
    # Check port in angular.json
    ports:
        - "1035:8080"
    environment:
        API_URL: 'https://dev-kube-osr.mpwt.gov.kh/api'
        PDF_URL: 'https://dev-kube-osr.mpwt.gov.kh/api'
        PRINT_URL: 'https://dev-kube-osr.mpwt.gov.kh/api'
        FILE_URL: 'https://dev-kube-osr.mpwt.gov.kh/api'
        USERNAME: '0965416704'
        PASSWORD: '111111'
    networks:
        - project
networks:
  project:
    driver: bridge
```
#### `Devk8s.Dockerfile`
```
version: '3.8'
services:
  osr-build:
    container_name: ossr-f-angular
    # build time
    build:
      context: ./ossr-web-angular/.
      dockerfile: Devk8s.Dockerfile
      args:
        API_URL: 'https://dev-kube-osr.mpwt.gov.kh/api'
        PDF_URL: 'https://dev-kube-osr.mpwt.gov.kh/api'
        PRINT_URL: 'https://dev-kube-osr.mpwt.gov.kh/api'
        FILE_URL: 'https://dev-kube-osr.mpwt.gov.kh/api'
        USERNAME: '0965416704'
        PASSWORD: '111111'
    ports:
        - "1035:80"
    networks:
        - ossr_web
networks:
  ossr_web:
    driver: bridge
```
