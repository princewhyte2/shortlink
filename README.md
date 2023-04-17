## Description

ShortLink is a URL shortening service where you enter a URL such as https://indicina.co and it
returns a short URL such as http://short.est/GeAi9K. Visiting the shortened URL should redirect
the user to the long URL. Using the example above, visiting http://short.est/GeAi9K should
redirect the user to https://indicina.co.

## Tools

since most people would use bare express for the node.js task I chose to use nest
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
[Node.js] library for running server side javascript

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

I intentionally commented the last 2 test cases.
Although they are functional, but due to the dynamic nature of the url I chose to comment it inother to avoid more complexity.
```

## App Usage

After starting the server you can visit

```bash
$ http://localhost:3000/doc
```

should you host the url service ensure the BASE_URL constant is changed to reflect the update. in future ENV file will be used.

which is the swagger documentation endpoint to view all supported routes and it's configurations

For encoding the url, since the purpose of this project is just for basics, I'm using the base64 library for encoding the url map size , as this will make the url easy to memorize. After i'm not expecting more than 10 use cases (lol).

All url is saved in memory please note.

## Support

If you have any questions, bugs or suggestions feel free to reach out to me

## Stay in touch

- Author - [Prince whyte Dabotubo](https://www.linkedin.com/in/princewhyte2)

## License

Nest is [MIT licensed](LICENSE).

# shortlink
