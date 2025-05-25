# psicotaxis

## para aceder ao servidor (usar vpn):
ssh PSI002@appserver.alunos.di.fc.ul.pt

## para iniciar o frontend:
npm start -- --port 3002

## para iniciar o backend:
PORT=3052 npm start

### para aceder à consola do mongo no appserver:
mongosh --username PSI002 --password --authenticationDatabase PSI002 appserver.alunos.di.fc.ul.pt/PSI002