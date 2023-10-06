const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '64ae59c686a061f50ab031e1',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dbrsz3qju/image/upload/v1691940373/YelpCamp/nospk3fcaah6c5ikro5g.jpg',
          filename: 'YelpCamp/nospk3fcaah6c5ikro5g'
        },
        {
          url: 'https://res.cloudinary.com/dbrsz3qju/image/upload/v1691940373/YelpCamp/m14vz44bkoeyfqtpfe07.jpg',
          filename: 'YelpCamp/m14vz44bkoeyfqtpfe07'
        }
      ],
      geometry:{
        type:"Point",
        coordinates:[
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      description: "This is an image",
      price
    });
    await camp.save();
  }
};


seedDB().then(() => {
  mongoose.connection.close();
});
