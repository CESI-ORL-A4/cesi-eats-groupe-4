import "dotenv/config"
import DBConnection from "./DBConnection"

DBConnection.then(con => {
    console.log("connected", con);
})
