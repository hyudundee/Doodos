const Product = require('../models/Product');
const mongoose = require('mongoose');
require('dotenv').config();

try {
  mongoose.connect(
      process.env.mongoURI
  );

  const products = [
    // 刷子 https://www.amazon.com/Pro-Grade-Professional-Painting-Commercial-Paintbrush/dp/B07JHQ4L4F/ref=sr_1_6?dchild=1&keywords=brush&qid=1596336255&sr=8-6
    new Product({
      imagePath: 'https://i.ibb.co/s6F7qQL/brush.jpg',
      itemName: 'Brush',
      description:
        'High quality brushes without the high end sticker price. \n The value you get in these brushes are unbelievable. \n Dont waste your money on a brush that will last you a hour. \n Professional quality at a reasonable price. \n High Grade Stainless Steel Ferrules for long lasting and many washes',
      price: 12.5,
      amount: 30,
      available: true,
      retailer: 'Doodos Official',
    }),
    // 喷枪 https://www.amazon.com/Chapin-International-G362-Professional-Translucent/dp/B00UER1S2I/ref=sr_1_12?dchild=1&keywords=sprayer&qid=1596336038&sr=8-12
    new Product({
      imagePath: 'https://i.ibb.co/k1dQC9C/71-ZLh-FZnt-UL-AC-SL1500.jpg',
      itemName:
        'Chapin International G362 All Purpose Hose-End Sprayer, 1 Pack, Translucent White',
      description:
        'Fits onto any hose end. \n Adjustable rate precision dial offers 16 mixing ratios. \n Sprays up to 100 gallons. \n Built-in Anti-Siphon feature prevents backflow. \n Built-in Anti-Siphon feature prevents backflow.',
      price: 23.49,
      amount: 500,
      available: true,
      retailer: 'Doodos Official',
    }),
    // paints
    // https://www.amazon.com/Handy-Art-Little-Masters-Tempera/dp/B00HTWO1K2/ref=sxin_9_ac_d_rm?ac_md=3-2-dGVtcGVyYSBwYWludA%3D%3D-ac_d_rm&cv_ct_cx=paint&dchild=1&keywords=paint&pd_rd_i=B00HTWO1K2&pd_rd_r=b3dd5a84-8093-423f-9cd0-f2c8f3d726a6&pd_rd_w=UmYJY&pd_rd_wg=KL9lU&pf_rd_p=e3dc9e0c-9eab-4c3e-b43a-ba36f8522e14&pf_rd_r=V5GDK2HWG8EMA5AN329G&psc=1&qid=1596335855&sr=1-3-12d4272d-8adb-4121-8624-135149aa9081
    new Product({
      imagePath: 'https://i.ibb.co/YRQTvH7/71-Ysjx1vza-L-AC-SL1500.jpg',
      itemName: 'Handy Art Little Masters Tempera Paints Set, 16 oz, Pack of 6',
      description:
        'Blendable formula mixes with other colors for unique creations. \n Opaque colors will not chip, flake or crack when dry for lasting appearance. \n Easy-to-clean formula washes away with soap and water',
      price: 12.5,
      amount: 30,
      available: true,
      retailer: 'Doodos Official',
    }),
    // 周边 https://www.amazon.com/Pyramex-Graffiti-Sticker-Design-Acerpal/dp/B0861WD6SV/ref=sr_1_11?dchild=1&keywords=graffiti+tool&qid=1596335265&sr=8-11
    new Product({
      imagePath: 'https://i.ibb.co/6n1mVBt/helmet.png',
      itemName:
        'Full Brim Pyramex Hard Hat, Skull Graffiti Sticker Bomb Design Safety Helmet 4pt, By Acerpal',
      description:
        'REMAIN SAFE AND PROTECTED AT ALL TIMES: ABS material hard hats - Strong, big, yet ultra light weight hard hat wide brim for seemingly lightweight protection. Soft brow pad is replaceable. \n SAFE WORKERS HARDHAT TO PROTECT YOUR HEAD: adults men/woman Dimensions: 31 cm x 27 cm x 15.2 cm. Shell Thickness: 1.7 mm - 4 mm. Weight: .83 lbs',
      price: 47.95,
      amount: 80,
      available: true,
      retailer: 'ACERPAL',
    }),
    // https://www.amazon.com/OhPopsi-WALS0004-Graffiti-Monster-Mural/dp/B01EN1DICI/ref=sr_1_24?dchild=1&keywords=graffiti+tool&qid=1596335597&sr=8-24
    new Product({
      imagePath: 'https://i.ibb.co/c1XcDjS/918-N-d-T9z5-L-AC-SL1500.jpg',
      itemName: 'OhPopsi WALS0004 Graffiti Monster Wall Mural',
      description:
        ' Printed on nonwoven material. \n Paste not included. \n Comes with 6 panels. \n Measures 9Ft 10in x 7Ft 10in when assembled',
      price: 83.13,
      amount: 90,
      available: true,
      retailer: 'ACERPAL',
    }),
    // https://www.amazon.com/Jasion-Graffiti-Waterproof-Sunlight-Proof-Motorbikes/dp/B0876YSWC6/ref=sr_1_17?crid=3MRITQ1K1Q4G2&dchild=1&keywords=graffiti+stickers&qid=1596336428&sprefix=graffiti%2Caps%2C212&sr=8-17
    new Product({
      imagePath: 'https://i.ibb.co/WpGrYtx/71-Bquo-AXKPL-AC-SL1001.jpg',
      itemName:
        'Jasion 50-Pcs PVC Pop Graffiti Art Printing Style Keith Haring Stickers Decals Waterproof Sunlight-Proof DIY Ideals for Water Bottles Cars Motorbikes Portable luggages Laptops',
      description:
        '100% new, 50 pcs no-duplicate stickers.\n PVC material, sun protection and waterproof, not fade in the sun.\n Perfect stickers for water bottles, cars, motorcycle, skateboard, portable, luggages, pad and laptops.\n 50 pieces Keith Haring stickers graffiti decals for kids, youth and teenagers, wonderful gift for kids, friends.',
      price: 7.99,
      amount: 200,
      available: true,
      retailer: 'Amazon',
    }),
    // graffity party ticket
    new Product({
      imagePath: 'https://i.ibb.co/bFL9HTh/party-ticket.jpg',
      itemName: 'Doodos Party Ticket',
      description: 'Tickets for our amazing doodos party',
      price: 3.99,
      amount: 100,
      available: true,
      retailer: 'Doodos Official',
    }),
    new Product({
      imagePath: 'https://i.ibb.co/n12yg6W/BBQ-Tickets.jpg',
      itemName: 'Doodos BBQ Ticket',
      description:
        'Take the ticket and join our fantastic and quality doodos BBQ',
      price: 20.99,
      amount: 30,
      available: true,
      retailer: 'Doodos Official',
    }),
    new Product({
      imagePath: 'https://i.ibb.co/LJ2bs6L/Doodos-Bootcamp.jpg',
      itemName: 'Doodos Bootcamp',
      description:
        'Want to become a street artist and join us? Take the ticket and join our bootcamp!',
      price: 10.99,
      amount: 50,
      available: true,
      retailer: 'Doodos Official',
    }),
  ];

  let i,
    done = 0;

  for (i = 0; i < products.length; i++) {
    products[i].save(() => {
      done++;
      if (done === products.length) {
        mongoose.disconnect();
      }
    });
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
