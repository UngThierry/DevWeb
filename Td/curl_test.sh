

# # Adding some users
echo $'\n\n1. Create users\n'

curl  -X PUT -d '{"login":"toto","password":"toto"}' http://localhost:3000/api/users/ --header "Content-Type: application/json" -c cookie-file.txt
curl -X PUT -d '{"login":"jean","password":"toto"}' http://localhost:3000/api/users/ --header "Content-Type: application/json"
curl -X PUT -d '{"login":"jeanne","password":"toto"}' http://localhost:3000/api/users/ --header "Content-Type: application/json"
curl -X PUT -d '{"login":"jacque","password":"toto"}' http://localhost:3000/api/users/ --header "Content-Type: application/json"
curl -X PUT -d '{"login":"pierre","password":"toto"}' http://localhost:3000/api/users/ --header "Content-Type: application/json"
curl -X PUT -d '{"login":"emilie","password":"toto"}' http://localhost:3000/api/users/ --header "Content-Type: application/json"

echo $'\n\n2. Login with user toto\n'
curl  -X POST  -d '{"login":"toto","password":"toto"}' http://localhost:3000/api/users/login --header "Content-Type: application/json" -b cookie-file.txt


# # # Adding friends
echo $'\n\n3. Adding friends to user toto\n'
curl -X PUT -d '{"login":"jean"}' http://localhost:3000/api/friends/ --header "Content-Type: application/json" -b cookie-file.txt
curl -X PUT -d '{"login":"jacque"}' http://localhost:3000/api/friends/ --header "Content-Type: application/json" -b cookie-file.txt
curl -X PUT -d '{"login":"pierre"}' http://localhost:3000/api/friends/ --header "Content-Type: application/json" -b cookie-file.txt
curl -X PUT -d '{"login":"emilie"}' http://localhost:3000/api/friends/ --header "Content-Type: application/json" -b cookie-file.txt
echo $'\n\n4. Request friends of users toto\n'
curl -X POST -d '{}' http://localhost:3000/api/friends/ --header "Content-Type: application/json" -b cookie-file.txt

echo $'\n\n'