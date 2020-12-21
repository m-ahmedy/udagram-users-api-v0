import cors from 'cors';
import express from 'express';
import { sequelize } from './shared/sequelize';

import { UserRouter } from './routes/user.router';

import bodyParser from 'body-parser';
import { config } from './shared/config/config';
import { User } from './models/User';


(async () => {
    await sequelize.addModels([User]);
    await sequelize.sync();

    const app = express();
    const port = process.env.PORT || 8080;

    app.use(bodyParser.json());

    app.use(cors({
        allowedHeaders: [
            'Origin', 'X-Requested-With',
            'Content-Type', 'Accept',
            'X-Access-Token', 'Authorization',
        ],
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: config.url,
    }));

    app.use('/', UserRouter);

    // Start the Server
    app.listen(port, () => {
        console.log(`server running ${config.url}`);
        console.log(`press CTRL+C to stop server`);
    });
})();
