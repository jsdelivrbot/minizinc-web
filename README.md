# Running Locally

Make sure you have [Node.js](http://nodejs.org/)

```sh
$ git clone https://github.com/harryt04/minizinc-web zinc
$ cd zinc
$ npm install
$ npm start
```

`npm install` and `npm start` intuitively install and run both the backend and frontend directories respectively.

# Deploying to Heroku

The frontend heroku app is listening to the master branch of this repo. When you are ready to deploy changes, merge those changes to master and heroku will automatically pick them up.

You can access the heroku app at [https://minizinc.herokuapp.com/](https://minizinc.herokuapp.com/).
