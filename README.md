Guardian Documentary Cards
========================

A way to autogenerate on-site assets for our documentaries

## Installation

Get dependencies by running `npm install`.

Make sure you have sass installed by running `gem install sass`.

If you don't have them added you'll need to add your s3 keys for the gdn-interactive s3 server to your `~/.aws/credentials` file.

## Usage

* `npm run paths` to output snap paths for the thrashers and cards
* `npm run serve` to serve the json files locally
* `npm run watch` to watch for changes to the `./src` folder
* `npm run deploy` to deploy to the server
