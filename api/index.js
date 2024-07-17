import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

app.get('/test', (req, res) => {
    res.json('test ok');
});



app.listen(4000);