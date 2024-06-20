import app from './app.js';
import { connectToDatabase } from './db/connection.js';
// connections and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
    // if connection is established then only server is going to be start
    app.listen(PORT, () => {
        console.log(`index.js server is running on port ${PORT} and connected to database`);
    });
}).catch((err) => console.log(err)); // if there is an error while connecting to the database it will show the error in console
//# sourceMappingURL=index.js.map