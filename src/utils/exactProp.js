// This module is fork of
// https://github.com/mui-org/material-ui/blob/8bc7d11c9a445de5acbf0de8ec550e3bdd23c565/packages/material-ui/src/utils/exactProp.js
// However, in order to avoid import of @material-ui (e.g. in React Native)
// the module was forked.

/* eslint-disable */

// Only exported for test purposes.
export const specialProperty = 'exact-prop: \u200b';

function exactProp(propTypes) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    return propTypes;
  }

  return {
    ...propTypes,
    // eslint-disable-next-line prefer-arrow-callback
    [specialProperty]: props => {
      const unsupportedProps = Object.keys(props).filter(prop => !propTypes.hasOwnProperty(prop));
      if (unsupportedProps.length > 0) {
        return new Error(
          `The following properties are not supported: ${unsupportedProps
            .map(prop => `\`${prop}\``)
            .join(', ')}. Please remove them.`,
        );
      }
      return null;
    },
  };
}

export default exactProp;
