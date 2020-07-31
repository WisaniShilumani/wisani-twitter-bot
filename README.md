<br />
<p align="center">
  <a href="https://github.com/WisaniShilumani/wisani-twitter-bot">
    <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--q8mBCQBW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/1ykamh5rf8ukqajqqpaq.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Wisani's Twitter Activist Bot</h3>
  <a href="https://twitter.com/wisani_bot">Follow the bot on twitter</a>

  <p align="center">
    Just a twitter bot, doing twitter bot things.
    <br />
    <a href="https://github.com/WisaniShilumani/wisani-twitter-bot"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/WisaniShilumani/wisani-twitter-bot">View Demo</a>
    ·
    <a href="https://github.com/WisaniShilumani/wisani-twitter-bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/WisaniShilumani/wisani-twitter-bot/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About The Project

In 2019, I wanted to build a twitter bot that posted tweets run off a CRON job using firebase.

My criteria:

- Can search tweets from my personal feed and retweet them
- Tweet from a list of tweets from Firebase Realtime Database :smile:

I changed the purpose of the project in July 2020, after realising that I could use this project for activism, particularly - putting GBV on the forefront of The South African's presidency's radar. We have been asking too long for real solutions, and amendments to the law with no avail. Becoming silent preserves the status quo, and we all need to do what we can to not remain silent.

### Built With

- [Firebase](https://firebase.google.com/)
- [Typescript](https://www.typescriptlang.org/)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Creating a twitter bot account

1. Create a new Twitter account (Don't use your own)
2. Create an application on the account

- Use this link: https://developer.twitter.com/en/apps
- Once your application has been created and approved (can take anywhere from 1-5 days) you should be able to manage it.

3. Copy your keys and create an access token and save them somewhere
   In the ‘Application Management’ section, where you will need to take a note of your keys. You should have your ‘Consumer Key (API Key)’ and ‘Consumer Secret (API Secret)’ already available.

You’ll need to scroll to the bottom of the page and click the Create my access token to get the ‘Access Token’ and ‘Access Token Secret’ take note of all four of them you’ll need them when setting up the bot.

#### NB: If you don't want to run the code yourself, but would like to take part - send me a tweet at @wisanishilumani

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

1. NPM

```sh
npm install npm@latest -g
```

### Installation

1. Firebase functions and dependencies

- Navigate into the functions directory `cd functions`
- Install the NPM dependencies `npm i`

2. Firebase config for twitter api keys

- Set up Twitter API Key `firebase functions:config:set twitter.api_key="<TWITTER API KEY>"`
- Set up Twitter API Secret `firebase functions:config:set twitter.api_secret="<TWITTER API KEY SECRET>"`
- Set up Twitter Access Token `firebase functions:config:set twitter.access_token="<TWITTER ACCESS TOKEN>"`
- Set up Twitter Access Token Secret `firebase functions:config:set twitter.access_token_secret="<TWITTER ACCESS TOKEN SECRET>"`

## Usage

Run `firebase deploy`

## Roadmap

See the [open issues](https://github.com/WisaniShilumani/wisani-twitter-bot/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Wisani Shilumani - [@wisanishilumani](https://twitter.com/wisanishilumani) - wshilumani@gmail.com

Project Link: [https://github.com/WisaniShilumani/wisani-twitter-bot](https://github.com/WisaniShilumani/wisani-twitter-bot)
