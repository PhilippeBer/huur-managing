## README for huur-managing

## Project Overview

**PROJECT:** New Script Project (Google Sheet)
**NOTES:** PROJECTPLAN (voor Vibesheet.ai scriptbuilder)

### 1) Doel en scope

**Doel:** Huuradministratie voor Belgische eigendommen in EUR (geen btw), met de volgende functionaliteiten:

*   Genereren van huurcontracten en maandelijkse termijnen (charges) handmatig via de zijbalk, direct zonder prompt.
*   Manueel boeken van betalingen.
*   Direct toewijzen van betalingen of later matchen via een apart scherm.
*   Een materieel "Te-bewaken" overzicht van openstaande posten, inclusief archivering en een instelbare archiveringswachttijd.
*   Een basisdashboard en manuele maandafsluiting (reconciliatie).

**Buiten de scope van de MVP:**

*   E-mails
*   PDF-generatie
*   QR-codes/SEPA-integratie
*   Bankimport
*   BTW-berekening

### 2) Doelgebruikers en rollen

*   **Eigenaar/Beheerder:**
    *   Ziet het dashboard.
    *   Beheert systeeminstellingen.
    *   Voert de initi?le setup uit.
    *   Genereert termijnen.
    *   Archiveert openstaande posten.
*   **Medewerker:**
    *   Boekt betalingen.
    *   Matcht betalingen met huurcontracten.
    *   Update de "Te-bewaken" lijst.
*   **Boekhouding (optioneel):**
    *   Bekijkt rapporten en de maandafsluiting.

### 3) Succescriteria (acceptatie)

*   Termijnen worden direct aangemaakt via de zijbalk. Er worden geen duplicaten gegenereerd per combinatie van huurcontract en periode.
*   De "Undo" functie werkt correct en voorkomt het overschrijven van bestaande toewijzingen of aanpassingen.
*   Betalingen kunnen worden geboekt en toegewezen (direct of later) met correcte updates van het openstaande saldo.
*   De automatische toewijzing verdeelt de huur eerst en respecteert de resterende bedragen.
*   De "Te-bewaken" lijst toont alle vervallen openstaande posten, bevat de mogelijkheid om notities toe te voegen en checkboxes, en archiveert posten na de ingestelde wachttijd (met een bevestiging bij het verlagen van de wachttijd).
*   De reconciliatie en het dashboard tonen consistente totale bedragen.

### 4) Architectuur en projectbestanden (Apps Script + Sheets)

**Menubalk:** "Rent Manager BE"
*   Opent de zijbalk.
*   Ververst de "Te-bewaken" lijst.
*   Start de maandafsluiting.
*   Controleert de instellingen.

**Zijbalk (Tabs):**

*   Dashboard
*   Termijnen
*   Betalingen
*   Matchen
*   Te-bewaken
*   Instellingen
*   Admin

**Bestanden (Apps Script project):**

*   `Core.gs`: Bevat de menubalk, entrypoints en LockService voor concurrency control.
*   `Setup.gs`: Bevat de initi?le setup code om tabs, kolommen, datavalidaties en named ranges aan te maken.
*   `DataModel.gs`: Bevat helperfuncties voor CRUD-operaties, ID-generatie en zoek-/indexfuncties.
*   `Charges.gs`: Bevat logica voor het genereren van termijnen en het bijwerken van de status en het resterende bedrag.
*   `Payments.gs`: Bevat functionaliteit voor het boeken van betalingen, de automatische en handmatige toewijzing, en het genereren van credits/refunds.
*   `Matching.gs`: Bevat logica voor het genereren van suggesties en heuristiek bij het matchen van betalingen (zonder externe referentie).
*   `Watchlist.gs`: Bevat functionaliteit voor het toevoegen/bijwerken van posten in de "Te-bewaken" lijst, het archiveren met vertraging en het bevestigen bij het verlagen van de archiveringswachttijd.
*   `Settings.gs`: Bevat functionaliteit voor het lezen en schrijven van instellingen, validatie van gegevens en een logboek van wijzigingen (SettingsLog).
*   `Reconcile.gs`: Bevat de logica voor de maandafsluiting (reconciliatie).
*   `UI_Sidebar.html`: De container HTML voor de zijbalk.
*   `UI_Tabs/*.html`: HTML-bestanden voor elke tab in de zijbalk.
*   `UI_Scripts.js`: JavaScript-code voor `google.script.run`-aanroepen en het beheren van de UI-status.
*   `UI_Styles.css`: CSS-bestanden voor de styling van de UI.
*   `appsscript.json`: Het configuratiebestand voor de Apps Script project.

