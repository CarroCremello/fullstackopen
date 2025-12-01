```mermaid
    sequenceDiagram
        actor user
        participant browser
        participant server

        Note left of browser: SPA is already loaded

        user->>browser: Clicks "Save" in notes form

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        server-->>browser: Saved JSON data
        deactivate server

        browser->>browser: Re-render notes list on the page

```