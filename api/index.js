const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User.js')
const Place = require('./models/Place.js')
const Booking = require('./models/Booking.js')
const Review = require('./models/Review.js')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const app = express();
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinary = require('cloudinary').v2;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw45ewdeg234'


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'airbnb-project',
        allowed_formats: ['jpeg', 'png', 'jpg'],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const upload = multer({ storage });




function getUserDataFromRequest(req) {

    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;

            resolve(userData);
        });

    });

}

app.post('/upload-profile-pic', upload.single('profilePic'), (req, res) => {
    const profilePicture = req.file;
    res.json({
        message: 'Profile picture uploaded successfully',
        fileUrl: profilePicture.path,
    });
});

app.post('/upload-photos', upload.array('photos', 100), (req, res) => {
    const photos = req.files;
    let uploadedFiles = [];
    for (let i =0; i< photos.length; i++){
        uploadedFiles.push(photos[i].path);
    }

    res.json(uploadedFiles);
})


app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password, fileUrl } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            profilePictureUrl: fileUrl  
        })

        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc)
            })

        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.json('not found')
    }

});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id, profilePictureUrl } = await User.findById(userData.id)
            res.json({ name, email, _id, profilePictureUrl });
        })

    } else {
        res.json(null)
    }

});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    //const newName = 'photo' + Date.now() + '.jpg';

    // await imageDownloader.image({
    //     url: link,
    //     dest: __dirname + '/uploads/' + newName,
    // });

    // res.json(newName)

    const result = await cloudinary.uploader.upload(link, {
        folder: 'airbnb-project'
    });


    res.json(result);


})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        });

        res.json(placeDoc)
    })

});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id).populate('owner'));
});

app.put('/places/:id', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body



    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json('ok');
        }


    });

});

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})


const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    let uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));

    }
    res.json(uploadedFiles);
});


app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromRequest(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, user: userData.id, price
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});



app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromRequest(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'))

})

app.post('/reviews', async (req, res) => {
    const userData = await getUserDataFromRequest(req);
    const { placeId, stars, content } = req.body;

    const newReview = new Review({
        content, createdOn: Date.now(), stars, owner: userData.id, place: placeId
    })

    await newReview.save();

    const populatedReview = await Review.findById(newReview._id).populate('owner');

    res.json(populatedReview);
})
app.get('/reviews/:id', async (req, res) => {
    const { id } = req.params;

    const reviewDoc = await Review.find({ place: id }).populate('owner');

    res.json(reviewDoc);

})



app.listen(4000);