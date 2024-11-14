CREATE TABLE IF NOT EXISTS "block_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reason" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"block_duration" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_login_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"success" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"method" text NOT NULL,
	"login_time" integer NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recover_password_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"success" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"recovery_time" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_registration_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"success" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"method" text NOT NULL,
	"registration_time" integer NOT NULL,
	"location" text NOT NULL
);
