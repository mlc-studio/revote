import express from 'express';
import cors from 'cors';

import './src/config/database.js';
import routes from './src/routes.js';

const app = express();

app.use(express.json());
app.use(cors('*'));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`✅ Server listening on http://localhost:${process.env.PORT}`);
});