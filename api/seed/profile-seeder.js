const Profile = require('../models/Profile');
const mongoose = require('mongoose');
require('dotenv').config();

try {
  mongoose.connect(
      process.env.mongoURI
  );
  const profiles = [
    // p1
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8a7',
      bio: 'A doctor enthusiastic in painting and art and graffitis',
      status: 'amateur fan and artist on graffiti',
      skills: ['sprayer', 'oil painting', 'water color'],
      location: 'San Jose',
      website: 'www.petersutton.com',
      experience: [
        {
          title: 'Artist',
          location: 'San Jose, 95134',
          description: 'Amateur Artist',
        },
        {
          title: 'Contractor',
          location: 'San Jose, 95134',
          description: 'Building Contractor',
        },
      ],
      social: [],
    }),
    // p2
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8a6',
      bio: 'A retired veteran who is passionate in art and design',
      status: 'retired',
      skills: ['sculpture', 'sketch', 'spray painting'],
      location: 'San Diego',
      website: 'www.joemurphy.com',
      experience: [
        {
          title: 'graffiti fan',
          location: 'San Francisco, 92133',
          description: 'Fan loving art and graffiti',
        },
        {
          title: 'Air Marshal',
          location: 'Some remote islands',
          description: 'Commander of a air force',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/UCmU1_xj6hR08AMvj6J6hERt',
        twitter: 'www.twitter.com',
      },
    }),
    // p3
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8aa',
      bio: 'Painting loved retired computer science lecturer',
      status: 'retired',
      skills: ['painting', 'sketching', 'water color', 'canvas art'],
      location: 'San Cramento',
      website: 'www.Alonzo.com',
      experience: [
        {
          title: 'Painter',
          location: 'San Bruno, 92131',
          description: 'Fan loving art and graffiti',
        },
        {
          title: 'CS Lecturer',
          location: 'Millpitas',
          description: 'Lecturer at Millpitas University',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/UCmU1_xj6hR08AMvj6s6hERt',
        twitter: 'https://twitter.com/alonzoroman',
      },
    }),
    // p4
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8a9',
      bio: 'Painting loved retired PE teacher',
      status: 'retired',
      skills: ['painting', 'water color', 'canvas art', 'origami'],
      location: 'San Cramento',
      website: 'www.Alonzo.com',
      experience: [
        {
          title: 'Painter',
          location: 'Red Wood City, 92131',
          description: 'Sports fan also loving art and graffiti',
        },
        {
          title: 'PE Coach',
          location: 'RedWoods',
          description: 'Lecturer at RedWood College',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/UCmU1_xm6hR08AMvj6s6hERt',
        twitter: 'https://twitter.com/justincasey',
        facebook: 'https://www.facebook.com/JustinC',
      },
    }),
    // p5
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8a8',
      bio: 'Model who loves art and embrace the nature',
      status: 'amateur artist',
      skills: ['painting', 'drawing ', 'canvas art', 'origami'],
      location: 'San Mateo',
      website: 'www.jamie.com',
      experience: [
        {
          title: 'Model',
          location: 'San Francisco, 92131',
          description: 'Model of Channel',
        },
        {
          title: 'Amateur Artist',
          location: 'San Mateo',
          description: 'Amateur paintor who loves nature and expressing',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/USmU1_xm6hR08AMvj6s6hERt',
        twitter: 'https://twitter.com/jamie',
        facebook: 'https://www.facebook.com/JamieB',
      },
    }),
    // p6
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8ab',
      bio: 'Painting lover',
      status: 'amateur artist loves graffiti',
      skills: ['drawing', 'writing poetry', 'canvas art', 'origami'],
      location: 'San Leandro',
      website: 'www.sofia.com',
      experience: [
        {
          title: 'Free Lance Artist',
          location: 'San Leandro, 91131',
          description: 'Self-employed artist',
        },
        {
          title: 'Salesman',
          location: 'San Lorenzo',
          description: 'Used to be a salesman in COSTCO',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/USmU2_xm6hR08AMvj6s6hERt',
        twitter: 'https://twitter.com/sofia',
        facebook: 'https://www.facebook.com/SofiaJ',
      },
    }),
    // p7
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8ac',
      bio: 'An painting lover who want to make more friends',
      status: 'amateur artist loves graffiti',
      skills: ['drawing', 'singing', 'dancing', 'origami'],
      location: 'Rusell City',
      website: 'www.rosie.com',
      experience: [
        {
          title: 'Free Lance Artist',
          location: 'Rusell City 92131',
          description: 'Self-employed artist',
        },
        {
          title: 'Botanist',
          location: 'San Lorenzo',
          description: 'Was a botanist at research insititute',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/USmU2_xm6hR08AMvj6s6hERm',
        twitter: 'https://twitter.com/rosiehopkins',
        facebook: 'https://www.facebook.com/rosieH',
      },
    }),
    // p8
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8ae',
      bio: 'An amateur painter who likes graffiti',
      status: 'amateur artist loves graffiti',
      skills: ['drawing', 'singing', 'dancing', 'origami'],
      location: 'Rusell City',
      website: 'www.rosie.com',
      experience: [
        {
          title: 'Free Lance Artist',
          location: 'Fremont 92131',
          description: 'Self-employed artist',
        },
        {
          title: 'Sales Representative',
          location: 'Dublin Dougherty',
          description: 'Was a sales representative at a local mall',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/USmU2_xm6hR08AMvj6s6hMRm',
        twitter: 'https://twitter.com/zoie',
        facebook: 'https://www.facebook.com/zoie',
      },
    }),
    // p9
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8ad',
      bio: 'Amateur performance artist',
      status: 'self-employed',
      skills: ['guitar', 'graffiti', 'painting', 'modeling'],
      location: 'Palo Alto',
      website: 'www.woo.com',
      experience: [
        {
          title: 'Free Lance Artist',
          location: 'Palo Alto 95199',
          description: 'Self-employed artist',
        },
        {
          title: 'Banker',
          location: 'Los Altos',
          description: 'Was a banker representative at Chase Bank',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/UTmU2_xm6hR08AMvj6s6hMRm',
        twitter: 'https://twitter.com/woo',
        facebook: 'https://www.facebook.com/woo',
      },
    }),
    // p10
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8b1',
      bio: 'Street artist who is keen on graffiti and painting',
      status: 'employed',
      skills: ['graffiti', 'street art', 'singing', 'dancing'],
      location: 'Santa Rosa, 98123',
      website: 'www.lee.com',
      experience: [
        {
          title: 'Amateur Painting lover',
          location: 'Santa Rosa 98199',
          description: 'Amateur Artist',
        },
        {
          title: 'Software Engineer',
          location: 'Bodega Bay',
          description: 'Full time software engineer at doodos',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/UTmU2_xm6hR08AMvj5s5hMRm',
        twitter: 'https://twitter.com/aimeeramos',
        facebook: 'https://www.facebook.com/aimeeramos',
      },
    }),
    // p1
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8b2',
      bio: 'A nurse enthusiastic in painting and art and graffitis',
      status: 'super fan on graffiti',
      skills: ['sprayer', 'oil painting', 'water color'],
      location: 'Stockton',
      website: 'www.morgonshelton.com',
      experience: [
        {
          title: 'Artist',
          location: 'Walnut Creek, 95134',
          description: 'Super lover on graffiti and other street art',
        },
        {
          title: 'Civil Engineer',
          location: 'San Francisco, 95134',
          description: 'Building Contractor',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/UTmU2_xm5hR08AMvj5s5hMRm',
        twitter: 'https://twitter.com/morganshelton',
        facebook: 'https://www.facebook.com/morganshelton',
      },
    }),
    // p2
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8b0',
      bio: 'A famous youtuber who lose travelling and art especially graffitis',
      status: 'self employed youtuber',
      skills: ['sculpture', 'sketch', 'spray painting'],
      location: 'San Diego',
      website: 'www.evielawson.com',
      experience: [
        {
          title: 'graffiti fan',
          location: 'San Francisco, 92133',
          description: 'Fan loving art and graffiti',
        },
        {
          title: 'free lanced youtuber',
          location: 'San Mateo',
          description: 'Self-employed youtuber',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/UCmU2_xj6hR08AMvj6J6hERt',
        twitter: 'www.twitter.com/lawson',
      },
    }),
    // p3
    new Profile({
      user: '5f29fb5a3cb26f10bc4ee8af',
      bio: 'Painting loved computer science lecturer',
      status: 'still working',
      skills: ['painting', 'sketching', 'water color', 'canvas art'],
      location: 'San Cramento',
      website: 'www.dorothyterrell.com',
      experience: [
        {
          title: 'Painter',
          location: 'San Bruno, 92131',
          description: 'Fan loving art and graffiti',
        },
        {
          title: 'CS Lecturer',
          location: 'Millpitas',
          description: 'Lecturer at SC University',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/UCmU3_xj6hR08AMvj6s6hERt',
        twitter: 'https://twitter.com/dorothyterrell',
      },
    }),
    // p4
    new Profile({
      user: '5f2b5bdc2368e63300c77876',
      bio: 'Painting loved retired PE teacher',
      status: 'retired',
      skills: ['painting', 'water color', 'canvas art', 'origami'],
      location: 'San Cramento',
      website: 'www.Alonzo.com',
      experience: [
        {
          title: 'Painter',
          location: 'Red Wood City, 92131',
          description: 'Sports fan also loving art and graffiti',
        },
        {
          title: 'PE Coach',
          location: 'RedWoods',
          description: 'Lecturer at RedWood College',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/UCmU1_xm6hR08AMvj6s6hERt',
        twitter: 'https://twitter.com/justincasey',
        facebook: 'https://www.facebook.com/JustinC',
      },
    }),
    // p5
    new Profile({
      user: '5f2b5bdc2368e63300c77877',
      bio: 'Model who loves art and embrace the nature',
      status: 'amateur artist',
      skills: ['painting', 'drawing ', 'canvas art', 'origami'],
      location: 'San Mateo',
      website: 'www.jamie.com',
      experience: [
        {
          title: 'Model',
          location: 'San Francisco, 92131',
          description: 'Model of Channel',
        },
        {
          title: 'Amateur Artist',
          location: 'San Mateo',
          description: 'Amateur paintor who loves nature and expressing',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/USmU1_xm6hR08AMvj6s6hERt',
        twitter: 'https://twitter.com/jamie',
        facebook: 'https://www.facebook.com/JamieB',
      },
    }),
    // p6
    new Profile({
      user: '5f2b5bdc2368e63300c77879',
      bio: 'Painting lover',
      status: 'amateur artist loves graffiti',
      skills: ['drawing', 'writing poetry', 'canvas art', 'origami'],
      location: 'San Leandro',
      website: 'www.sofia.com',
      experience: [
        {
          title: 'Free Lance Artist',
          location: 'San Leandro, 91131',
          description: 'Self-employed artist',
        },
        {
          title: 'Salesman',
          location: 'San Lorenzo',
          description: 'Used to be a salesman in COSTCO',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/USmU2_xm6hR08AMvj6s6hERt',
        twitter: 'https://twitter.com/sofia',
        facebook: 'https://www.facebook.com/SofiaJ',
      },
    }),
    // p7
    new Profile({
      user: '5f2b5bdc2368e63300c7787a',
      bio: 'An painting lover who want to make more friends',
      status: 'amateur artist loves graffiti',
      skills: ['drawing', 'singing', 'dancing', 'origami'],
      location: 'Rusell City',
      website: 'www.rosie.com',
      experience: [
        {
          title: 'Free Lance Artist',
          location: 'Rusell City 92131',
          description: 'Self-employed artist',
        },
        {
          title: 'Botanist',
          location: 'San Lorenzo',
          description: 'Was a botanist at research insititute',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/USmU2_xm6hR08AMvj6s6hERm',
        twitter: 'https://twitter.com/rosiehopkins',
        facebook: 'https://www.facebook.com/rosieH',
      },
    }),
    // p8
    new Profile({
      user: '5f2b5bdc2368e63300c77878',
      bio: 'An amateur painter who likes graffiti',
      status: 'amateur artist loves graffiti',
      skills: ['drawing', 'singing', 'dancing', 'origami'],
      location: 'Rusell City',
      website: 'www.rosie.com',
      experience: [
        {
          title: 'Free Lance Artist',
          location: 'Fremont 92131',
          description: 'Self-employed artist',
        },
        {
          title: 'Sales Representative',
          location: 'Dublin Dougherty',
          description: 'Was a sales representative at a local mall',
        },
      ],
      social: {
        youtube: 'https://www.youtube.com/channel/USmU2_xm6hR08AMvj6s6hMRm',
        twitter: 'https://twitter.com/zoie',
        facebook: 'https://www.facebook.com/zoie',
      },
    }),
  ];
  let i,
    done = 0;

  for (i = 0; i < profiles.length; i++) {
    profiles[i].save(() => {
      done++;
      if (done === profiles.length) {
        mongoose.disconnect();
      }
    });
  }
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
  process.exit(1);
}
