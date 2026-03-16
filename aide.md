
/* API REST:

// permet l'accès aux ressources
-> characters

Type HTTP : GET POST PUT PATCH DELETE

CRUD : Create Read Update Delete

Endpoint par ressource :

/characters

Pour chaque élement du CRUD, on utilise certains types

Create:
- méthode POST /characters

Read :
Récupérer un groupe (tous, ou filtre)
- methode GET /characters      ATTENTION, on peut appliquer des filtres ici.
Récupérer un élement précis et un seul.
- methode GET /characters/:id

Update :
Pour remplacer tout l'élement ayant l'ID recherché
- methode PUT /characters/:id
Pour mettre a jour seulement un morceau de l'élement
- methode PATCH /characters/:id

Delete :
Pour supprimer un élement avec l'ID
- méthode DELETE /characters/:id


Exemple :

/api/v1/characters
/api/v1/species
/api/v1/games

GET /api/v1/games/1250
Je récupère le jeu avec l'id 1250.

On peut utiliser les ressources ensembles.

On récupère tous les perso du jeu avec l'ID 1250
GET /api/v1/games/1250/characters

On récupère tous les perso de l'espèce avec l'id 2 du jeu avec l'id 1250
GET /api/v1/games/1250/characters/species/2
GET /api/v1/games/1250/characters?species=2

*/
