# psicotaxis

## para aceder ao servidor (usar vpn):
ssh PSI002@appserver.alunos.di.fc.ul.pt

## para iniciar o frontend:
ng serve --port 3002 --host 0.0.0.0 --disableHostCheck true
### ou
ng serve --port 3052 --host 0.0.0.0 --disableHostCheck true

### para aceder à consola do mongo no appserver:
mongosh --username PSI002 --password --authenticationDatabase PSI002 appserver.alunos.di.fc.ul.pt/PSI002