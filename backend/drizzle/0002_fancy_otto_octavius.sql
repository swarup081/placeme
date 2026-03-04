ALTER TABLE "companies" ADD COLUMN "domain" text NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_domain_unique" UNIQUE("domain");