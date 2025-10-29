curl -X POST http://localhost:53000/player/register \
  -H "Content-Type: application/json" \
  -d '{"login_id":"tutan","name":"ツタンカーメン","password":"passpasspass"}'

curl -X POST http://localhost:53000/player/login \
  -H "Content-Type: application/json" \
  -d '{"login_id":"tutan","password":"passpasspass"}'