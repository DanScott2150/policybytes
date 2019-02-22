CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (100) UNIQUE,
    "password" VARCHAR (1000),
    "fb_id" VARCHAR(5000),
    "fb_display_name" VARCHAR(1000),
    "fb_picture" VARCHAR (500),
    "email" VARCHAR (500),
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "status" INT
);


CREATE TABLE "contributor" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "bio" VARCHAR(1000),
    "photo_url" VARCHAR(5000)   
);  

CREATE TABLE "topic" (
    "id" SERIAL PRIMARY KEY,
    "topic_title" VARCHAR(100),
    "premise" VARCHAR(1000),
    "common_ground" VARCHAR(1000),
    "published_date" timestamp with time zone default current_timestamp,
    "published" boolean default false,
    "contributor1_id" INT REFERENCES "contributor",
    "contributor2_id" INT REFERENCES "contributor",
    "featured" boolean default false,
    "archive_summary" VARCHAR(5000),
    "archive_date" timestamp with time zone default current_timestamp,
    "icon_url" VARCHAR(5000)
 );
 
 CREATE TABLE "proposal" (
    "id" SERIAL PRIMARY KEY,
    "topic_id" INT REFERENCES "topic" ON DELETE CASCADE,
    "contributor_id" INT REFERENCES "contributor",
    "proposal" VARCHAR(1000)
);

CREATE TABLE "key_claim" (
    "id" SERIAL PRIMARY KEY,
    "topic_id" INT REFERENCES "topic" ON DELETE CASCADE,
    "contributor_id" INT REFERENCES "contributor",
    "claim" VARCHAR(500),
    "claim_order" int
);


CREATE TABLE "stream" (
    "id" SERIAL PRIMARY KEY,
    "key_claim_id" INT REFERENCES "key_claim" ON DELETE CASCADE,
    "contributor_id" INT REFERENCES "contributor",
    "stream_comment" VARCHAR(5000),
    "stream_evidence" VARCHAR(1000),
    "stream_order" INT
);


CREATE TABLE "comments_general" (
    "id" SERIAL PRIMARY KEY,
    "date" timestamp with time zone default current_timestamp,
    "person_id" INT REFERENCES "person",
    "topic_id" INT REFERENCES "topic",
    "comment" VARCHAR(5000),
    "approved" boolean default false,
    "order" VARCHAR(5000),
    "likes" INT,
    "owner" INT,
    "key_claim_id" INT REFERENCES "key_claim",
    "stream_id" INT REFERENCES "stream",
    "proposal_id" INT REFERENCES "proposal"
);

CREATE TABLE "like" ( 
    "id" SERIAL PRIMARY KEY,
    "person_id" INT REFERENCES "person",
    "key_claim_id" INT REFERENCES "key_claim",
    "stream_id" INT REFERENCES "stream",
    "comments_general_id" INT REFERENCES "comments_general",
    "proposal_id" INT REFERENCES "proposal",
     "count" INT
);

CREATE TABLE "love" (
    "id" SERIAL PRIMARY KEY,
    "person_id" INT REFERENCES "person",
    "key_claim_id" INT REFERENCES key_claim,
    "stream_id" INT REFERENCES "stream",
    "comments_general_id" INT REFERENCES "comments_general",
    "proposal_id" INT REFERENCES "proposal"
);

-- INSERT INTO "contributor" ("first_name", "last_name", "bio", "photo_url") 
-- VALUES ('Brad', 'Benjamin', 'Professor at some college', '/assets/headshot1.jpeg'),
-- ('Jane', '', 'Comedian', '/assets/headshot2.jpeg');

--topic
-- INSERT INTO "topic" ("topic_title", "premise", "common_ground", "published", "contributor1_id", "contributor2_id", "featured", "archive_summary", "icon_url") 
-- VALUES ('guns', 'more guns or less guns?', 'people should be able to own', false, 1, 2, false, 'people should be able to own','url'), 
-- ('Taxes', 'Should we raise or lower taxes?', 'Taxes are important for a government to function', false, 1, 2, false, 
-- 'Taxes are important for a government to function','url'),
-- ('Marijuana', 'Legalize or no?', 'It should be addressed', false, 1, 2, false, 'It should be addressed', 'url');

--proposal
-- INSERT INTO "proposal" ("topic_id", "contributor_id", "proposal") 
-- VALUES 
-- (1, 1, 'we should have more guns...'),
-- (1, 2, 'guns should be regulated more'),
-- (2, 1, 'taxes should decrease'),
-- (2, 2, 'taxes should go up'),
-- (3, 1, 'weed should be legal'),
-- (3, 2, 'do not legalize weed');

--key claim
-- INSERT INTO "key_claim" ("topic_id", "contributor_id", "claim", "claim_order") 
-- VALUES 
-- (1, 1,'guns make us safer', 1), 
-- (1, 2,'guns are dangerous', 2), 
-- (2, 1,'decrease taxes because..', 3), 
-- (2, 2,'increase taxes because..', 4), 
-- (3, 1,'Legalize it because..', 5), 
-- (3, 2,'keep it illegal because..', 6);

--stream
-- INSERT INTO "stream" ("key_claim_id", "contributor_id", "stream_comment", "stream_evidence", "stream_order") 
-- VALUES 
-- (1, 1,'regulation for guns not necessary', 'link to some research', 1), 
-- (2, 2,'guns are killing too many people', 'link to some research', 2), 
-- (3, 1,'voodoo economics', 'link to some research', 3), 
-- (4, 2,'raise taxes for infrastructure', 'link to some research', 4), 
-- (5, 1,'criminalizaton of weed doesnt make sense', 'link to some research', 5), 
-- (6, 2,'weed makes people crazy', 'link to some research', 6);

-- --comments general
-- INSERT INTO "comments_general" ("person_id", "topic_id", "comment", "approved") 
-- VALUES 
-- (2, 1, 'I agree with Mike Jones', false), 
-- (3, 2, 'I disagree with Norm McDonald', false),
-- (3, 2, 'Norm makes a good point', false),
-- (2, 3, 'Im interested to hear this opinion', false);

