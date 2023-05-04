import { config } from "dotenv";
import populateEnv from "populate-env";

export let env = {
  PORT: 8100,
  DB_NAME: "",
  DB_USER: "",
  DB_PASSWORD: "",
};

config();
populateEnv(env, { mode: "halt" });
