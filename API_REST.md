# Pourquoi cette API est une API REST ?

## Architecture client-serveur
Cette API permet de mettre à disposition les données de Doctoloube à tout client qui aurait les endpoints. Par exemple, un client pourrait être une application mobile, un site web, un logiciel de gestion de cabinet médical, etc.

## Stateless
Cette API est stateless, c'est-à-dire que chaque requête est indépendante des autres. Cela signifie que le serveur ne garde pas en mémoire l'état du client entre les requêtes. Cela permet de faciliter la scalabilité de l'API.

## Cacheable
Les réponses de l'API sont mises en cache pour améliorer les performances. Par exemple, si un client demande la liste des médecins, le serveur vérifie si la réponse est déjà en cache. Si c'est le cas, le serveur renvoie la réponse en cache au client. Cela permet de réduire la charge sur le serveur et d'améliorer les performances. Si la réponse n'est pas en cache, le serveur génère la réponse et la met en cache pour les prochaines requêtes, pour une durée d'une heure.

## Interface uniforme
Les endpoints de l'API suivent une interface uniforme, basée sur les méthodes HTTP (GET, POST, PUT, DELETE). Par exemple, pour récupérer la liste des médecins, le client envoie une requête GET à l'endpoint `/doctors`. Pour créer un nouveau médecin, le client envoie une requête POST à l'endpoint `/doctors`. La même nomenclature est utilisée pour patients et pour les autres ressources à venir. La nomenclature qui est mise en place est /api/{versio_api}/{ressource}. 