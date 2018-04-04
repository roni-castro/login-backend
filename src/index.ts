import appPromise from './App';

const port  = (process.env.PORT || 3000)
appPromise.then(
    app => app.listen(port, function () {
        console.log("Server is Listening")
    })
).catch(err => { throw err; });

