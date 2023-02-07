if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const campground = require('../models/campground');
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const db_url = process.env.DB_URL || 'mongodb://localhost:27017/campgrounds';
console.log(db_url);
console.log(require('dotenv').config());

// mongoose.connect(db_url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.log.bind(console, "connection error:"));
// db.once('open', () => {
//     console.log('Database connected');
// })


mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 25; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // user id for username ed
            author: '63e2744fe47c16927c4df291',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude 
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dcno0ppgb/image/upload/v1668447651/CampGrounds/vhj7ntp4swznww9xhjzq.jpg',
                    filename: 'CampGrounds/vhj7ntp4swznww9xhjzq',
                  },
                  {
                    url: 'https://res.cloudinary.com/dcno0ppgb/image/upload/v1668447651/CampGrounds/wtp8bye1x2dioprskiku.jpg',
                    filename: 'CampGrounds/wtp8bye1x2dioprskiku',
                  }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime cum neque odio maiores, vero corrupti fugit error totam cupiditate. Necessitatibus reprehenderit ratione perspiciatis voluptatem sequi maiores nobis ipsa modi quibusdam!',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})