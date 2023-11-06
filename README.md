# NBA utils

A simple Express server which provides endpoints with some useful data about NBA games. Internally uses [balldontlie API](https://www.balldontlie.io).

## Installation

```
npm install
```

## Running

```
node main.js
```

## Endpoints

```
GET /recent-interesting-games
```

**Description:** returns a list of recently finished games with a small scoring margin.

**Query parameters**:
  - `scoring-margin` - the upper limit of the difference in the score, that is, only those games will be returned in which the absolute scoring margin is less than this value. Default is 10.

**Usage example:**
```
GET /recent-interesting-games?scoring-margin=5

Response:

[
  "Toronto Raptors — San Antonio Spurs, 05.11.2023",
  "Charlotte Hornets — Dallas Mavericks, 05.11.2023"
]
```
