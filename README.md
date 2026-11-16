# Road to 21K — v2.0

PWA offline-first per allenamento progressivo: camminata, tapis roulant, esercizi di forza e attività outdoor. Installazione tramite GitHub Pages: https://danielenocerino86-afk.github.io/road-to-21k/

## Funzioni
- Piano di 26 settimane, sessioni guidate e timer con tempo trascorso reale
- Check-in fatica, dolore, respiro e recupero; suggerimenti prudenti basati su regole
- Ripetizione manuale delle settimane, giorni completati
- Modalità tapis roulant con velocità personalizzabile
- Biblioteca di sei esercizi con schemi SVG e istruzioni
- GPS outdoor in primo piano, cronologia ed esportazione GPX
- Statistiche di durata, distanza, peso e riepilogo settimanale
- CSV compatibile per importazione dati da fonti esterne, inclusi CSV Huawei convertiti
- Backup JSON completo con trasferimento manuale tra dispositivi
- Notifiche di prova, promemoria tramite calendario ICS

## Limitazioni esplicite
- **Non è disponibile la sincronizzazione diretta Huawei Health**: servono CSV compatibili, eventualmente convertiti. Le esportazioni native ZIP/JSON possono richiedere un adattatore dedicato.
- **Non esiste un backend cloud né sincronizzazione automatica**: backup e ripristino sono manuali.
- **Il coach non è un modello AI generativo**: è un motore locale di suggerimenti basati su regole. Non fornisce diagnosi.
- **GPS e timer**: i browser mobili possono sospendere processi e sensori in background. Non è garantito il tracciamento con schermo spento.
- **Notifiche**: senza backend push non sono disponibili promemoria automatici a browser chiuso. L'ICS consente di importarli nel calendario.
- **Privacy**: dati di salute, peso e percorsi rimangono nel browser locale; backup JSON e GPX sono sensibili e vanno conservati privatamente. Non caricarli sul repository pubblico.
- **Sicurezza**: la corsa non è obbligatoria. Valutazione medica prima di introdurla, soprattutto in presenza di sedentarietà o fattori di rischio. Interrompere l'esercizio in caso di dolore toracico, capogiri, affanno anomalo o dolore che altera il passo.

## Architettura
- `index.html`: app e diario originale
- `enhancements.js`: estensioni v2.0
- `manifest.webmanifest`: installazione PWA
- `sw.js`: cache offline
- `icon.svg`: icona

## Verifiche effettuate
Controlli automatici su sintassi JavaScript, generazione di 26 settimane e sette giorni per settimana, rendering logico delle schermate Extra e inclusione del modulo nella cache offline. **Non costituiscono un collaudo completo su Samsung, Huawei Watch GT 2, GPS reale o GitHub Pages**.

## Smart Routes 3.0
- Suggerimento distanza per la seduta di oggi, basato sulla velocità personale e sui minuti programmati.
- Ricerca di itinerari ad anello/andata-ritorno con routing pedonale esterno (richiede rete e posizione condivisa con il servizio).
- Mappa interattiva OpenStreetMap con anteprima del tracciato (Leaflet via CDN, richiede rete).
- Percorsi preferiti locali, esportazione GPX e avviso sperimentale di uscita dal tracciato quando il GPS è sufficientemente preciso.
- Il motore può preferire marciapiedi e camminamenti, ma **non certifica piste ciclabili, pendenze, illuminazione, accessibilità o sicurezza del percorso**.
- I preferiti non sono ancora inclusi nel backup completo. Navigazione e GPS possono fermarsi a schermo spento. Nessun avviso di svolta garantito.

Test automatici: sintassi JavaScript, rendering logico schermate, 26 settimane, 4 alternative geometriche, distanza punto-segmento e presenza dei controlli. Test su strada, routing live e comportamento Android ancora da eseguire.

## Design 4.0 — Light / Quiet
- Nuovo design system in `design.css`: superfici chiare, tipografia di sistema, pulsanti sobri, layout responsive e riduzione del movimento.
- Navigazione inferiore con stato attivo e attributo `aria-current` in `polish.js`.
- Modulo `intelligence.js`: compatibilità geometrica (non sicurezza), stima delle sovrapposizioni del percorso e campionamento altimetrico tramite Open-Meteo, con gestione dell'indisponibilità dei dati.
- Il dislivello è una stima da punti campionati e non una misura certificata. Il punteggio geometrico **non** classifica la sicurezza di strade, piste ciclabili o marciapiedi.
- La classificazione OSM dettagliata delle infrastrutture, la navigazione GPS in background e la sincronizzazione cloud **non sono ancora implementate**. Richiedono ulteriori integrazioni e test sul dispositivo.
- Test eseguiti: sintassi JS, caricamento logico moduli, viste principali, 26 settimane e scoring geometrico. Restano da verificare rendering visivo su browser reali, routing e API altimetrica in produzione.
