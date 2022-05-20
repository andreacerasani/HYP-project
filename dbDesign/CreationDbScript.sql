CREATE TABLE "public.Event" (
	"id" serial NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" TEXT NOT NULL,
	"date" DATE NOT NULL,
	"idContact" int NOT NULL,
	CONSTRAINT "Event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Itinerary" (
	"id" serial NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT "Itinerary_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Image" (
	"id" serial NOT NULL,
	"path" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "Image_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Itinerary-Image" (
	"idItinerary" int NOT NULL,
	"idImage" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Event-Image" (
	"idEvent" int NOT NULL,
	"idImage" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.POI" (
	"id" serial NOT NULL,
	"idContact" int NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" TEXT NOT NULL,
	"opening-hours" TIME NOT NULL,
	"closing-hours" TIME NOT NULL,
	"ticket" real NOT NULL,
	"address" varchar(100) NOT NULL,
	CONSTRAINT "POI_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.POI-Image" (
	"idPOI" int NOT NULL,
	"idImage" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Tag" (
	"id" serial NOT NULL,
	"tag" varchar(50) NOT NULL,
	CONSTRAINT "Tag_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Event-Tag" (
	"idEvent" int NOT NULL,
	"idTag" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Itinerary-Tag" (
	"idItinerary" int NOT NULL,
	"idTag" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Service-Point" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" int NOT NULL,
	"opening-hour" TIME NOT NULL,
	"closing-hour" TIME NOT NULL,
	"address" varchar(100) NOT NULL,
	"idContact" int NOT NULL,
	CONSTRAINT "Service-Point_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Host" (
	"idEvent" int NOT NULL,
	"idPOI" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Involve" (
	"idPOI" int NOT NULL,
	"idItinerary" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Contact" (
	"id" serial NOT NULL,
	"landline-phone" varchar(20),
	"mobile-phone" varchar(20),
	"email" varchar(320),
	CONSTRAINT "Contact_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.TypeService" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"idImage" int NOT NULL,
	CONSTRAINT "TypeService_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "public.Event" ADD CONSTRAINT "Event_fk0" FOREIGN KEY ("idContact") REFERENCES "public.Contact"("id");

ALTER TABLE "public.Event-Tag" ADD CONSTRAINT "Event-Tag_fk0" FOREIGN KEY ("idEvent") REFERENCES "public.Event"("id");
ALTER TABLE "public.Event-Tag" ADD CONSTRAINT "Event-Tag_fk1" FOREIGN KEY ("idTag") REFERENCES "public.Tag"("id");

ALTER TABLE "public.Itinerary-Tag" ADD CONSTRAINT "Itinerary-Tag_fk0" FOREIGN KEY ("idItinerary") REFERENCES "public.Itinerary"("id");
ALTER TABLE "public.Itinerary-Tag" ADD CONSTRAINT "Itinerary-Tag_fk1" FOREIGN KEY ("idTag") REFERENCES "public.Tag"("id");

ALTER TABLE "public.Service-Point" ADD CONSTRAINT "Service-Point_fk0" FOREIGN KEY ("type") REFERENCES "public.TypeService"("id");
ALTER TABLE "public.Service-Point" ADD CONSTRAINT "Service-Point_fk1" FOREIGN KEY ("idContact") REFERENCES "public.Contact"("id");

ALTER TABLE "public.Host" ADD CONSTRAINT "Host_fk0" FOREIGN KEY ("idEvent") REFERENCES "public.Event"("id");
ALTER TABLE "public.Host" ADD CONSTRAINT "Host_fk1" FOREIGN KEY ("idPOI") REFERENCES "public.POI"("id");

ALTER TABLE "public.Involve" ADD CONSTRAINT "Involve_fk0" FOREIGN KEY ("idPOI") REFERENCES "public.POI"("id");
ALTER TABLE "public.Involve" ADD CONSTRAINT "Involve_fk1" FOREIGN KEY ("idItinerary") REFERENCES "public.Itinerary"("id");


ALTER TABLE "public.TypeService" ADD CONSTRAINT "TypeService_fk0" FOREIGN KEY ("idImage") REFERENCES "public.Image"("id");


















