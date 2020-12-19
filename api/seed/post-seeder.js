const Post = require('../models/Post');
const mongoose = require('mongoose');
require('dotenv').config();

try {
  mongoose.connect(
      process.env.mongoURI
  );
  const posts = [
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8b2',
      categories: ['ideas', 'artworks', 'spotsaroundyou'],
      title:
        'Graffiti photographer Martha Coopers quest to document street art celebrated in new documentary',
      imageUrl: 'https://i.ibb.co/0qfwsmg/11511108-3x2-xlarge.jpg',
      text:
        'As the group exits at breakneck speed and disappears into the night, running alongside the crew is a silver-haired photographer, who jumps into a car and starts to drive.\nWelcome to a day in the life of Martha "Marty" Cooper — where writers "bomb", and dead-of-night graffiti runs are all just part of the job.\nInside the car, Cooper clasps her hand to her face and begins to giggle as a digitally distorted voice from the backseat says: "But they came out great pictures!"\nThe masked crew is well-known Berlin graffiti collective cum vandals 1Up Crew, and their May 2017 Berlin metro exploits resulted in a collaborative photo book with Cooper.\nThe events at Heinrich-Heine-Straße metro were captured by the 1Up Crew on chest-mounted GoPro cameras and supplied to Australian director Selina Miles for Martha: A Picture Story, a new documentary (and winner of the 2019 Sydney Film Festival Audience Award for Best Documentary) chronicling Coopers remarkable five-decade-long career behind the lens and at the forefront of a global art movement.',
      // name of the user
      name: 'Morgan Shelton',
      avatar:
        'https://viewer-ebook.books.com.tw/viewer/epub/web/?book_uni_id=E050060436_reflowable_normal',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8a9',
      categories: ['artworks', 'spotsaroundyou', 'fashion'],
      title: 'Getting Up, Staying Up: History of Graffiti in the L.A. River',
      imageUrl: 'https://i.ibb.co/cxp8Kxk/lariver93-003.jpg',
      text:
        "\"For us the river is like the last adventure in the city. We would go in tunnels under the river and you feel like you're the first person that's ever been down there, but then you start shining a light around and you'll see a tag that says some 'high school band, 1963'. It confirms that people were here before me,\" said Evan Skrederstu, a visual artist and co-­author of the book \"The Ulysses Guide to the Los Angeles River: Volume 1,\" that focuses on the biology and art of the river.\nSkrederstu started painting graffiti in the river in the '90s when it was still a no-man's land. Sightings of a dead bodies, drug deals or shootouts were commonplace. Since the Army Corp of Engineers moved to channelize the river in 1938, the river's 51-mile stretch of grey concrete walls and low police presence has offered graffiti writers not only a large canvas for colorful murals, but also the lure of adventure in a place seemingly devoid of laws. Skrederstu's experience is not unique, with the river playing host to tags that date as far back as the early 1900s, making the river a physical timeline of the human experience along it.\nLong before pushes for cleanup efforts and arts initiatives, the river was largely regarded as a repository for urban runoff. Graffiti artists were brought life and vibrancy to the river, something that had been missing since it was paved over. Even so, conversations about the future of the river have excluded graffiti artists who have been trying to carve out their place in larger plans for the river.",
      // name of the user
      name: 'Justin Casey',
      avatar:
        'https://i.ibb.co/0GJNHqx/02-shutterstock-370033352-mimagephotography-1024x683.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8a6',
      categories: ['spotsaroundyou', 'fashion', 'activities'],
      title: 'S. California graffiti taggers becoming armed, dangerous',
      imageUrl:
        'https://i.ibb.co/GpSr1HK/eee71321-433d-5e0a-8eb7-718f29a136bd-image.jpg',
      text:
        'LOS ANGELES — One man got stabbed. Another got shot in the chest. A 6-year-old boy was temporarily blinded when he was spray-painted in the face.\nAnd they were the lucky ones among those who have had run-ins with graffiti "crews," or gangs.\nOver the past 2 1/2 years in Southern California, three people have been killed after trying to stop graffiti vandals in the act. A fourth died after being shot while watching a confrontation between crews in a park.\n"We have seen a marked increase in these graffiti-tagging gangs taking to weapons and fighting to protect their walls, their territory, their name," said Los Angeles County sheriff\'s Lt. Robert Rifkin.\nLos Angeles County has battled graffiti for decades, spending $30 million a year to paint over or clean up the emblems, names and other images spray-painted on stores, concrete-lined riverbeds, rail lines, phone booths, buses, even police cars. On Wednesday, Gov. Arnold Schwarzenegger signed a law requiring convicted graffiti vandals to remove their scrawl.',
      // name of the user
      name: 'Joe Murphy',
      avatar:
        'https://i.ibb.co/0GJNHqx/02-shutterstock-370033352-mimagephotography-1024x683.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8ae',
      categories: ['fashion', 'activities', 'events'],
      title: 'One Pointed Attention',
      imageUrl: 'https://i.ibb.co/Q8zqMfK/murals-lajolla-727x545.jpg',
      text:
        'Since 2010, the "Murals of La Jolla", a joint project of the La Jolla Community Foundation and The Athenaeum Music & Arts Library, has brought enormous works from heavy hitters like John Baldessari, Terry Allen, Catherine Opie and Mark Bradford to the already scenic seaside village. One of the local stars featured in the collection is Kelsey Brookes, who contributes his psychedelic "One Pointed Attention." Visitors respond playfully to the pulsating waves - but Brookes says his intent was actually to create "a two-dimensional representation of meditation." Snap your selfie, and then take a moment to pause, focus and let your eye follow the path of his brush. With a refreshed perspective, go on to visit fifteen other murals within walking distance. More on the Murals of La Jolla. Where: 7835 Ivanhoe Ave, San Diego, CA 92037',
      // name of the user
      name: 'Zoie Tyson',
      avatar: 'https://i.ibb.co/TPbP0th/70d66947842d331dbd622938b4595b13.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8af',
      categories: ['activities', 'events', 'life'],
      title: 'Colossus',
      imageUrl: 'https://i.ibb.co/PgZ7RqB/727x545-Colossus.jpg',
      text:
        'Chicano Park is a cultural treasure not only for the story of how it came to be but also because of the quality of its art, which has been decades in the making. Roughly 80 artworks fill seven acres of parkland, reaching high into the sky on the concrete pylons supporting the Coronado Bay Bridge. The first were painted in 1973, approximately two dozen were restored in 2011 and 2012, and in 2017 the collection was named a National Historic Landmark.   A part of this catalyst group of muralists who started the evolution of what Chicano Park is today is Mario Torero.  Torero, a dedicated artist and self-proclaimed “artivista,” is responsible for iconic pieces like “Colossus” which he painted in 1975. Torero describes the mural as the “reawakening of the Sleeping Giant, setting off the imagination of all pass-byers.”  More on the Murals of Chicano Park. Where: National Ave & S Evans St, San Diego, CA 92101',
      // name of the user
      name: 'Dorothy Terrell',
      avatar:
        'https://i.ibb.co/8jLGB5G/b06bf3508521b75cdb26e7a93f5688cd-bun-hair-face-hair.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8b0',
      categories: ['events', 'life', 'ideas'],
      title: 'SeaWalls: Murals for Oceans',
      imageUrl: 'https://i.ibb.co/PFTjWDG/murals-hillcrest-727x545.jpg',
      text:
        'In the fall of 2016, San Diego\'s Cohort Collective teamed up with Hawaii-based PangeaSeed Foundation, the music festival KAABOO, Surfrider Foundation and several national and international artists including Askew, Lauren YS, Aaron Glasson and Persue. They installed 18 murals designed to raise environmental issues by "taking the oceans to the streets." From Encinitas to Imperial Beach, they created poignant and passionate statements on overfishing, whale and dolphin captivity, and ocean acidification. In Hillcrest, the back side of Artist & Craftsman Supply provided the spot for muralist Jet Martinez. Soak in the lush forms and delicate tracery evoking Mexican embroidery, but take note of the message: Pesticides used in commercial flower production end up in the sea, damaging reef ecosystems. More on the Sea Walls Project.Where: 3804 Fourth Avenue, San Diego, CA 92103',
      // name of the user
      name: 'Evie Lawson',
      avatar:
        'https://i.ibb.co/LYPS785/03-shutterstock-450728395-F8-studio-1024x683.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8b0',
      categories: ['events', 'life', 'ideas'],
      title: 'Greetings from the U. S. Naval Training Station',
      imageUrl: 'https://i.ibb.co/kqTc6SJ/murals-pointloma-727x545.jpg',
      text:
        'ARTS DISTRICT Liberty Station was once a Navy training center, welcoming the first class of recruits to its Spanish Colonial Revival buildings in 1923. Now a mecca for food, art and niche shopping, this once abandoned space is a thriving community that knits its present and past seamlessly. In one of the newest additions to the scene, Victor Ving transformed an old pump house into an enormous vintage postcard incorporating the evolution of Liberty Station into a cohesive piece of art. It even has a cameo appearance by Ving and his photographer girlfriend, Lisa Beggs. Take some time and see if you can you spot them? \nWhere: 2875 Dewey Rd, San Diego, CA 92106',
      // name of the user
      name: 'Evie Lawson',
      avatar:
        'https://i.ibb.co/LYPS785/03-shutterstock-450728395-F8-studio-1024x683.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8af',
      categories: ['activities', 'events', 'life'],
      title: 'Year of the Rooster',
      imageUrl: 'https://i.ibb.co/Mf2Z2Jz/murals-cityheights-727x545.jpg',
      text:
        "South of City Heights, one of San Diego's most ethnically diverse communities, is the neighborhood of Azalea Park, home to artists and other creative types. Several years ago the residents created the city's first water conservation garden, tucked into the southeast corner of Azalea Community Park. Agaves and lavender complement whimsical sculptures, while brickwork paths and benches encourage lingering. Venture a few steps further south and you'll see the latest artwork by Gloria Muriel, known as \"Glow,\" whose art can be found throughout San Diego and Tijuana. \"Year of the Rooster\" is on a mural-covered wall that wraps around a house, and was a collaboration with her partner, photographer Alex H. Banach, and muralist Michael Amorillo. Muriel, who frequently incorporates nature into her paintings, says \"Rooster\" reminds us to wake up and pay attention to what's happening in the world. (Fun fact: It's also inspired by the homeowner's chickens.) Before you leave, swing by 4133 Poplar Street, a community center known for it's eye-popping street art.",
      // name of the user
      name: 'Dorothy Terrell',
      avatar:
        'https://i.ibb.co/8jLGB5G/b06bf3508521b75cdb26e7a93f5688cd-bun-hair-face-hair.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8ae',
      categories: ['fashion', 'activities', 'events'],
      title: 'Dearly Beloved',
      imageUrl:
        'https://i.ibb.co/yqq8FMD/dearly-beloved-mural-san-diego-727.jpg',
      text:
        'Adams Avenue is the kind of place where dive bars and yoga studios happily coexist, and "pet-friendly" is assumed. The avenue connects three neighborhoods — University Heights, Normal Heights and Kensington. Normal Heights is the most bohemian, earning the nickname "Abnormal Heights." Lestat\'s Coffee House is a popular meeting spot and landmark. It might hold the record for having more local artists on the walls (and in the comfy chairs) than anywhere in town. A few blocks away, on the side of Dink\'s Barbershop, is a mural that artist Travis Crosby painted as a tribute to Prince. Across from it is a collaboration between Crosby and his childhood friend, Kevin Lindholm, who goes by WaistKnot. Continue west on Adams Avenue and you\'ll see a Crosby mural of Jimi Hendrix. It\'s on the side of a building that holds a tattoo shop and guitar repair. Did we mention "bohemian"?\n Where: 3215 Adams Ave, San Diego, CA 92116',
      // name of the user
      name: 'Zoie Tyson',
      avatar: 'https://i.ibb.co/TPbP0th/70d66947842d331dbd622938b4595b13.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8b2',
      categories: ['ideas', 'artworks', 'spotsaroundyou'],
      title: 'La calors',
      imageUrl: 'https://i.ibb.co/THwWS0b/la-calors-ice-cream-727x545-1.jpg',
      text:
        'Most of the Barrio Logan arts action takes place on the west side of I-5, around Chicano Park. That footprint expanded with the opening of Bread & Salt, located on the east side of the freeway. Experimental galleries and artist’s studios are housed in a rugged industrial space, built in 1891 as a bread factory. The 40-foot flour silo provides the backdrop for the latest mural by San Diego/Tijuana artist Paola Villaseñor, who goes by Panca. “La calors” (“The heat”) honors the neighborhood ice cream vendors, or paleteros. Having just finished a political piece, Panca wanted to reconnect with joyful aspects of barrio life and modern Chicana identity. Using a deceptively simple palette, she reveals artistic influences that range from the para-surrealist painter Remedios Varo Uranga to Mr. Rogers.\n Where: 1955 Julian Ave, San Diego, CA 92113',
      // name of the user
      name: 'Morgan Shelton',
      avatar:
        'https://viewer-ebook.books.com.tw/viewer/epub/web/?book_uni_id=E050060436_reflowable_normal',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8a9',
      categories: ['artworks', 'spotsaroundyou', 'fashion'],
      title: 'North Park Mural Project',
      imageUrl: 'https://i.ibb.co/cC2gzGH/murals-northpark-727x545.jpg',
      text:
        "North Park is one of the area's most well known arts districts, anchored by the galleries and shops along Ray Street, alternative art space Art Produce, gallery/retail hybrids like Pigment and Visual, and live music and theater at the Observatory North Park. And from buildings to utility boxes, it has a wealth of street art. Local favorites include a 50-foot pink dinosaur by Mark Paul Deren, who goes by Madsteez, on the north end of Ray Street, and a group of murals on the side of art gallery/studio space The Studio Door. These happy kids are posing in front of a piece by artistic duo Monty Montgomery and Jason Feather, who call themselves Kreashun. \n Where: 3750 30th Street, San Diego, CA 92104",
      // name of the user
      name: 'Justin Casey',
      avatar:
        'https://i.ibb.co/0GJNHqx/02-shutterstock-370033352-mimagephotography-1024x683.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8a6',
      categories: ['spotsaroundyou', 'fashion', 'activities'],
      title: 'CARLY EALEY, CHRISTOPHER KONECKI AND NEKO BURKE',
      imageUrl:
        'https://i.ibb.co/GpSr1HK/eee71321-433d-5e0a-8eb7-718f29a136bd-image.jpg',
      text:
        "Ealey, Konecki and Burke are part of the Cohort Collective, seven prolific muralists who've created some of the most distinctive images around town. This artwork presented an unusual challenge: collaborative painting in a stairwell. The artists had to use scaffolding at various heights, constantly maneuvering themselves into position while layering over each other's work. Konecki called it “painting while on a StairMaster.” Burke contributed the graffiti-style tags, Ealey did the female characters and Konecki added the massive birds. The end result fits the sophisticated vibe and boisterous attitude of The Oxford Social Club, located underneath the Pendry Hotel, a new highlight in the Gaslamp Quarter. \n Where: 435 Fifth Ave, San Diego, CA 92101",
      // name of the user
      name: 'Joe Murphy',
      avatar:
        'https://i.ibb.co/0GJNHqx/02-shutterstock-370033352-mimagephotography-1024x683.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f2b5bdc2368e63300c7787a',
      categories: ['fashion', 'activities', 'events'],
      title: 'Smile',
      imageUrl: 'https://i.ibb.co/cC2gzGH/murals-northpark-727x545.jpg',
      text:
        ' A random pop of color amidst the neutral canvas of a cityscape is bound to evoke a smile from anyone, especially when those bright colors are accompanied by huge 22’X54’ letters that read “SMILE.” This colorful burst of cheer is not just a beautiful backdrop for a fun-photo on your trip to San Diego, it’s also an accurate representation of the essential essence that is San Diego. #happinessiscalling \n Where: First Avenue and C Street, San Diego, CA 92101',
      // name of the user
      name: 'Millie Richardson',
      avatar: 'https://i.ibb.co/yfGbXWg/3db77df2a496f33b09c1861acc7a7b1c.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f2b5bdc2368e63300c7787a',
      categories: ['fashion', 'activities', 'events'],
      title: 'Mural Campaign for Netflix',
      imageUrl: 'https://i.ibb.co/2S82tt6/oitnb-detroit-progres-2.jpg',
      text:
        'Mural Campaign for a Netflix premier! \n GA teamed up with B Reel Creative Agency and Netflix on a mural campaign. The multi city campaign reached 8 international cities.  To sum up the key markets represented were Melbourne, Sydney, Toronto, New York, Chicago, Los Angeles, San Francisco and Detroit. \n Firstly, the goal of the mural campaign was to promote an upcoming season. The premier of Orange Is The New Black Season 5. Secondly, the murals served as a tribute. A tribute to the popular character “Poussey Washington”.  In addition, it was important that each tribute stand individually. Without a doubt, all the murals were unique and strong as a series.\n The national artists that were part of the project include: Mast, Tewsr, Max Sansing, Amanda Lynn and Michelle Tanguay. In addition, international featured artists: Elle in Melbourne, Vexta in Sydney, and Ness Lee in Toronto. Each artist was chosen for their distinct style. Consequently providing multiple takes on Poussey visually. As well as the depth of her character.',
      // name of the user
      name: 'Millie Richardson',
      avatar: 'https://i.ibb.co/yfGbXWg/3db77df2a496f33b09c1861acc7a7b1c.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f2b5bdc2368e63300c77879',
      categories: ['fashion', 'activities', 'events'],
      title: 'Mural Campaign for Netflix',
      imageUrl: 'https://i.ibb.co/2S82tt6/oitnb-detroit-progres-2.jpg',
      text:
        'Mural Campaign for a Netflix premier! \n GA teamed up with B Reel Creative Agency and Netflix on a mural campaign. The multi city campaign reached 8 international cities.  To sum up the key markets represented were Melbourne, Sydney, Toronto, New York, Chicago, Los Angeles, San Francisco and Detroit. \n Firstly, the goal of the mural campaign was to promote an upcoming season. The premier of Orange Is The New Black Season 5. Secondly, the murals served as a tribute. A tribute to the popular character “Poussey Washington”.  In addition, it was important that each tribute stand individually. Without a doubt, all the murals were unique and strong as a series.\n The national artists that were part of the project include: Mast, Tewsr, Max Sansing, Amanda Lynn and Michelle Tanguay. In addition, international featured artists: Elle in Melbourne, Vexta in Sydney, and Ness Lee in Toronto. Each artist was chosen for their distinct style. Consequently providing multiple takes on Poussey visually. As well as the depth of her character.',
      // name of the user
      name: 'Brittany Schmidt',
      avatar: 'https://i.ibb.co/s65t4Xg/ebc8b0e560709ce497563a883d18f93a.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f2b5bdc2368e63300c77879',
      categories: ['fashion', 'activities', 'events'],
      title: 'Live Event Ideas',
      imageUrl: 'https://i.ibb.co/W2M8Qhw/nba-motg-2-1024x683.jpg',
      text:
        'This past all-star weekend, we painted a basketball court mural. Creating this project for a Nike x House of Hoops by Footlocker activation at Hollywood & Highland in Los Angeles was a blast. First, we fabricated a faux concrete wall that sat courtside. Next, we painted a custom graphic on both sides of the wall to finish the basketball court mural. The artwork mimicked the design vibe of the Kyrie 4 All Star 2018 shoes that were released that weekend. During the event, Kyrie Irving dropped by himself to shoot some hoops with some lucky local basketball teams! \n After the game was over, we had a workshop setup inside the Footlocker store. During this part of the event, we custom painted some regulation backboards as gifts for the two local teams. We had two live artists on site completing the pieces. We had no idea how heavy these backboards would be (over 200 lbs each!) As a result, we fabricated some custom steel easels had to display them properly. The teams walked over to the store along w/ Kyrie to sign their gifted backboards. This was an awesome project/opportunity in collaboration w/ Game Seven Marketing. Check out all the event photos below',
      // name of the user
      name: 'Brittany Schmidt',
      avatar: 'https://i.ibb.co/s65t4Xg/ebc8b0e560709ce497563a883d18f93a.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f2b5bdc2368e63300c77879',
      categories: ['fashion', 'activities', 'events'],
      title: 'Live Event Ideas',
      imageUrl: 'https://i.ibb.co/pjPHgY5/nb-nyrr-bronx-2.jpg',
      text:
        'Live Event Ideas – Look no further! We partnered with one of our favorite clients New Balance, to create an engaging mural. We painted an interactive photo op at the finish line of this year’s Bronx 10 mile race. The canvases were two layers of murals that worked together.\n The background 8×12 mural was designed & painted by Bronx native CES. Painted in an illustrative and classic graffiti style. Depicting iconic elements that make up the Bronx.  In the foreground, the mural was a design by Greetings Tour and executed by our Graffiti USA team. The BRONX letters in the font style often used for their Greetings murals. The mural was an 8×8 clear plexiglass canvas. By not filling in portions of the design, the foreground piece was see through. It allowed participants to take photos in front of or behind the piece. This gave everyone an opportunity to become part of the artwork!\n If you’re looking for live event ideas we are your go to. Let your next event stand out with live graffiti street art.',
      // name of the user
      name: 'Brittany Schmidt',
      avatar: 'https://i.ibb.co/s65t4Xg/ebc8b0e560709ce497563a883d18f93a.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8b0',
      categories: ['events', 'life', 'ideas'],
      title: 'Inspirational Art Campaign',
      imageUrl: 'https://i.ibb.co/SVcsPwX/gap-for-good.jpg',
      text:
        'An effective inspirational art campaign can go either one of two ways. On one hand, it can move everyday people through the imagery alone. On the other, it can convince everyday people to reflect on concepts they may have taken for granted.\n he Gap has made a name for itself as ad masterminds, combining dance and art in commercials and beyond. However, it may not be common knowledge that their marketing staff get other forms of talent on board! Glossblack and Fik-Shun collaborated on this awesome Dance x Art piece for The Gap Fall 2017 campaign. Supporting the mixed media project was a video created by Director X. Director X is responsible for creating many iconic music videos, including “Hotline Bling” by Drake, “Work” by Rihanna, and “Body Part” by Ciara. \n he Gap has made a name for itself as ad masterminds, combining dance and art in commercials and beyond. However, it may not be common knowledge that their marketing staff get other forms of talent on board! Glossblack and Fik-Shun collaborated on this awesome Dance x Art piece for The Gap Fall 2017 campaign. Supporting the mixed media project was a video created by Director X. Director X is responsible for creating many iconic music videos, including “Hotline Bling” by Drake, “Work” by Rihanna, and “Body Part” by Ciara.',
      // name of the user
      name: 'Evie Lawson',
      avatar:
        'https://i.ibb.co/LYPS785/03-shutterstock-450728395-F8-studio-1024x683.jpg',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8b2',
      categories: ['ideas', 'artworks', 'spotsaroundyou'],
      title: 'Live Art for a Company Party',
      imageUrl: 'https://i.ibb.co/KFPvHhs/7-Park-0236.jpg',
      text:
        'Just before the decade ended, Graffiti USA created some fantastic live art for a company party! 7Park Data is a NYC-based data transformation company, which organizes and redistributes Big Data for a wide variety of industries. The company’s event planners organized an end of the year bash for their employees. However, they turned to us for an unexpected twist to the usual activities. \n Painting live for the duration of the night proved to be an interesting spectacle for the attendees. Our design aimed to capture 7Park’s specialty as a data company. We thought of the problem like this: Raw data is, by its very nature, messy and inconclusive. Therefore, 7Data’s task is to refine everything into a new format for their clients to analyze. Hopefully, each client can make better business decisions through it. We embraced the creative challenge to visually convey this idea.\n First, Graffiti USA’s live art specialist painted a cityscape in the background. Once the background came together, he then painted a vague-looking machine in the foreground. Small details referencing data processing blend into NYC landmarks, as you can see in the photos below!',
      // name of the user
      name: 'Morgan Shelton',
      avatar:
        'https://viewer-ebook.books.com.tw/viewer/epub/web/?book_uni_id=E050060436_reflowable_normal',
      likes: [],
      comments: [],
    }),
    new Post({
      // user id
      user: '5f29fb5a3cb26f10bc4ee8b2',
      categories: ['ideas', 'artworks', 'spotsaroundyou'],
      title: 'Promotional Street Art for New Music',
      imageUrl: 'https://i.ibb.co/Xs26mFn/KLUGHAUS-DEFJAM-004.jpg',
      text:
        'What does promotional street art for new music look like? Because there is no one answer, it all depends on who’s asking! A few years back, Graffiti USA’s artists took part in a nationwide project promoting A Tribe Called Quest’s final album. In those murals, we kept our work very similar to the album artwork. However, Def Jam Records wanted us to think outside the box.\n Justin Bieber’s record Purpose dropped back in 2015, going multi-platinum in many nations across the world. Klughaus, our parent company, worked with Def Jam as they laid out the plans for a low-key art project. The concept was to create exterior murals inspired by the record’s track listing. Therefore, our first task was to secure the locations for each mural. Also, we also curated the best artists in the many cities we made art in. These include: NYC, Chicago, Seattle, San Francisco, Philadelphia, Boston, Austin, Oklahoma City, DC, and Atlanta. \n Justin Bieber’s record Purpose dropped back in 2015, going multi-platinum in many nations across the world. Klughaus, our parent company, worked with Def Jam as they laid out the plans for a low-key art project. The concept was to create exterior murals inspired by the record’s track listing. Therefore, our first task was to secure the locations for each mural. Also, we also curated the best artists in the many cities we made art in. These include: NYC, Chicago, Seattle, San Francisco, Philadelphia, Boston, Austin, Oklahoma City, DC, and Atlanta. \n Some of the artists that participated in this project include: Seb Gorey, Amuse126, Kem5, Arek, Gloss Black, Merlot, Victor Ving, Awe2, Andrew Manning, and Rpes. Check out some photos from the project, available below',
      // name of the user
      name: 'Morgan Shelton',
      avatar:
        'https://viewer-ebook.books.com.tw/viewer/epub/web/?book_uni_id=E050060436_reflowable_normal',
      likes: [],
      comments: [],
    }),
  ];
  // https://www.sandiego.org/articles/arts-culture/murals.aspx
  // https://graffiti-artist.net/portfolio
  let i,
    done = 0;

  for (i = 0; i < posts.length; i++) {
    posts[i].save(() => {
      done++;
      if (done === posts.length) {
        console.log(posts);
        mongoose.disconnect();
      }
    });
  }
} catch (err) {
  console.error(err.mesage);
  process.exit(1);
}
