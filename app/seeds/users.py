from app.models import db, User, Article, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



def seed_users():
    demo = User(
            first_name='demo',
            last_name= 'user',
            username='Demo',
            email='demo@aa.io',
            bio='',
            password='password'
        )


    marnie = User(
            first_name='marnie',
            last_name= 'Higgins',
            username='marnie',
            email='marnie@aa.io',
            bio='',
            password='password'
        )

    bobbie = User(
            first_name= 'Bobbie',
            last_name= 'Higgins',
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

    article_1 = Article(
        user_id=5,
        title="The Power of Python: A Versatile Programming Language",
        body="""
            Python has established itself as a powerhouse in the world of programming, and its versatility makes it a
            favorite among developers. From web development and data analysis to machine learning and automation, Python
            excels in a wide range of applications.

            One of Python's key strengths is its readability and ease of learning, making it an excellent choice for
            beginners. With a vast community and an abundance of libraries and frameworks, Python empowers developers to
            turn their ideas into reality with ease.

            In this article, we explore the diverse applications of Python, its role in the tech industry, and how it
            continues to evolve to meet the demands of modern development.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_2 = Article(
        user_id=5,
        title="Demystifying Machine Learning: A Beginner's Guide",
        body="""
            Machine learning is no longer a niche field but a transformative technology that has found applications
            in various industries. For beginners looking to dive into the world of machine learning, understanding the
            fundamentals is key.

            In this article, we break down the core concepts of machine learning, from supervised and unsupervised
            learning to neural networks and deep learning. We demystify the jargon and provide practical examples to
            help you grasp the concepts.

            Whether you're a programmer, a data scientist, or simply curious about this exciting field, this beginner's
            guide will lay the foundation for your journey into the captivating world of machine learning.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_3 = Article(
        user_id=5,
        title="JavaScript: The Language of the Web",
        body="""
            JavaScript is the driving force behind the dynamic and interactive experiences you encounter on the web.
            As a front-end programming language, it plays a pivotal role in web development, allowing developers to
            create responsive and user-friendly websites.

            In this article, we delve into the world of JavaScript, exploring its syntax, core concepts, and its
            integration with HTML and CSS. We discuss the power of JavaScript libraries and frameworks like React,
            Angular, and Vue.js, which have revolutionized web development.

            Whether you're a web developer looking to enhance your skills or someone considering a career in front-end
            development, understanding JavaScript is essential for navigating the ever-evolving landscape of web
            technologies.
        """,
        date_created=datetime(2023, 9, 6),
    )


    article_4 = Article(
        user_id=8,
        title="Exploring the World: Top Travel Tips for Adventurers",
        body="""
            Traveling is a rewarding experience, but it can also be challenging without the right tips and tricks. In this
            article, we share invaluable advice for adventurers seeking to explore the world.

            From packing efficiently and navigating airports to immersing in local cultures and staying safe during your
            adventures, we cover it all. Learn how to make the most of your travel experiences and create lasting memories.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_5 = Article(
        user_id=8,
        title="Traveling on a Budget: How to Explore the World Without Breaking the Bank",
        body="""
            Traveling doesn't have to be expensive. With careful planning and budget-friendly strategies, you can explore
            new destinations without breaking the bank. In this article, we share practical tips for budget travelers.

            Discover ways to find affordable accommodations, save on transportation costs, and enjoy local cuisine
            without overspending. With the right approach, you can embark on memorable adventures while keeping your
            finances in check.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_6 = Article(
        user_id=8,
        title="Solo Travel: Embracing the World on Your Own Terms",
        body="""
            Solo travel can be a transformative experience, allowing you to embrace new cultures and discover your
            independence. In this article, we explore the joys and challenges of solo travel and offer tips for those
            embarking on solo adventures.

            Learn how to plan a solo trip, stay safe while traveling alone, and make the most of your solo journey.
            Whether you're a seasoned solo traveler or considering it for the first time, this article will inspire and
            empower you to explore the world on your terms.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_7 = Article(
        user_id=19,
        title="The Art of Brewing: Mastering Your Morning Coffee",
        body="""
            Coffee is more than a beverage; it's an art form. In this article, we delve into the world of coffee brewing,
            from selecting the perfect beans to mastering various brewing methods. Whether you're a coffee connoisseur or
            a novice, you'll discover tips and techniques to elevate your morning coffee ritual.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_8 = Article(
        user_id=19,
        title="Coffee Culture Around the World: A Global Journey of Flavors",
        body="""
            Coffee transcends borders and cultures, and each region has its unique coffee traditions. Join us on a
            flavorful journey as we explore coffee culture around the world. From Italian espresso to Turkish coffee,
            discover the diverse flavors and rituals that make coffee an international phenomenon.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_9 = Article(
        user_id=19,
        title="The Science of Coffee: Decoding Beans, Roasts, and Brewing",
        body="""
            Coffee is a complex beverage, and its flavors are influenced by a myriad of factors. In this article, we
            unravel the science behind coffee, from the chemistry of beans to the art of roasting and brewing.
            Understanding the science can help you fine-tune your coffee experience and discover your perfect cup.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_10 = Article(
        user_id=17,
        title="Yoga for Beginners: A Step-by-Step Guide to Finding Inner Peace",
        body="""
            Yoga is not just a physical practice; it's a journey toward inner peace and well-being. In this article, we
            provide a step-by-step guide for beginners looking to start their yoga journey. Learn about fundamental yoga
            poses, breathing techniques, and how to create a tranquil space for your practice. Embark on a path to
            mindfulness and discover the transformative power of yoga.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_11 = Article(
        user_id=17,
        title="The Mind-Body Connection: How Yoga Enhances Mental and Physical Health",
        body="""
            Yoga is more than just physical postures; it's a practice that nurtures the mind-body connection. In this
            article, we explore the profound impact of yoga on mental and physical health. Discover how yoga reduces
            stress, improves flexibility, and enhances mindfulness. Whether you're a seasoned yogi or new to the practice,
            this article highlights the holistic benefits of yoga.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_12 = Article(
        user_id=17,
        title="Yoga Beyond Asanas: Exploring the Eight Limbs of Yoga Philosophy",
        body="""
            Yoga is a comprehensive philosophy that extends beyond physical postures. Dive deep into the essence of yoga
            by exploring the Eight Limbs of Yoga Philosophy. From ethical principles (Yamas) to self-discipline (Niyamas)
            and meditation (Dhyana), these limbs guide practitioners toward spiritual growth and self-realization.
            Discover the timeless wisdom of yoga philosophy and its relevance in the modern world.
        """,
        date_created=datetime(2023, 9, 6),
    )
    article_13 = Article(
        user_id=45,
        title="Crafting Compelling Narratives: The Art of Storytelling",
        body="""
            Storytelling is a timeless art form that has the power to captivate, inspire, and connect people on a profound
            level. In this article, we delve into the craft of storytelling, exploring the elements that make narratives
            compelling and unforgettable.

            Discover the importance of well-defined characters, engaging plots, and the emotional resonance that drives
            powerful storytelling. Whether you're a writer, filmmaker, or simply an enthusiast, this article will
            illuminate the path to becoming a master storyteller.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_14 = Article(
        user_id=45,
        title="The Influence of Storytelling: Shaping Culture and Society",
        body="""
            Stories have the remarkable ability to shape culture, society, and our collective understanding of the world.
            In this article, we examine the profound influence of storytelling throughout history and in contemporary
            society.

            Explore how stories have been used to convey cultural values, drive social change, and create lasting
            legacies. Gain insights into the role of storytelling in literature, film, and even marketing, and how it
            continues to impact our lives.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_15 = Article(
        user_id=45,
        title="Digital Storytelling: Navigating the Narrative Landscape in the Digital Age",
        body="""
            In the digital age, storytelling has taken on new dimensions and platforms. From interactive narratives in
            video games to immersive experiences in virtual reality, storytelling has evolved. In this article, we
            navigate the landscape of digital storytelling.

            Discover how technology has expanded the possibilities of storytelling and how creators are pushing the
            boundaries of narrative in the digital realm. Whether you're a storyteller in the traditional sense or
            exploring digital avenues, this article offers insights into the exciting world of narrative innovation.
        """,
        date_created=datetime(2023, 9, 6),
    )
    article_16 = Article(
        user_id=24,
        title="Hiking Essentials: Gear and Tips for a Memorable Trek",
        body="""
            Hiking is a thrilling outdoor adventure that allows you to connect with nature and challenge yourself. In this
            article, we delve into the essentials of hiking, covering gear, preparation, and tips for a memorable trek.

            Discover the must-have hiking gear, from comfortable footwear to essential safety items. Learn how to plan
            your hikes, navigate trails, and stay safe in the wilderness. Whether you're a beginner or an experienced
            hiker, this article is your guide to an enriching hiking experience.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_17 = Article(
        user_id=24,
        title="Hiking Trails That Take Your Breath Away: A Journey to Natural Beauty",
        body="""
            The world is adorned with breathtaking hiking trails that offer stunning vistas and encounters with the
            natural world. In this article, we embark on a virtual journey to some of the most awe-inspiring hiking
            destinations.

            Explore trails that lead to towering mountain peaks, serene lakes, and lush forests. From the Appalachian
            Trail in the United States to the Inca Trail in Peru, discover the wonders of these remarkable hiking
            routes and start planning your next adventure.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_18 = Article(
        user_id=24,
        title="Hiking as a Mindful Practice: Finding Peace in Nature's Embrace",
        body="""
            Hiking is not just about physical exertion; it's also an opportunity for mindfulness and inner peace.
            In this article, we explore the meditative aspects of hiking and how it can be a transformative experience.

            Learn how to use hiking as a form of mindfulness practice, connecting with the natural world and finding
            tranquility in the great outdoors. Whether you seek solitude or wish to share the experience with others,
            this article invites you to discover the spiritual dimensions of hiking.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_19 = Article(
        user_id=25,
        title="Embracing Veganism: A Compassionate Journey to a Plant-Based Lifestyle",
        body="""
            Veganism is more than a dietary choice; it's a lifestyle that promotes compassion for animals and a
            sustainable future. In this article, we delve into the world of veganism, exploring the reasons people
            choose to go vegan and the positive impacts it can have on health and the environment.

            Discover the benefits of a plant-based diet, learn about common misconceptions, and find resources to
            support your vegan journey. Whether you're considering a transition to veganism or seeking to deepen
            your commitment, this article provides insights and guidance.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_20 = Article(
        user_id=25,
        title="Vegan Culinary Delights: Exploring the Flavors of Plant-Based Cuisine",
        body="""
            Plant-based cuisine is a vibrant world of flavors and creativity. In this article, we celebrate the
            culinary delights of vegan cooking, showcasing delicious and nutritious dishes that embrace the
            diversity of plant-based ingredients.

            From mouthwatering vegan burgers to delectable desserts, we explore the art of vegan cooking and provide
            recipes and cooking tips to inspire your own culinary adventures. Whether you're a seasoned vegan chef
            or just starting to explore plant-based cooking, this article offers a taste of the exciting world of
            vegan cuisine.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_21 = Article(
        user_id=25,
        title="Veganism and Sustainability: A Powerful Combination for a Better Planet",
        body="""
            Veganism is not only good for your health but also for the planet. In this article, we delve into the
            relationship between veganism and sustainability, highlighting how choosing plant-based options can
            reduce our environmental footprint and combat climate change.

            Learn about the environmental impacts of animal agriculture, the concept of food sustainability, and how
            veganism contributes to a more sustainable future. Whether you're an environmental advocate or curious
            about the intersection of food choices and sustainability, this article explores the positive impact of
            going vegan.
        """,
        date_created=datetime(2023, 9, 6),
    )
    article_22 = Article(
        user_id=27,
        title="Front Row Bliss: My Unforgettable Experience at the Rock Legends Concert",
        body="""
            Attending a live concert can be a transcendent experience, and my journey to the front row of the Rock Legends
            Concert was nothing short of magical. In this article, I recount my unforgettable adventure, from scoring
            coveted tickets to feeling the adrenaline rush as the music filled the air.

            Join me as I relive the electrifying performances, the camaraderie of fellow fans, and the unforgettable
            moments that made this concert a memory for a lifetime. Discover the power of live music and the joy of
            sharing it with a passionate crowd.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_23 = Article(
        user_id=27,
        title="Music Festivals: A Journey Through Sound, Art, and Community",
        body="""
            Music festivals are immersive experiences that blend music, art, and community into a harmonious celebration
            of life. In this article, I take you on a journey through the vibrant world of music festivals, sharing my
            experiences and the unique culture that defines these events.

            Explore the diverse music genres, the captivating art installations, and the sense of belonging that
            festivals offer. Whether you're a seasoned festival-goer or someone considering your first festival
            adventure, this article offers a glimpse into the transformative power of music festivals.
        """,
        date_created=datetime(2023, 9, 6),
    )

    article_24 = Article(
        user_id=27,
        title="Intimate Concerts: Discovering Hidden Gems in Acoustic Serenity",
        body="""
            While stadium concerts are grand spectacles, intimate acoustic performances offer a different kind of magic.
            In this article, I share my love for intimate concerts and the unique connection they create between artists
            and the audience.

            Join me on a journey to small venues, where talented musicians pour their hearts into every note. Discover
            the beauty of stripped-down performances and the joy of being part of an intimate audience. Whether you're
            a music enthusiast or simply curious about the magic of acoustic serenity, this article will resonate with
            your love for music.
        """,
        date_created=datetime(2023, 9, 6),
    )


    comment1 = Comment(
        article_id = 10,
        user_id = 23,
        body = "This is a great article!",
        date_created=datetime(2023, 9, 6)
    )

    comment2 = Comment(
        article_id = 6,
        user_id = 44,
        body = "I found this information very useful.",
        date_created=datetime(2023, 9, 6)
    )

    comment3 = Comment(
        article_id = 17,
        user_id = 9,
        body = "I have a question about this topic.",
        date_created=datetime(2023, 9, 6)
    )

    comment4 = Comment(
        article_id = 3,
        user_id = 36,
        body = "I disagree with some points in the article.",
        date_created=datetime(2023, 9, 6)
    )

    comment5 = Comment(
        article_id = 5,
        user_id = 16,
        body = "Thank you for sharing this knowledge!",
        date_created=datetime(2023, 9, 6)
    )

    comment6 = Comment(
        article_id = 12,
        user_id = 7,
        body = "I would like to know more about this.",
        date_created=datetime(2023, 9, 6)
    )

    comment7 = Comment(
        article_id = 2,
        user_id = 28,
        body = "This article is well-written and informative.",
        date_created=datetime(2023, 9, 6)
    )

    comment8 = Comment(
        article_id = 8,
        user_id = 49,
        body = "I'm having trouble understanding a concept here.",
        date_created=datetime(2023, 9, 6)
    )

    comment9 = Comment(
        article_id = 20,
        user_id = 2,
        body = "I think this article needs more examples.",
        date_created=datetime(2023, 9, 6)
    )

    comment10 = Comment(
        article_id = 15,
        user_id = 30,
        body = "I've been looking for information on this topic.",
        date_created=datetime(2023, 9, 6)
    )
    comment11 = Comment(
        article_id = 21,
        user_id = 12,
        body = "This is a must-read for anyone interested in this subject.",
        date_created=datetime(2023, 9, 6)
    )

    comment12 = Comment(
        article_id = 5,
        user_id = 37,
        body = "I have a different perspective on this.",
        date_created=datetime(2023, 9, 6)
    )

    comment13 = Comment(
        article_id = 9,
        user_id = 25,
        body = "The author did a great job explaining this.",
        date_created=datetime(2023, 9, 6)
    )

    comment14 = Comment(
        article_id = 13,
        user_id = 41,
        body = "I'd like to see more articles like this.",
        date_created=datetime(2023, 9, 6)
    )

    comment15 = Comment(
        article_id = 19,
        user_id = 14,
        body = "I have a suggestion for improvement.",
        date_created=datetime(2023, 9, 6)
    )

    comment16 = Comment(
        article_id = 18,
        user_id = 5,
        body = "I'm not sure if I agree with the conclusion.",
        date_created=datetime(2023, 9, 6)
    )

    comment17 = Comment(
        article_id = 4,
        user_id = 33,
        body = "I appreciate the effort put into this article.",
        date_created=datetime(2023, 9, 6)
    )

    comment18 = Comment(
        article_id = 24,
        user_id = 20,
        body = "I have a question about a specific point.",
        date_created=datetime(2023, 9, 6)
    )

    comment19 = Comment(
        article_id = 7,
        user_id = 47,
        body = "I've bookmarked this for future reference.",
        date_created=datetime(2023, 9, 6)
    )

    comment20 = Comment(
        article_id = 16,
        user_id = 10,
        body = "I'm looking forward to more content from this author.",
        date_created=datetime(2023, 9, 6)
    )

    comment21 = Comment(
        article_id = 11,
        user_id = 31,
        body = "This article is a valuable resource.",
        date_created=datetime(2023, 9, 6)
    )

    comment22 = Comment(
        article_id = 1,
        user_id = 26,
        body = "I'm still trying to wrap my head around this.",
        date_created=datetime(2023, 9, 6)
    )

    comment23 = Comment(
        article_id = 14,
        user_id = 18,
        body = "I have a different interpretation of the data.",
        date_created=datetime(2023, 9, 6)
    )

    comment24 = Comment(
        article_id = 22,
        user_id = 48,
        body = "I think the examples provided are excellent.",
        date_created=datetime(2023, 9, 6)
    )

    comment25 = Comment(
        article_id = 23,
        user_id = 21,
        body = "I've shared this with my colleagues.",
        date_created=datetime(2023, 9, 6)
    )

    comment26 = Comment(
        article_id = 2,
        user_id = 34,
        body = "I'm excited to apply this knowledge in my work.",
        date_created=datetime(2023, 9, 6)
    )

    comment27 = Comment(
        article_id = 3,
        user_id = 1,
        body = "I have a question about the methodology.",
        date_created=datetime(2023, 9, 6)
    )

    comment28 = Comment(
        article_id = 10,
        user_id = 42,
        body = "This article exceeded my expectations.",
        date_created=datetime(2023, 9, 6)
    )

    comment29 = Comment(
        article_id = 6,
        user_id = 38,
        body = "I've learned something new from this.",
        date_created=datetime(2023, 9, 6)
    )

    comment30 = Comment(
        article_id = 17,
        user_id = 15,
        body = "I have a suggestion for future research.",
        date_created=datetime(2023, 9, 6)
    )

    comment31 = Comment(
        article_id = 2,
        user_id = 29,
        body = "I'm not sure I agree with the hypothesis.",
        date_created=datetime(2023, 9, 6)
    )

    comment32 = Comment(
        article_id = 8,
        user_id = 35,
        body = "I've recommended this to my peers.",
        date_created=datetime(2023, 9, 6)
    )

    comment33 = Comment(
        article_id = 20,
        user_id = 22,
        body = "I'm curious about the implications of this.",
        date_created=datetime(2023, 9, 6)
    )

    comment34 = Comment(
        article_id = 15,
        user_id = 17,
        body = "I'm interested in learning more about this.",
        date_created=datetime(2023, 9, 6)
    )

    comment35 = Comment(
        article_id = 21,
        user_id = 46,
        body = "I'm considering incorporating this into my work.",
        date_created=datetime(2023, 9, 6)
    )

    comment36 = Comment(
        article_id = 5,
        user_id = 32,
        body = "I appreciate the thoroughness of the article.",
        date_created=datetime(2023, 9, 6)
    )

    comment37 = Comment(
        article_id = 9,
        user_id = 4,
        body = "I'm excited to dive deeper into this subject.",
        date_created=datetime(2023, 9, 6)
    )

    comment38 = Comment(
        article_id = 13,
        user_id = 13,
        body = "I'm sharing this with my study group.",
        date_created=datetime(2023, 9, 6)
    )

    comment39 = Comment(
        article_id = 19,
        user_id = 39,
        body = "I'd like to see more case studies on this.",
        date_created=datetime(2023, 9, 6)
    )

    comment40 = Comment(
        article_id = 18,
        user_id = 8,
        body = "I have some concerns about the methodology.",
        date_created=datetime(2023, 9, 6)
    )

    comment41 = Comment(
        article_id = 4,
        user_id = 27,
        body = "I've gained valuable insights from this article.",
        date_created=datetime(2023, 9, 6)
    )

    comment42 = Comment(
        article_id = 24,
        user_id = 43,
        body = "I'm considering using this in my research.",
        date_created=datetime(2023, 9, 6)
    )

    comment43 = Comment(
        article_id = 7,
        user_id = 3,
        body = "I have a different perspective on this topic.",
        date_created=datetime(2023, 9, 6)
    )

    comment44 = Comment(
        article_id = 16,
        user_id = 19,
        body = "I'm looking forward to more research on this.",
        date_created=datetime(2023, 9, 6)
    )

    comment45 = Comment(
        article_id = 11,
        user_id = 45,
        body = "I found this to be a valuable resource.",
        date_created=datetime(2023, 9, 6)
    )

    comment46 = Comment(
        article_id = 1,
        user_id = 40,
        body = "I'm still processing the information in this article.",
        date_created=datetime(2023, 9, 6)
    )

    comment47 = Comment(
        article_id = 14,
        user_id = 6,
        body = "I have a different interpretation of the results.",
        date_created=datetime(2023, 9, 6)
    )

    comment48 = Comment(
        article_id = 22,
        user_id = 24,
        body = "I'm applying the concepts from this article.",
        date_created=datetime(2023, 9, 6)
    )

    comment49 = Comment(
        article_id = 23,
        user_id = 50,
        body = "I've recommended this to my colleagues.",
        date_created=datetime(2023, 9, 6)
    )

    comment50 = Comment(
        article_id = 24,
        user_id = 34,
        body = "I'm excited to apply this knowledge in my work.",
        date_created=datetime(2023, 9, 6)
    )

    db.session.add_all([demo, marnie,bobbie,user4,user5,user6,user7,user8,user9,user10,
        user11,user12,user13,user14,user15,user16,user17,user18,user19,user20,
        user21,user22,user23,user24,user25,user26,user27,user28,user29,user30,
        user31,user32,user33,user34,user35,user36,user37,user38,user39,user40,
        user41,user42,user43,user44,user45,user46,user47,user48,user49,user50])

    db.session.add_all([article_1, article_2, article_3, article_4, article_5, article_6,
                        article_7, article_8, article_9, article_10, article_11, article_12,
                        article_13, article_14, article_15, article_16, article_17, article_18,
                        article_19, article_20, article_21, article_22, article_23, article_24]) #vegan, hiking, coding, yoga, traveling, coffee, story-telling, live concerts

    db.session.add_all([comment1, comment2, comment3, comment4, comment5, comment6, comment7,
                        comment8, comment9, comment10, comment11, comment12, comment13, comment14,
                        comment15, comment16, comment17, comment18, comment19, comment20, comment21,
                        comment22, comment23, comment24, comment25, comment26, comment27, comment28,
                        comment29, comment30, comment31, comment32, comment33, comment34, comment35,
                        comment36, comment37, comment38, comment39, comment40, comment41, comment42,
                        comment43, comment44, comment45, comment46, comment47, comment48, comment49, comment50])
    db.session.commit()



def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
