import config from "@config/config";
import app from "@root/app";

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} [${config.nodeEnv} mode].`);
});
