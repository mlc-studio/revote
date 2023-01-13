# ReVote (revote)
An application that you can create vote and voting for them
![Revote Cover](https://github.com/macsimtv/revote/blob/main/cover.jpg)

## User Stories
- [X]  User can authenticate
- [X]  User can view & vote a revote from anyone
- [X]  User can create, delete own revote
- [ ]  User can cook an egg <🍳>

## Install the dependencies
```bash
yarn
# or
npm install
```

### Import json files into your mongodb
- `users.json`
- `votes.json`
- `revotes.json`

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Build the app for production
```bash
quasar build
```

### Dont forget this !
Change the api uri in ``/app/src/boot/axios.js`
```js
const api = axios.create({ baseURL: 'YOUR API URL HERE' })
```
there is an `.env.example` in `/api` folder, you can use it to create your own `.env`

