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

The frontend heroku app is listening to the f-deployment branch of this repo. The backend heroku app is listening on b-deployment branch. Merge your feature changes to master when code reviews are complete, then merge to f-deployment and b-deployment respectively. You can access the *frontend* heroku app at [https://minizinc.herokuapp.com/](https://minizinc.herokuapp.com/).
