# Changelog

## 1.17.2
* Fixed incorrect method for gallery image upload.

## 1.17.1
* Changed `p24Statetmen` to `orderId` in `sendTicketsEmail`. 

## 1.17.0
* Added gallery image upload for sights and sight events.

## 1.16.1
* Fixed Sight reducer.

## 1.16.0
* Added Tags reducer.
* Added SightEvents tags actions.
* Fixed incorrect action calls in categories logic.

## 1.15.0
* Added SightEvents categories actions.

## 1.14.0
* Added error clearing capabilities to Sights and SightEvents.
* Added categories reducer.
* Added ticket definitions reducer.

## 1.13.1
* Fixed issue with incorrect date parsing in `extendDateWithEventTime`.

## 1.13.0
* Added booking management reducer.

## 1.12.0
* Added upload cancelling actions to Sights and SightEvents.

## 1.11.0
* Added sight events promotion API support.

## 1.10.1
* Changed MuiPickersDateFnsUtils isValid method implementation to avoid null date errors. 

## 1.10.0
* Added translation API support.

## 1.9.1
* Fixed cart items with 0 quantity.

## 1.9.0
* Added affiliation code support to TicketModal.

## 1.8.0
* Changed search requests methods to GET.
* Updated `npm` dependencies.

## 1.7.0
* Added password changing methods to `profile` duck.

## 1.6.0
* Method `getTicketPoolById` from `TicketModalController` is publicly available to it's children.
* Added `wholeDay` to cart entry.

## 1.5.0
* Added Stop Sell functionality to Ticket Pools

## 1.4.0
* Added `getAvailablePoolTicketsQty` to `TicketModalController`.
* Added `getTicketAvailabilityText` to `TicketModalController`.

## 1.3.0
* Added minimal supported node (8.15.0) and npm (6.4.1) versions.

## 1.2.0
* Added PDF deletion methods to `sightEvents` duck.

## 1.1.1
* Updated JSDoc

## 1.1.0
* Added news reducer and logic

## 1.0.4
* Fixed ticket pool id no being saved after selecting day in calendar.

## 1.0.3
* Fixed `clearCartLogic` in `cart` duck.

## 1.0.2
* Fixed `getInitialActiveStep` logic in TicketModalController.

## 1.0.1
* Fixed date parsing in `TicketModalControler` and `pool-parser` utils

## 1.0.0
* Refactored cart

## 0.9.0
* Added PDF uplaod actions in `sightEvents` reducer.

## 0.8.0
* Added main image actions in `sights` and `sightEvents` reducers.

## 0.7.8
* Fixed incorrect time passed to cyclic events in TicketModalController

## 0.7.7
* Refactor `getCyclicPoolDefinitionsAsDates`.
* Add `isDateAvailableInPool` to ticket-pool-parser.

## 0.7.6
* Fix `TicketModalController` logic for single ticket pool instance with no available tickets.

## 0.7.5
* Fix `getPoolDefinitionsAsDates` is passing options to `getSinglePoolDefinitionsAsDates` and `getCyclicPoolDefinitionsAsDates`.

## 0.7.4
* Fix `sightEvents` duck to reset `availableTickets` property after fetching other sightEvent item. 

## 0.7.3
* Fix `TicketModalController` to pass date wihtout hours when calling  `fetchAvailableTickets`.
* Fix `TicketModalController` to set `isFetching` to false on `fetchAvailableTickets` failure. 

## 0.7.2
* Fix `TicketModalController` to pass proper date to `fetchAvailableTickets` on mounting.

## 0.7.1
* Added `TicketModalStoreConnector`, which uses `TicketModalController` internally and should replace it for end user.
* Patched `TicketModalController`.
* Changed cart data model, added new actions and selectors.
* Added available tickets fetching functionality to `sightEvents` duck.
* Fixes and improvements for `ticket-pool-parser` utils.

