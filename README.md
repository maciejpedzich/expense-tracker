# expense-tracker

## Prerequisites

 - Node.js (version >= 8.0.0),
 - Vue.js (version >=2.6.11)

## Project setup
```
npm install
```

Create `.env` file with the following variables

```
PORT=<Port number; e.g. 5000 (cannot be equal to 3000)>
MONGODB_URI=<MongoDB Connection URI>
```

Replace the `<YOUR_API_URL_HERE>` in `src/frontend/environment/index.js` with your Express server URL

### Compiling and hot-reloads for development

**Vue Development Server**

```
npm run serve
```

**Express Server**
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
