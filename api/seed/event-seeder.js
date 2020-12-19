const Event = require('../models/Event');
const mongoose = require('mongoose');
require('dotenv').config();

try {
  // connect database
  mongoose.connect(
    process.env.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const events = [
    new Event({
      name: 'Graffiti Party',
      imagePath: 'https://i.ibb.co/r2khbH9/graffiti-party.jpg',
      description:
        "Who hasn't woken up in the morning not quiet remembering what went on the night before? What if you met a hot girl/guy, do you remember their name? Do have a way to contact them? Well a Graffiti Party solves this problem and you will have tons of fun in the process. You never know what funny and obscene words and pictures will be written on you. \nSETTING UP\n First off there are two types of graffiti parties. There is the traditional college graffiti party with sharpies and the backlight graffiti party with highlighters. These parties are only a slight variation of one another but you need to pick which one you want to throw before you set up. It makes a difference since you will have to get different types of markers to tag with and for a highlighter graffiti party you will need to get blacklights to light up the house.\nWHAT TO WEAR\nThis is one of the simplest theme parties to dress for. Just wear a white t-shirt. Don’t wear anything that you wouldn’t want ruined and avoid wearing a rippled shirt like a wife-beater. Those shirts are really hard to tag on. \n A tip to always remember is don’t pass out early. Just remember that there are a ton of people all with sharpies. If you pass out you will most likely wake up covered with vulgar drawings since people find it funny to draw on passed out people.",
      positionsremains: 30,
      flatNumber: '1256',
      street: 'Bellmanford Street',
      postCode: '95135',
      City: 'San Jose',
      state: 'CA',
      host: 'Doodos Official',
      // ticket can be found at online store
      ticketrequired: true,
      ticketPrice: 3.99,
      ticket: '5f29e0b5c59cef2a80965aa7',
      from: new Date(2020, 08, 20, 19, 00),
      to: new Date(2020, 08, 20, 23, 00),
      positionremains: 50,
    }),
    // text source https://rolesvillechamber.org/bbqbandfest/
    new Event({
      name: 'Doodos BBQ',
      imagePath: 'https://i.ibb.co/nQMLpds/doodos-BBQ.jpg',
      description:
        'If you are interested in meeting new people and volunteering for your community, call the Chamber at 919-562-7069 or register \n We need you to help make this event our best yet! Volunteers must be at least 15 years old. It takes a small village of volunteers for this event to run like clockwork. We need help with everything from set up on Friday night to tear down on Saturday night and everything in between! We’d love to have you as part of our Community Volunteer Team! Call the Chamber for more information \nBBQ Plate Pre-Order\n BBQ & Bands BBQ Plate pre-orders are now available in limited quantities. Previous years we SOLD OUT of BBQ well before the end of the event. \n Whole Hog competitors\n Meat is provided as part of your entry fee. You will select your hog after the cooks meeting on Friday night. Each team will receive an approximate 120-125 lb hog. For judging you will turn in approximately 1/2 lb – enough to fill the bottom of a white Styrofoam clamshell plate. The remaining pork will be chopped up and turned in to the food tent for sale as a fundraiser for the Chamber. \nRib Competitors\n You will cook one and a half cases of ribs (approximately 18 slabs). For judging you will turn in a Styrofoam clamshell. The remainder of the meat will be turned in to the food tent for sale as a fundraiser for the Chamber. \nChicken Competitors\n You will cook approximately two cases of white meat chicken quarters. For judging you will turn in one Styrofoam clamshell of meat and the remainder of the meat will be turned in to the food tent for sale as a fundraiser for the Chamber.',
      positionsremains: 40,
      flatNumber: '1427',
      street: 'Dijkstra Park',
      postCode: '93135',
      City: 'San Francisco',
      state: 'CA',
      host: 'Doodos Official',
      ticketrequired: true,
      ticketPrice: 20.99,
      ticket: '5f29e0b5c59cef2a80965aa8',
      from: new Date(2020, 09, 21, 15, 00),
      to: new Date(2020, 09, 21, 20, 00),
      positionremains: 60,
    }),
    new Event({
      name: 'Doodos BootCamp',
      imagePath: 'https://i.ibb.co/y0r83XC/doodos-bootcamp.jpg',
      description:
        "It's cool that you want to register for the boot camp!\n Here is the process of the boot camp and what you get: \n The Graffiti Coach Bootcamp will take place in the autumn holidays from October 7th to October 11th, 2019 in the Hallschlag youth center in San Jose. \n You can expect 4 days of fun together with professional instructions in graffiti, a graffiti program tailored to you with drawing, spraying, Exchange of experience and leisure activities with the coach and his team.",
      positionsremains: 50,
      flatNumber: '1907',
      street: 'Silver Creek Valley Road',
      postCode: '95130',
      City: 'San Jose',
      state: 'CA',
      host: 'Doodos Official',
      ticketrequired: true,
      ticketPrice: 10.99,
      ticket: '5f29e0b5c59cef2a80965aa9',
      from: new Date(2020, 10, 20),
      to: new Date(2020, 12, 20),
      positionremains: 40,
    }),
  ];

  let i,
    done = 0;

  for (i = 0; i < events.length; i++) {
    console.log(events[i]);
    events[i].save(() => {
      done++;
      if (done === events.length) {
        mongoose.disconnect();
      }
    });
  }
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}
