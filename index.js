const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;

const {
  API_VERSION,
  IP_SERVER,
  BD_USERNAME,
  // PORT_DB,
  BD_PASSWORD,
  BD_NAME,
} = require("./config");

// mongoose.set("useFindAndModify", false);
mongoose.connect(
  `mongodb+srv://${BD_USERNAME}:${BD_PASSWORD}@cluster.ralzs.mongodb.net/${BD_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("la conexión ha sido un éxito");
      app.listen(port, () => {
        console.log("##############");
        console.log("### API REST ##");
        console.log("##############");
        console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
      });
    }
  }
);
