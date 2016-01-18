# suggest-api
A keyword suggestion API based on Node.js

l s'agit d'une API qui vous donnera sous un format séparé par des virgules les 10 suggestions Google Suggest pour un mot clés donné (ou plus selon les paramètres choisis).
L’intérêt de cette API réside dans sa rapidité et son formatage.
L'utilisation est assez simple, vous mettez le mot clés de votre choix dans l'URL et une page se charge avec les mots.
Deux paramètres peuvent être ajoutés pour la récursivité numérique (&TYPE=num) et alphabétique (&TYPE=abc) ainsi qu'une partie "prédictive" (&TYPE=pre)

Sans plus attendre, voici les URLs :
http://duan.fr:1337/sug?KW=blackhat
http://duan.fr:1337/sug?KW=blackhat&TYPE=abc
http://duan.fr:1337/sug?KW=blackhat&TYPE=num
http://duan.fr:1337/sug?KW=blackhat&TYPE=pre

Fonctionnalités futures :
Récursivité numérique : OK
Récursivité alphabétique : OK
Sortie triée par ordre alphabétique/numérique : OK
Ajout de requêtes "prédictives" (_, &) avant et après les mots clés : OK
Ajout des sources Youtube, Google News et Google Image : En cours
Sélection de la langue (actuellement fr_FR uniquement) : En cours
Récursivité alphabétique profonde (ab, ac, ad ...) : En cours
Avoir toutes les sources et récursivités dans un seul paramètre
Ajout de requêtes de suggestions prédéfinies (informationelles et transactionnelles type "acheter", "comment" etc.)
Format de sortie au choix (Json, CSV, XML)
Récursivité des suggestions (avec plusieurs niveaux)
Traitement par lots (possibilité d'envoyer plusieurs mots clés)
Possibilité de filtrer la sortie (contient uniquement/contient pas)
Suggestions multisources

Bug remontés :
Problème de formatage -> oublie de virgules sur les récursivités : OK
Problème de stabilité : OK
Une virgule est présente à la fin de la sortie : OK
Présence de résultats vides (qui engendrent des doubles virgules) : OK
Problème d'encodage depuis fichier excel -> excel n'envoie pas de l'utf-8 à l'app : KO

URL de suivis du projet : http://scripts-seo.com/topic-4822-beta-api-google-suggest-maison-page-1.html
