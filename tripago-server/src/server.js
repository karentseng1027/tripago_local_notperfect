const express = require('express');

const transRouter = require('./routers/trans.js')
const hotelRouter = require('./routers/hotels.js');
const siteRouter = require('./routers/sites.js')
const requestLogger = require('./middleware/request-logger.js');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

// app.use(requestLogger);
app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));
app.use('/api', transRouter);
app.use('/api', hotelRouter);
app.use('/api', siteRouter);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});