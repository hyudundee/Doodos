const User = require('../models/User');
const mongoose = require('mongoose');
require('dotenv').config();

try {
  mongoose.connect(
      process.env.mongoURI
  );
  const users = [
    /*
    new User({
      name: 'Joe Murphy',
      email: 'joemurphy@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/nfshSnX/0-0f-Cl-Pm-ISc-V5p-TLo-E.jpg',
    }),
    new User({
      name: 'Peter Sutton',
      email: 'petersutton@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/VgQWvn8/0-e-Iutoe-Uo8r-PA13e0.jpg',
    }),
    new User({
      name: 'Jamie Butler',
      email: 'jamiebutler@gmail.com',
      password: '123456789',
      avatar:
        'https://i.ibb.co/D5qN6XY/01-shutterstock-476340928-Irina-Bg-1024x683.jpg',
    }),
    new User({
      name: 'Justin Casey',
      email: 'justincasey@gmail.com',
      password: '123456789',
      avatar:
        'https://i.ibb.co/0GJNHqx/02-shutterstock-370033352-mimagephotography-1024x683.jpg',
    }),
    new User({
      name: 'Alonzo Roman',
      email: 'alonzoroman@gmail.com',
      password: '123456789',
      avatar:
        'https://i.ibb.co/xqS1s56/5edfa7c6604c77b1b4bd658a-profilephoto5.jpg',
    }),
    new User({
      name: 'Sofia Jordan',
      email: 'sofiajordan@gmail.com',
      password: '123456789',
      avatar:
        'https://i.ibb.co/NW16x65/877-08128693-Photononstop-Masterfile-Model-Release-Yes-Property-Release-No-France-young-blond-woman.jpg',
    }),
    new User({
      name: 'Rosie Hopkins',
      email: 'rosiehopkins@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/mGv3YZx/linkedin-profile-picture.jpg',
    }),
    new User({
      name: 'Cerys Spencer',
      email: 'cerysspencer@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/TR0k9rW/Jimin-900x600.jpg',
    }),
    new User({
      name: 'Zoie Tyson',
      email: 'zoietyson@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/TPbP0th/70d66947842d331dbd622938b4595b13.jpg',
    }),
    new User({
      name: 'Dorothy Terrell',
      email: 'dorothyterrell@gmail.com',
      password: '123456789',
      avatar:
        'https://i.ibb.co/8jLGB5G/b06bf3508521b75cdb26e7a93f5688cd-bun-hair-face-hair.jpg',
    }),
    new User({
      name: 'Evie Lawson',
      email: 'evielaw@gmail.com',
      password: '123456789',
      avatar:
        'https://i.ibb.co/LYPS785/03-shutterstock-450728395-F8-studio-1024x683.jpg',
    }),
    new User({
      name: 'Aimee Ramos',
      email: 'aimeeramos@gmail.com',
      password: '123456789',
      avatar:
        'https://i.ibb.co/XCRRTSv/04-shutterstock-565988308-Joyseulay-1024x683.jpg',
    }),
    new User({
      name: 'Morgan Shelton',
      email: 'morganshelton@gmail.com',
      password: '123456789',
      avatar:
        'https://i.ibb.co/D5qN6XY/01-shutterstock-476340928-Irina-Bg-1024x683.jpg',
    }),
    */
    new User({
      name: 'Jessie Fry',
      email: 'jessiefry@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/VQ13qdy/Mou-Aysha-portrait-photography-2.jpg',
    }),
    new User({
      name: 'Hugo Orr',
      email: 'hugoorr@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/nRr97Jb/h800-1057408-MJNSa-JOs.jpg',
    }),
    new User({
      name: 'Addison Case',
      email: 'addisoncase@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/SDkcbyN/860870066df05a7a29bcb5bb9ea2e9a7.jpg',
    }),
    new User({
      name: 'Brittany Schmidt',
      email: 'schmidt@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/s65t4Xg/ebc8b0e560709ce497563a883d18f93a.jpg',
    }),
    new User({
      name: 'Millie Richardson',
      email: 'millierichardson@gmail.com',
      password: '123456789',
      avatar: 'https://i.ibb.co/yfGbXWg/3db77df2a496f33b09c1861acc7a7b1c.jpg',
    }),
  ];
  let i,
    done = 0;

  for (i = 0; i < users.length; i++) {
    users[i].save(() => {
      done++;
      if (done === users.length) {
        mongoose.disconnect();
      }
    });
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
