# Landmark Remark

An application that allows users to save location based notes on a map. 

# Requirements..

    - User can see their current location on the map
    - User can save a short note at their current location
    . User can see notes that they have saved at the location they were saved on the map
    - User can see the location, text, and user-name of notes other users have saved
    - User has the ability to search for a note based on contained text or user-name
    
# Implicit Requirements!
    - For accuracy, user should be able to move the marker of the current location
    - User may not be able to pan through the entire map to see all notes at once. Hence, a list view that can be toggled may be required.
    - By clicking a notes on the list, User should be able to navigate to the location of the notes on the map.
    - User should be able to identify notes saved by him and others by a distinguished marker.
    - The current location may be shown with a home like marker.
    - When the user navigates away from the current location they should be able to reach the current location by a single click.
    - Since the requirements involve multiple users, a screen to provide their username (or login credentials) should be given.
    - All the notes are persisted in the backend.
    - Since this is a browser based application and a demo, to avoid negative scenarios like the user doesn't grant location access, or browser fails to detect current location, a static location is provided as a failproof.
    - By default, all the notes of the current user and other users are loaded. If search feature used, then only the notes are filtered. This is reflected in the list view as well.
    
# Technology Stack used

  - Backend 
  Micrisoft ASP.Net 4.5.2, Web API, MSSQL LocalDB, EntityFramework
  - Frontend
  Angular 4.2.5 with ASP.Net Core 2.0 (Microsoft's offical VS Template for Angualar 4)

# Framework & features
  - Backend 
  Generic UnitofWork and Repository Pattern
  NLog for logging
  Unity IoC for Dependency Injection
 Microsoft ASP Identity Core for Authentication and Authorization
Owin OAuth ready for external authentication providers
Coder-First EntityFramework
  
  - Frontend
  Microsoft offical Angular Template
  Server side pre-rendering
  AOT
  Modular approach

# Effort
- Bacekend creating base framework with third party integrations and development
3 hours
- Frontend creating base framework with extended modules, Google maps integration, adding polyfills for IE, designing and development
4.5 hours
- Unit Testing and Functional Testing
1 hour
> Total - 8.5 hours.

# Known issue - Limitations
- Feedback messages for a failed login or registration could be more elaborate - 'Notes is required' validation message shows up by default even before the input is touched in IE. An issue with text input not being pristine in IE 11.
- /ClientAPP/config/app-config.ts has the app and api endpoints to be configured manually.