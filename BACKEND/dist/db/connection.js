import { connect, disconnect } from "mongoose";
// import { basename } from "node:path/win32";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
        //connect is mongoose in buit function use to establish connection to database
        //process is node 's built-in object that allows access to the environment variables
    }
    catch (error) {
        console.log(error);
        throw new Error("failed to connect to mongodb");
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
        // disconnect is an in built function of mongoose to disconnect from data base
    }
    catch (error) {
        console.log(error);
        throw new Error("failed to disconnect from mongodb");
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map