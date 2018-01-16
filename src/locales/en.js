// @flow

export default {
  number: {
    format: {
      strip_insignificant_zeros: true,
      delimiter: '',
    },
    currency: {
      format: {
        format: '%u%n',
      },
    },
  },

  ALL$_LOADING_ERROR: 'Something went wrong. Please try again later.',

  START$_EMPTY_LIST: 'There is no items to show.',
};
