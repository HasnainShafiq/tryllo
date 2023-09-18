const express = require('express');
const path = require('path');
const cors = require("cors");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://Hasnain:KedZek7SLRSfMWKg@cluster0.qgxm3ff.mongodb.net/tryllo?retryWrites=true&w=majority";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);

}

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("build"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app;
