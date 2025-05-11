
Using vercel

1) Install vercel and login `vercel login`

2) init vercel `vercel`

3) create spotify app in devloper account and collect client_id and client_secret


Gte refresh token by:

1) getting an access token by hittig `https://accounts.spotify.com/authorize?client_id=client_id&response_type=code&redirect_uri=redirect_url3&scope=user-top-read

2) base 64 encoding client_id:client_secret 

3) then doing the curl request `curl -X POST https://accounts.spotify.com/api/token -H "Authorization: Basic base_64_encoded_thing"  -d grant_type=authorization_code  -d code=access_code  -d redirect_uri=redirect_url`

4) from here you can get the refresh token

5) vercel dev, hit localhost:3000/api/spotify