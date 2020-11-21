import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded( {extended: true}))
app.listen(8000, () => {
    console.log('Server has started on http://localhost:8000')
})