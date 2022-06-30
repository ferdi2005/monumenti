# WLM Italia
Applicazione per cercare i monumenti di Wiki Loves Monuments vicino a sé.

* Backend per autenticazione: https://github.com/ferdi2005/monumenti_backend
* Play Store: https://play.google.com/store/apps/details?id=it.wikimedia.wikilovesmonuments
* App Store: https://apps.apple.com/it/app/wiki-loves-monuments-italia/id1522502412
## Ringraziamenti
Grazie di cuore a Michael Gangolf (@m1ga), nonché a tutti i tester dell'applicazione!

## Build
Per fare una build per Android, avendo creato un keystore:
```
appc run -p android -T dist-playstore -K path del keystore -P password del keystore -L it.wikimedia.wikilovesmonuments -O /
open /Users/ferdi2005/Codice/monumenti/build/android/app/build/outputs
```

Per fare una build per iOS, dopo aver seguito [queste istruzioni](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Guide/Preparing_for_Distribution/Distributing_iOS_apps/):
```
ti build --platform ios --deploy-type production --distribution-name "iPhone Distribution: nome del profilo di distribuzione" --keychain --target dist-appstore
```
Sarà poi possibile inviare l'app all'App Store tramite XCode.
## Changelog
Vedi releases su GitHub.

## Contribuire
Ogni contributo è ben accetto! Eventuali suggerimenti per funzionalità sono ben accetti e possono essere inviati in privato all'autore o segnalati come issue.

## Licenza
Quest'app è sviluppata con Appcelerator Titanium, ulteriori informazioni nel file licenza.