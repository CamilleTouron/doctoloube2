
# Projet DoctoLoube

Il s'agit du service backend pour le projet DoctoLoube. Il permet de gérer les patients, les docteurs, les rendez-vous et les numéros de téléphone. Le service est construit en utilisant Node.js, Express, Prisma et TypeScript.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés :

- **Node.js** (v14 ou version ultérieure)
- **npm** (v6 ou version ultérieure)
- **Prisma CLI** (pour la gestion de la base de données)

Si vous n'avez pas Prisma installé globalement, vous pouvez l'installer avec la commande suivante :

```bash
npm install -g prisma
```

### Cloner le dépôt

Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/CamilleTouron/doctoloube2
cd doctoloube
```

### 1. Installer les dépendances

Exécutez la commande suivante pour installer toutes les dépendances nécessaires :

```bash
npm install
```

### 2. Configurer Prisma

Avant de lancer l'application, vous devez générer le client Prisma et configurer la base de données.

#### Exécuter les migrations Prisma

Exécutez la commande suivante pour créer la base de données et appliquer les migrations :

```bash
npx prisma migrate dev
```

#### Voir les données dans la base de données

```bash
npx prisma studio
```

Cela appliquera le schéma de base de données défini dans `prisma/schema.prisma` et générera les migrations SQL nécessaires.

#### Générer le client Prisma

Après avoir exécuté les migrations, générez le client Prisma :

```bash
npx prisma generate
```

Cela générera le client Prisma qui interagit avec votre base de données.

### 3. Démarrer l'application

Maintenant, vous pouvez démarrer l'application. Exécutez les commandes suivantes pour compiler et démarrer le serveur :

```bash
npm run build   
npm start       
```

Le serveur sera accessible sur `http://localhost:3000` (ou le port que vous avez configuré).

## Endpoints CURL to test

Ci-dessous, les points de terminaison API disponibles pour interagir avec le service. Chaque commande est suivie d'un exemple de commande `curl` pour tester.

### 1. Créer un Nouveau Médecin (POST)

#### Endpoint: `/doctors`
Crée un nouveau médecin dans le système.

**Commande Curl :**

```bash
curl -X POST http://localhost:3000/api/v1/doctors   -H "Content-Type: application/json"   -d '{
    "firstName": "Alice",
    "lastName": "Dupont",
    "job": "Cardiologie"
  }'
```

### 2. Récupérer Tous les Médecins (GET)

#### Endpoint: `/doctors`
Récupère une liste de tous les médecins.

**Commande Curl :**

```bash
curl http://localhost:3000/api/v1/doctors
```

### 3. Récupérer un Médecin par ID (GET)

#### Endpoint: `/doctors/:id`
Récupère un médecin par son ID.

**Commande Curl :**

```bash
curl http://localhost:3000/api/v1/doctors/1
```

### 4. Mettre à Jour un Médecin (PUT)

#### Endpoint: `/doctors/:id`
Met à jour les informations d'un médecin selon son ID.

**Commande Curl :**

```bash
curl -X PUT http://localhost:3000/api/v1/doctors/2   -H "Content-Type: application/json"   -d '{
    "firstName": "Pierre",
    "lastName": "Martin",
    "job": "Médecin généraliste"
  }'
```

### 5. Supprimer un Médecin (DELETE)

#### Endpoint: `/doctors/:id`
Supprime un médecin selon son ID.

**Commande Curl :**

```bash
curl -X DELETE http://localhost:3000/api/v1/doctors/1
```

### 6. Créer un Nouveau Patient (POST)

#### Endpoint: `/patients`
Crée un nouveau patient dans le système.

**Commande Curl :**

```bash
curl -X POST http://localhost:3000/api/v1/patients   -H "Content-Type: application/json"   -d '{
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1980-01-01",
    "doctorId": 1
  }'
```
Penser à changer l'id du docteur par un id existant.

### 7. Récupérer Tous les Patients (GET)

#### Endpoint: `/patients`
Récupère une liste de tous les patients.

**Commande Curl :**

```bash
curl http://localhost:3000/api/v1/patients
```

### 8. Récupérer un Patient par ID (GET)

#### Endpoint: `/patients/:id`
Récupère un patient par son ID.

**Commande Curl :**

```bash
curl http://localhost:3000/api/v1/patients/1
```

### 9. Mettre à Jour un Patient (PUT)

#### Endpoint: `/patients/:id`
Met à jour les informations d'un patient selon son ID.

**Commande Curl :**

```bash
curl -X PUT http://localhost:3000/api/v1/patients/1   -H "Content-Type: application/json"   -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "doctorId": 2
  }'
```
Penser à changer l'id du docteur par un id existant.

### 10. Supprimer un Patient (DELETE)

#### Endpoint: `/patients/:id`
Supprime un patient selon son ID.

**Commande Curl :**

```bash
curl -X DELETE http://localhost:3000/api/v1/patients/1
```
Penser à changer l'id du patient par un id existant.