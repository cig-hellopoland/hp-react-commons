# Changelog

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
