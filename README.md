# Hello Poland React Commons

## Docs
- [Forms](./docs/forms.md)

## Usage
### Redux Logic
All common logic methods have the same name for easier updates. This can be problematic while importing them in the application, as objects cannot be spreaded in the array. To solve this issue `redux-logic` can be initialized in the following way:

```javascript
// services/redux/logic.js
import { parseReduxLogic } from '@hello-poland/commons/utils/redux';
import { logic as profileLogic } from '@hello-poland/commons/redux/profile';
import { logic as sightEventsLogic } from '@hello-poland/commons/redux/sightEvents';
import { logic as sightsLogic } from '@hello-poland/commons/redux/sights';

export default parseReduxLogic({
  profileLogic,
  sightEventsLogic,
  sightsLogic,
});

```

For more details see [createLogicMiddleware](https://github.com/jeffbski/redux-logic/blob/master/docs/api.md#createlogicmiddleware) API description.

## Publishing package
Remember to publish stable packages only from a tagged master branch.

To properly publish package to Nexus repository do the following:

1. Make sure package.json version matched tag version
2. Login to Nexus:
    ```bash
    $ npm login --registry=https://packages.fream.pl/repository/npm-fream/
    ```
3. Publish package
    ```bash
    $ npm run package
    $ npm run distribute
    ```
