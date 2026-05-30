import app from './app/app.js';

const PORT = process.env.PORT_SERVER || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})