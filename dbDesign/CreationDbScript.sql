CREATE TABLE "Events" (
	"id" serial NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" TEXT NOT NULL,
	"date" DATE NOT NULL,
	"idContact" int NOT NULL,
	CONSTRAINT "Events_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Itineraries" (
	"id" serial NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT "Itineraries_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Images" (
	"id" serial NOT NULL,
	"path" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "Images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Itineraries_Images" (
	"idItinerary" int NOT NULL,
	"idImage" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Events_Images" (
	"idEvent" int NOT NULL,
	"idImage" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "POIs" (
	"id" serial NOT NULL,
	"idContact" int NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" TEXT NOT NULL,
	"opening-hours" TIME NOT NULL,
	"closing-hours" TIME NOT NULL,
	"ticket" real NOT NULL,
	"address" varchar(100) NOT NULL,
	CONSTRAINT "POIs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "POIs_Images" (
	"idPOI" int NOT NULL,
	"idImage" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Tags" (
	"id" serial NOT NULL,
	"tag" varchar(50) NOT NULL,
	CONSTRAINT "Tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Events_Tags" (
	"idEvent" int NOT NULL,
	"idTag" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Itineraries_Tags" (
	"idItinerary" int NOT NULL,
	"idTag" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Service_Points" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" int NOT NULL,
	"opening-hour" TIME NOT NULL,
	"closing-hour" TIME NOT NULL,
	"address" varchar(100) NOT NULL,
	"idContact" int NOT NULL,
	CONSTRAINT "Service_Points_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Host" (
	"idEvent" int NOT NULL,
	"idPOI" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Involve" (
	"idPOI" int NOT NULL,
	"idItinerary" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Contacts" (
	"id" serial NOT NULL,
	"landline-phone" varchar(20),
	"mobile-phone" varchar(20),
	"email" varchar(320),
	CONSTRAINT "Contacts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Service_Types" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"idImage" int NOT NULL,
	CONSTRAINT "Service_Types_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Events" ADD CONSTRAINT "Events_fk0" FOREIGN KEY ("idContact") REFERENCES "Contacts"("id");

ALTER TABLE "Events_Tags" ADD CONSTRAINT "Events_Tags_fk0s" FOREIGN KEY ("idEvent") REFERENCES "Events"("id");
ALTER TABLE "Events_Tags" ADD CONSTRAINT "Events_Tags_fk1s" FOREIGN KEY ("idTag") REFERENCES "Tags"("id");

ALTER TABLE "Itineraries_Tags" ADD CONSTRAINT "Itineraries_Tags_fk0" FOREIGN KEY ("idItinerary") REFERENCES "Itineraries"("id");
ALTER TABLE "Itineraries_Tags" ADD CONSTRAINT "Itineraries_Tags_fk1" FOREIGN KEY ("idTag") REFERENCES "Tags"("id");

ALTER TABLE "Service_Points" ADD CONSTRAINT "Service_Points_fk0" FOREIGN KEY ("type") REFERENCES "Service_Types"("id");
ALTER TABLE "Service_Points" ADD CONSTRAINT "Service_Points_fk1" FOREIGN KEY ("idContact") REFERENCES "Contacts"("id");

ALTER TABLE "Host" ADD CONSTRAINT "Host_fk0" FOREIGN KEY ("idEvent") REFERENCES "Events"("id");
ALTER TABLE "Host" ADD CONSTRAINT "Host_fk1" FOREIGN KEY ("idPOI") REFERENCES "POIs"("id");

ALTER TABLE "Involve" ADD CONSTRAINT "Involve_fk0" FOREIGN KEY ("idPOI") REFERENCES "POIs"("id");
ALTER TABLE "Involve" ADD CONSTRAINT "Involve_fk1" FOREIGN KEY ("idItinerary") REFERENCES "Itineraries"("id");


ALTER TABLE "Service_Types" ADD CONSTRAINT "Service_Types_fk0" FOREIGN KEY ("idImage") REFERENCES "Images"("id");


















