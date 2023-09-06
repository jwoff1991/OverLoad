from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text



def seed_users():
    demo = User(
            first_name='demo'
            last_name= 'user'
            username='Demo',
            email='demo@aa.io',
            bio='',
            password='password'
        )

    marnie = User(
            first_name='marnie'
            last_name= 'Higgins'
            username='marnie',
            email='marnie@aa.io',
            bio='',
            password='password'
        )

    bobbie = User(
            first_name= 'Bobbie',
            last_name= 'Higgins'
            username='bobbie',
            email='bobbie@aa.io',
            bio='',
            password='password'
        )

    user4 = User(
            first_name="John",
            last_name="Smith",
            username="JonnieSmith",
            email="John.Smith@awn.com",
            bio="John Smith is an enthusiastic outdoor adventurer who finds solace in the beauty of nature. He enjoys hiking through lush forests, climbing rugged mountains, and capturing breathtaking landscapes with his camera. When he's not exploring the great outdoors, John loves experimenting with gourmet cooking and sharing his culinary creations with friends and family.",
            password="password1"
        )

    user5 = User(
            first_name="Alice",
            last_name="Johnson",
            username="AliceinWonderland",
            email="Alice.Johnson@email.net",
            bio="Alice Johnson is a tech-savvy individual with an insatiable passion for all things digital. She spends her days immersed in coding, creating innovative apps, and staying up-to-date with the latest tech trends. In her free time, Alice enjoys sipping on her favorite coffee blends while diving into the world of science fiction novels.",
            password="password2"
        )

    user6 = User(
            first_name="Emma",
            last_name="Davis",
            username="Emmmmmma",
            email="Emma.Davis@example.org",
            bio="Emma Davis is a talented artist who expresses her creativity through a variety of mediums. Her love for animals is evident in her artwork, which often features whimsical depictions of creatures from around the world. Emma is on a mission to raise awareness about wildlife conservation and is dedicated to making a positive impact on the planet.",
            password="password3"
        )

    user7 = User(
            first_name="Michael",
            last_name="Brown",
            username="BrownMichael",
            email="mike.brown@email.com",
            bio="Michael Brown is a sports enthusiast and a self-proclaimed foodie. Whether he's cheering for his favorite sports teams or exploring the culinary delights of his city, Michael approaches life with boundless energy and a zest for new experiences. He's always on the lookout for the next great meal to savor.",
            password="password4"
        )

    user8 = User(
            first_name="Sarah",
            last_name="Wilson",
            username="WilsonS",
            email="sarahw@email.com",
            bio="Sarah Wilson is a globetrotter who thrives on adventure and storytelling. Her passion for travel has taken her to remote corners of the world, where she captures the essence of different cultures through her photography. When she's not jet-setting, Sarah can be found poring over maps and planning her next epic journey.",
            password="password5"
        )

    user9 = User(
            first_name="David",
            last_name="Lee",
            username="Davidleeeee",
            email="david.lee@email.net",
            bio="David Lee is a multi-talented musician and film aficionado. He spends his days composing melodies that evoke deep emotions and his nights immersed in the cinematic worlds of classic and contemporary films. David's love for storytelling through music and movies is a lifelong passion he continues to nurture.",
            password="password6"
        )

    user10 = User(
            first_name="Olivia",
            last_name="Taylor",
            username="TayOlive",
            email="oliviat@email.org",
            bio="Olivia Taylor is a dedicated fitness enthusiast and a devoted dog lover. She believes in maintaining a healthy lifestyle and can often be found in the gym or outdoors, working up a sweat. Olivia's furry companions are her constant companions, and together, they explore the great outdoors and stay active.",
            password="password7"
        )

    user10 = User(
            first_name="James",
            last_name="Anderson",
            username="Anderson",
            email="james.and@example.net",
            bio="James Anderson is a dedicated gamer and tech enthusiast. He's deeply involved in the world of video games, from competitive esports to game development. When he's not immersed in the virtual realm, James enjoys exploring the latest advancements in technology, from cutting-edge gadgets to AI and robotics.",
            password="password8"
        )

    user11 = User(
            first_name="Sophia",
            last_name="White",
            username="Wofia",
            email="sophia.w@email.com",
            bio="Sophia White is a passionate bookworm with an insatiable love for literature. Her personal library boasts a wide range of genres, and she's always eager to discuss her latest literary discoveries. Sophia's cozy reading nook is her favorite place to escape into the world of stories.",
            password="password9"
        )

    user12 = User(
            first_name="Daniel",
            last_name="Martinez",
            username="HikingChamp",
            email="daniel.martinez@email.com",
            bio="Daniel Martinez is an avid hiker and adventure seeker who craves the thrill of exploring untouched natural landscapes. He documents his journeys through breathtaking photography and shares his experiences with fellow outdoor enthusiasts. Daniel's ultimate goal is to inspire others to appreciate and protect the beauty of the great outdoors.",
            password="password10"
        )

    user13 = User(
            first_name="Mia",
            last_name="Davis",
            username="Ilovecats",
            email="miad@email.org",
            bio="Mia Davis is a passionate animal rights advocate and a dedicated vegan. She's on a mission to raise awareness about animal welfare and promote a compassionate lifestyle. Mia's love for animals extends beyond advocacy, as she cares for her own furry friends and volunteers at animal shelters whenever she can.",
            password="password11"
        )

    user14 = User(
            first_name="William",
            last_name="Johnson",
            username="WillJohn",
            email="will.j@example.net",
            bio="William Johnson is a sports enthusiast with an insatiable appetite for everything related to athletics. He spends his time cheering for his favorite teams, engaging in friendly debates about sports statistics, and staying active himself. William's dedication to sports is a lifelong passion that brings joy to his life.",
            password="password12"
        )

    user15 = User(
            first_name="Emily",
            last_name="Brown",
            username="WhereintheWorld",
            email="emily.brown@email.net",
            bio="Emily Brown is an art lover and a passionate traveler. She finds inspiration in her adventures, which she channels into her creative expressions. Whether she's sketching a new landscape or capturing moments through her camera, Emily believes that art and travel are the perfect companions on life's journey.",
            password="password13"
        )

    user16 = User(
            first_name="Matthew",
            last_name="Wilson",
            username="GamesAddict",
            email="mattw@email.com",
            bio="Matthew Wilson is a dedicated gamer and a collector of comic books. He immerses himself in the virtual worlds of video games and has a vast collection of comics from various universes. Matthew's enthusiasm for gaming and comic books is a never-ending adventure.",
            password="password14"
        )

    user17 = User(
            first_name="Ella",
            last_name="Thomas",
            username="EllaT",
            email="ella.t@example.org",
            bio="Ella Thomas is a yoga enthusiast who finds inner peace and strength through her practice. Her connection with nature and love for yoga go hand in hand, as she often takes her practice outdoors to embrace the beauty of the natural world. Ella's journey toward mindfulness and wellness is a lifelong pursuit.",
            password="password15"
        )

    user18 = User(
            first_name="Benjamin",
            last_name="Harris",
            username="BengiHair",
            email="ben.h@email.com",
            bio="Benjamin Harris is a tech geek with a passion for coding and innovation. He enjoys diving into complex coding projects and exploring the endless possibilities of technology. Benjamin's mission is to contribute to the ever-evolving world of technology and inspire others to embrace the digital future.",
            password="password16"
        )

    user19 = User(
            first_name="Ava",
            last_name="Clark",
            username="Clarkworm",
            email="ava.c@email.net",
            bio="Ava Clark is a coffee aficionado and a dedicated bookworm. She believes that a good book and a cup of coffee can transport her to different worlds and eras. Ava's cozy reading nook is her sanctuary, where she escapes reality and embarks on literary adventures.",
            password="password17"
        )

    user20 = User(
            first_name="Alexander",
            last_name="Lewis",
            username="alexlewis",
            email="alex.l@email.org",
            bio="Alexander Lewis is a talented musician and a cinephile with a deep appreciation for the world of sound and storytelling. He creates captivating melodies that evoke a range of emotions and immerses himself in the cinematic world, exploring films from classic to contemporary. Alexander's life is a symphony of creativity.",
            password="password18"
        )

    user21 = User(
            first_name="Chloe",
            last_name="Turner",
            username="liftBRO",
            email="chloe.t@example.com",
            bio="Chloe Turner is a fitness enthusiast who lives for the thrill of physical challenges and adventures. She maintains a rigorous fitness routine and considers her dog her most loyal workout partner. Chloe's dedication to health and her furry friend keep her energized and motivated.",
            password="password19"
        )

    user22 = User(
            first_name="Liam",
            last_name="Garcia",
            username="Techtech",
            email="liam.garcia@email.net",
            bio="Liam Garcia is a passionate gamer and a technology enthusiast. He's always on the cutting edge of gaming trends and embraces the latest in tech innovations. Liam's dual love for gaming and technology drives him to explore new horizons in the digital world.",
            password="password20"
        )

    user23 = User(
            first_name="Grace",
            last_name="Hall",
            username="GrecieeeeH",
            email="grace.h@email.com",
            bio="Grace Hall is an art lover and a dedicated traveler. She carries her sketchbook and camera wherever she goes, capturing the beauty of different cultures and landscapes. Grace believes that art and travel are the perfect companions for self-discovery and cultural appreciation.",
            password="password21"
        )

    user24 = User(
            first_name="Jackson",
            last_name="Martinez",
            username="JackntheBean",
            email="jackson.m@email.org",
            bio="Jackson Martinez is an avid hiker and nature enthusiast who seeks solace in the great outdoors. He spends his weekends exploring hidden trails and pristine wilderness areas, all while taking stunning photographs to share his love for nature with the world.",
            password="password22"
        )

    user25 = User(
            first_name="Lily",
            last_name="Nelson",
            username="LilNiel",
            email="lily.nelson@email.net",
            bio="Lily Nelson is an animal rights activist and a passionate vegan. She advocates for animal welfare and sustainability, actively working towards a more compassionate and eco-friendly world. Lily's dedication to her cause extends to her volunteer work at local animal shelters.",
            password="password23"
        )

    user26 = User(
            first_name="Lucas",
            last_name="Allen",
            username="Allenballin",
            email="lucas.a@example.net",
            bio="Lucas Allen is a sports enthusiast and a devoted cinephile. He's equally at home discussing game statistics as he is analyzing classic and contemporary films. Lucas's passion for sports and movies adds excitement and depth to his life.",
            password="password24"
        )

    user27 = User(
            first_name="Avery",
            last_name="Cooper",
            username="CoopsmaGoops",
            email="avery.c@email.com",
            bio="Avery Cooper is a music lover who can't resist the allure of live concerts. With an extensive vinyl collection and a keen ear for new music, Avery's world is filled with the sounds of diverse genres. Music is the heartbeat of Avery's life.",
            password="password25"
        )

    user28 = User(
            first_name="Sofia",
            last_name="Ross",
            username="Rosstoss",
            email="sofia.r@email.net",
            bio="Sofia Ross is an avid bookworm and an unapologetic coffee addict. Her cozy reading nook is her sanctuary, where she delves into the worlds of fiction and non-fiction alike, fueled by her favorite brews. Sofia believes that every book has a story worth savoring.",
            password="password26"
        )

    user29 = User(
            first_name="Henry",
            last_name="Turner",
            username="HairyTurn",
            email="henry.t@example.org",
            bio="Henry Turner is a dedicated yoga practitioner who finds tranquility in the art of mindfulness and wellness. He's also a nature lover who enjoys hiking, camping, and immersing himself in the great outdoors. Henry's journey to balance and inner peace is an ongoing exploration.",
            password="password27"
        )

    user30 = User(
            first_name="Samuel",
            last_name="Wright",
            username="IamWright",
            email="samuel.w@email.com",
            bio="Samuel Wright is a tech nerd and coding enthusiast who revels in solving complex problems through programming. He's constantly exploring new programming languages and technologies, eager to be on the forefront of innovation. Samuel's passion for coding fuels his curiosity and creativity.",
            password="password28"
        )

    user31 = User(
            first_name="Scarlett",
            last_name="Parker",
            username="PeetParker",
            email="scarlett.p@email.net",
            bio="Scarlett Parker is a coffee lover and a fashionista with an eye for style. She enjoys the simple pleasure of sipping her favorite brews while staying updated on the latest fashion trends. Scarlett's unique sense of style is an expression of her vibrant personality.",
            password="password29"
        )

    user32 = User(
            first_name="Daniel",
            last_name="Adams",
            username="DA",
            email="daniel.a@example.org",
            bio="Daniel Adams is a dedicated gamer and an avid anime enthusiast. He immerses himself in the captivating worlds of video games and anime series, often engaging in spirited discussions about character development and plot twists. Daniel's love for these forms of entertainment knows no bounds.",
            password="password30"
        )

    user33 = User(
            first_name="Mila",
            last_name="Lewis",
            username="IloveFitness",
            email="mila.l@email.com",
            bio="Mila Lewis is a fitness enthusiast who is deeply committed to health and wellness. She combines her passion for fitness with a plant-based lifestyle to promote overall well-being. Mila is dedicated to helping others lead healthier lives through her coaching and advocacy work.",
            password="password31"
        )

    user34 = User(
            first_name="Aiden",
            last_name="Perez",
            username="APerez",
            email="aiden.p@email.org",
            bio="Aiden Perez is a photography lover and a globetrotter on a quest for captivating landscapes and cultures. Armed with a camera, Aiden explores remote destinations, capturing the essence of each place. Aiden's photographs serve as visual narratives of the beauty found in every corner of the world.",
            password="password32"
        )

    user35 = User(
            first_name="Evelyn",
            last_name="Morris",
            username="MorrisBorris",
            email="evelyn.m@email.net",
            bio="Evelyn Morris is an art enthusiast who finds inspiration in every brushstroke and color palette. She expresses her creativity through various forms of art, from painting to sculpture. Evelyn's work reflects her deep connection with nature and her exploration of the human experience.",
            password="password33"
        )

    user36 = User(
            first_name="Michael",
            last_name="Parker",
            username="MichaelPeeeee",
            email="michael.p@email.com",
            bio="Michael Parker is a dedicated musician and a film buff who believes in the power of storytelling through music and cinema. He creates melodies that touch the soul and indulges in a wide range of cinematic experiences. For Michael, music and movies are the languages of emotions.",
            password="password34"
        )

    user37 = User(
            first_name="Abigail",
            last_name="Hill",
            username="AbiHill",
            email="abigail.h@example.org",
            bio="Abigail Hill is a yoga addict and an ardent bookworm. She finds balance and solace on the yoga mat, exploring the mind-body connection. Abigail's passion for reading transports her to new worlds and perspectives, making her a lifelong learner and seeker of wisdom.",
            password="password35"
        )

    user38 = User(
            first_name="James",
            last_name="Mitchell",
            username="Mitch",
            email="james.m@example.net",
            bio="James Mitchell is a dedicated hiker and an adventure seeker who thrives on challenges. Whether he's scaling peaks or traversing rugged terrain, James embraces the thrill of the great outdoors. His quest for adrenaline rushes and breathtaking landscapes is a lifelong journey.",
            password="password36"
        )

    user39 = User(
            first_name="Charlotte",
            last_name="Cook",
            username="IliketoCook",
            email="charlotte.c@email.com",
            bio="Charlotte Cook is an animal rights advocate and a passionate vegan who believes in the importance of ethical living. She's on a mission to create a kinder world for animals and inspire others to embrace cruelty-free lifestyles. Charlotte's advocacy work is fueled by compassion and dedication.",
            password="password37"
        )

    user40 = User(
            first_name="Noah",
            last_name="Scott",
            username="ScottN",
            email="noah.s@email.net",
            bio="Noah Scott is a sports fanatic and a movie lover with a never-ending appetite for entertainment. He immerses himself in the world of sports statistics and enjoys analyzing the finer points of cinematic storytelling. For Noah, sports and movies are a source of endless fascination.",
            password="password38"
        )

    user41 = User(
            first_name="Avery",
            last_name="Rodriguez",
            username="ARod",
            email="avery.r@email.org",
            bio="Avery Rodriguez is a dedicated gamer and a tech enthusiast with an insatiable curiosity about the digital world. He's always eager to explore new gaming experiences and cutting-edge technologies. Avery's passion for gaming and tech drives his continuous learning and exploration.",
            password="password39"
        )

    user42 = User(
            first_name="Sophia",
            last_name="Walker",
            username="Sophposh",
            email="sophia.walker@email.net",
            bio="Sophia Walker is an adventurous spirit who finds joy in both thrilling experiences and serene moments. She enjoys the simple pleasures of life, from sipping on coffee to exploring new paths. Sophia's journey is an exploration of the beauty in both excitement and tranquility.",
            password="password40"
        )

    user43 = User(
            first_name="Ethan",
            last_name="Hall",
            username="EthanHall",
            email="ethan.h@email.com",
            bio="Ethan Hall is a tech geek and a coding enthusiast who thrives on problem-solving and innovation. He's constantly exploring the world of programming languages and emerging technologies, using code to bring his ideas to life. For Ethan, the digital realm is a playground of endless possibilities.",
            password="password41"
        )

    user44 = User(
            first_name="Amelia",
            last_name="Foster",
            username="CoffeeFosterer",
            email="amelia.f@email.net",
            bio="Amelia Foster is a dedicated coffee addict and an ardent bookworm who believes in the magic of a well-brewed cup of joe and the written word. Her reading adventures span various genres, making every book a delightful journey into new worlds and perspectives.",
            password="password42"
        )

    user45 = User(
            first_name="Daniel",
            last_name="Brooks",
            username="DBrooks",
            email="daniel.b@email.com",
            bio="Daniel Brooks is a music enthusiast and a cinephile who finds solace in the art of sound and storytelling. He immerses himself in the melodies of diverse genres and explores the cinematic world, seeking inspiration from the moving images and emotional narratives.",
            password="password43"
        )

    user46 = User(
            first_name="Liam",
            last_name="Wright",
            username="LWright",
            email="liam.w@email.net",
            bio="Liam Wright is a fitness freak and a devoted dog lover. He believes in the power of an active lifestyle and the unconditional love of furry companions. Liam's pursuit of health and his bond with his canine friends keep him energized and happy.",
            password="password44"
        )

    user47 = User(
            first_name="Olivia",
            last_name="Turner",
            username="TurnOlives",
            email="olivia.t@email.com",
            bio="Olivia Turner is a gamer and a technology enthusiast who thrives on digital adventures and the latest tech innovations. She's always ready to explore new virtual realms and stay at the forefront of technological advancements. Olivia's life is a fusion of gaming and tech exploration.",
            password="password45"
        )

    user48 = User(
            first_name="Mason",
            last_name="King",
            username="MKING",
            email="mason.k@email.org",
            bio="Mason King is an art lover and a dedicated traveler who finds inspiration in the intersection of cultures and creativity. He roams the world, capturing diverse landscapes and engaging with local art scenes. Mason's exploration of art and travel is an ongoing journey of self-discovery.",
            password="password46"
        )

    user49 = User(
            first_name="Emma",
            last_name="Adams",
            username="AdamsFamily",
            email="emma.a@email.net",
            bio="Emma Adams is a hiker and a nature enthusiast who seeks serenity in the embrace of pristine landscapes. She's always on the lookout for hidden trails and natural wonders, immersing herself in the beauty of the great outdoors. Emma's journey is a celebration of nature's wonders.",
            password="password47"
        )

    user50 = User(
            first_name="William",
            last_name="Hayes",
            username="Willy",
            email="william.h@email.com",
            bio="William Hayes is an animal rights activist and a devoted vegan who advocates for the well-being of animals and the environment. He's on a mission to create a compassionate world and raise awareness about ethical living choices. William's dedication to his cause drives his everyday choices.",
            password="password48"
        )

    db.session.add_all([demo, marnie,bobbie,user4,user5,user6,user7,user8,user9,user10,
        user11,user12,user13,user14,user15,user16,user17,user18,user19,user20,
        user21,user22,user23,user24,user25,user26,user27,user28,user29,user30,
        user31,user32,user33,user34,user35,user36,user37,user38,user39,user40,
        user41,user42,user43,user44,user45,user46,user47,user48,user49,user50])
    db.session.commit()



def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
