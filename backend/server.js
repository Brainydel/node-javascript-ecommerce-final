import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});

app.use(express.static(path.join(__dirname, '/../frontend/src')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/src/index.html`));
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status);
  res.send({ message: err.message });
});
// upload

const uploads = path.join(__dirname, '/../uploads');
app.use('/uploads', express.static(uploads));

app.use(fileUpload());
app.post('/upload', (req, res) => {
  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
  } else {
    const { image } = req.files;
    const filename = `${new Date().getTime()}.jpg`;
    image.mv(`${uploads}/${filename}`, (err) => {
      if (err) res.status(500).send({ message: err });
      else res.status(201).send({ image: `/uploads/${filename}` });
    });
  }
});

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:5000');
});
