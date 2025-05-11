# Top tracks

Repo that deploys an svg to a endpoint using [Vercel](https://vercel.com)

This allows me to display the svg in markdnow files -> displaying it on the github profile page with live updates

<img src="https://top-tracks-omega.vercel.app/api/spotify" width="50%"/>

## Setup

Setting up tools that use the spotify api generically is difficult as to access a users details, you need a specific `CLIENT_ID`, `CLIENT_SECRET` and `CLIENT_REFRESH_TOKEN`

### Using Vercel

To use vercel:

1) Create an account online and link however you prefer

2) Install vercel locally and login `vercel login`

3) Navigate to the appropriate folder and init vercel by running `vercel`

4) Deploy using `vercel --prod` this will make you endpoint live

5) Add the environment variables `CLIENT_ID`, `CLIENT_SECRET` and `CLIENT_REFRESH_TOKEN` in the settings tab of the project on [https://vercel.com](https://vercel.com)

### Using Spotify API

1) Create spotify app in developer account

2) Create a project and but an appropriate redirect url e.g. `localhost:8080`

2) Collect `CLIENT_ID` and `CLIENT_SECRET`

### Collecting refresh token

1) Getting an access token by hitting `https://accounts.spotify.com/authorize?client_id=client_id&response_type=code&redirect_uri=redirect_url3&scope=user-top-read, it will redirect you and you can obtain it from the url on the new page

2) Base 64 encode `client_id:client_secret` 

3) Curl request to swap for the token `curl -X POST https://accounts.spotify.com/api/token -H "Authorization: Basic base_64_encoded_thing"  -d grant_type=authorization_code  -d code=access_code  -d redirect_uri=redirect_url`

4) The address bar will now have the refresh token in it

5) To run locally, run `vercel dev`, and hit `localhost:3000/api/spotify`

If you link your account it should now display your top 5 songs.