See https://git.fream.pl/hello-poland/hellopoland-react-commons/merge_requests/51 for more info.

## 0.6.2
* Added `start` option to `getClosestEventDate` 
* Changed `getClosestEventDate` to fix issue with incorrect hours

## 0.6.1
* Added `getClosestEventDate` and `getPoolDefinitionsAsDates` to `ticket-pool-parser`
* Changed some `ticket-pool-parser` tests

## 0.6.0

* Added `ticket-pool-parser` utils

## 0.5.3
* Update `babel` to stable `7.0.0` version

## 0.5.2
* Lock `babel` version in package.json to 7.0.0-beta.54

## 0.5.1
* Use `@babel/plugin-transform-runtime` to transpile files properly

## 0.5.0
* Changed all ducks to match new duck convention
  * All ducks have new request methods arguments list
  * Added `onFailure` and `onSuccess` callbacks to request actions
  * Changed logic function names to more general ones, so they will have to be manually converted to an array before applying to `store`:

    ```javascript
    // services/redux/logic.js
    import { logic as profileLogic } from '@hello-poland/commons/redux/profile';
    import { logic as sightEventsLogic } from '@hello-poland/commons/redux/sightEvents';
    import { logic as sightsLogic } from '@hello-poland/commons/redux/sights';
    
    export default Object.values({
      profileLogic,
      sightEventsLogic,
      sightsLogic,
    }).reduce((acc, obj) => [...acc, ...Object.values(obj)], []);

    ```
* Added `order` duck test suite
* Added `verify` script to `package.json`
* Added redux utils in `utils/redux.js`

## 0.4.5
* Use `@babel/plugin-transform-runtime` to transpile files properly

## 0.4.4
* Added `tickets` duck

## 0.4.3
* Added `TicketModalController` component

## 0.4.2
* Changed `TicketPoolDefinitions` list fetching action to one from `SightEvents` duck.

## 0.4.1
* Set default initial state `profile` key to empty object in `profile` duck

## 0.4.0
* Fixed `profile` duck to get tokens from store automatically when calling `logout` action:
  ```diff
  - logout({ accessToken, refreshToken })
  + logout()
  ```
* Changed `login` action signature:
  ```diff
  - login(data, options)
  + login({ data, options })
  ```
* Added `onSuccess` callback to `logout` action for performing side-effects:
  ```js
  logout({ onSuccess: () => Router.push('/login') });
  ```
* Added `onSuccess` callback to `login` action for performing side-effects:
  ```js
  login({ onSuccess: () => Router.push('/') });
  ```
* Added `profileSubscriber` redux service
* Added `order` duck
* Added `Forms` docs
* Added `yupLocalePl` util

## 0.3.2
* Fixed `ticketPoolDefinitions` duck

## 0.3.0
* Added `ticketPoolDefinitions` duck
* Changed `sights` and `sightEvents` ducks by adding `apiURL`

## 0.2.0
* Added `MuiPickersDateFnsUtils` for date-fns v1
* Added `Counter` component

## 0.1.7
* Add source maps
* Cancel request when `clearItem` is called (in `sights` and `sightEvents` ducks)

## 0.1.6
### Changes
* Updated npm pubishing scripts
* Fixed reducer's bugs
* Changed default errors to null
* Added CHANGELOG
* Renamed `ticketPoolParcer` to `ticketPoolParser`
* Added `cart.js` and `tickets.commons.js` 
* Added `getTotalPrice` selector to `cart` duck

## 0.1.5
### Changes
* Added ticket pool parser

## 0.1.4
### Changes
* Simplified npm package structure
* Added publishing info in README
* Added default initial state to profile reducer

## 0.1.3
### Changes
* Added default initial states to reducers
* Updated dependencies

## 0.1.2
### Changes
* Added npm publishing scripts

## 0.1.1
### Changes
* Normalized reducer's APIs

## 0.1.0
Initial package release
