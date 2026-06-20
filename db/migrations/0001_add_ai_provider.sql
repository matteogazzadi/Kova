CREATE TYPE "public"."ai_provider" AS ENUM('anthropic', 'openai', 'google');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "first_name" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "last_name" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "ai_provider" "ai_provider";--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "ai_api_key_encrypted" text;