**Scopes:**

*   `spreadsheets`: Toegang tot Google Sheets.
*   `script.container.ui`: Toegang tot de gebruikersinterface van Apps Script.
*   `userinfo.email`: Toegang tot de e-mail van de gebruiker.

### 5) Automatische setup (Sheet-creatie)

Bij de eerste uitvoering van het script of wanneer "Instellingen controleren" wordt uitgevoerd:

*   Er worden alle benodigde tabs aangemaakt in de spreadsheet in de volgende volgorde: `Settings`, `Properties`, `Tenants`, `Leases`, `Charges`, `Payments`, `Allocations`, `Adjustments`, `Te-bewaken`, `Te-bewaken Archief`, `ContactLog`, `Dashboard`, `SettingsLog`, `ChargesLog`.
*   Er worden kolomkoppen geschreven, datavalidaties ingesteld en named ranges aangemaakt.
*   Systematische kolommen worden beveiligd, terwijl handmatige kolommen bewerkbaar blijven.
*   De configuratie is triggerloos en genereert geen geplande termijngeneratie.

### 6) Datastructuur (tabs, kolommen en types)

**Settings Tab:**

| Sleutel                   | Type   | Beschrijving                                     |
| :------------------------ | :----- | :---------------------------------------------- |
| `Valuta`                  | Text   | Standaard valuta (EUR)                           |
| `CommunicationsEnabled`    | Boolean | Activering van eventuele communicatiefuncties   |
| `ReferenceMode`           | Text   | Type referentie (bijv. RF, OGM)                 |
| `ArchiveDelayDays`        | Number | Aantal dagen voordat posten worden gearchiveerd |
| `Standaard toegewezen aan` | Dropdown| Teamleden waar termijnen standaard aan worden toegewezen |

**Tenants Tab:** (Niet gedetailleerd, maar bevat waarschijnlijk eigendomsinformatie)

**Leases Tab:**

| Kolomnaam        | Type     | Beschrijving                      |
| :--------------- | :------- | :------------------------------- |
| Lease ID         | Number   | Unieke identificatie van de lease |
| Eigenaar         | Text     | Naam van de eigenaar             |
| Adres            | Text     | Adres van het pand                |
| Huurprijs        | Number   | Maandelijkse huurprijs            |
| Startdatum       | Date     | Startdatum van de lease          |
| Einddatum         | Date     | Einddatum van de lease            |

**Charges Tab:**

| Kolomnaam       | Type     | Beschrijving                     |
| :-------------- | :------- | :------------------------------ |
| Charge ID       | Number   | Unieke identificatie van de charge |
| Lease ID        | Number   | Verwijzing naar de Lease         |
| Periode         | Text     | Periode waarvoor de charge geldt |
| Bedrag          | Number   | Bedrag van de charge            |
| Status          | Text     | Status van de charge (bijv. open, betaald, gearchiveerd) |
| Betaald Datum   | Date     | Datum waarop de charge is betaald |

**Payments Tab:**

| Kolomnaam     | Type     | Beschrijving                 |
| :------------ | :------- | :-------------------------- |
| Payment ID    | Number   | Unieke identificatie van de betaling |
| Lease ID      | Number   | Verwijzing naar de Lease    |
| Periode       | Text     | Periode waarvoor de betaling geldt |
| Betaald Bedrag | Number   | Betaald bedrag              |
| Betaald Datum | Date     | Datum van de betaling         |
| Notities      | Text     | Eventuele notities           |
| Toewijzing    | Text     | ID van de gezochte charge   |

**Watchlist Tab:**

| Kol