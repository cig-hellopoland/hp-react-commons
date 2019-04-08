import format from 'date-fns/format';
import reducer, {
  actions,
  apiURL,
  name,
  selectors,
  types,
  defaultInitialState,
} from './sightEvents';


/*
 * Initial state
 */

const initialState = {
  error: null,
  item: null,
  list: null,
  availableTickets: null,
};

const appState = {
  config: {},
  [name]: initialState,
};

function onFailure() {}
function onSuccess() {}

const axiosResponseError = {
  data: {
    a: 1,
  },
  status: 500,
};


/*
 * Helper functions
 */

function generateState(data) {
  return {
    ...initialState,
    ...data,
  };
}

function generateAppState(data) {
  return {
    ...appState,
    [name]: {
      ...generateState(data),
    },
  };
}


/*
 * Tests
 */

describe('actions', () => {
  describe('using changeDefaultTranslation', () => {
    it('should create an action with request payload', () => {
      const { changeDefaultTranslation } = actions;
      const { CHANGE_DEFAULT_TRANSLATION } = types;
      const id = 3;
      const options = {
        headers: {
          'Content-Language': 'pl-PL',
        },
      };
      const expectedValue = {
        type: CHANGE_DEFAULT_TRANSLATION,
        payload: {
          url: `${apiURL}/${id}/defaultLanguage`,
          method: 'patch',
          ...options,
        },
      };
      expect(changeDefaultTranslation({ id, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(changeDefaultTranslation({
        id, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { changeDefaultTranslationFailure } = actions;
      const { CHANGE_DEFAULT_TRANSLATION_FAILURE } = types;

      const expectedValue = {
        type: CHANGE_DEFAULT_TRANSLATION_FAILURE,
        error: {},
      };

      expect(changeDefaultTranslationFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(changeDefaultTranslationFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { changeDefaultTranslationSuccess } = actions;
      const { CHANGE_DEFAULT_TRANSLATION_SUCCESS } = types;
      const expectedValue = {
        type: CHANGE_DEFAULT_TRANSLATION_SUCCESS,
      };

      expect(changeDefaultTranslationSuccess()).toEqual(expectedValue);
    });
  });

  describe('using changePromotion', () => {
    it('should create an action with request payload', () => {
      const { changePromotion } = actions;
      const { CHANGE_PROMOTION } = types;
      const pathParams = { promotion: 3 };
      const id = 5;
      const expectedValue = {
        type: CHANGE_PROMOTION,
        payload: {
          url: `${apiURL}/${id}/promotion/${pathParams.promotion}`,
          method: 'patch',
        },
      };
      expect(changePromotion({ id, pathParams })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(changePromotion({
        id, pathParams, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { changePromotionFailure } = actions;
      const { CHANGE_PROMOTION_FAILURE } = types;

      const expectedValue = {
        type: CHANGE_PROMOTION_FAILURE,
        error: {},
      };

      expect(changePromotionFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(changePromotionFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { changePromotionSuccess } = actions;
      const { CHANGE_PROMOTION_SUCCESS } = types;
      const expectedValue = {
        type: CHANGE_PROMOTION_SUCCESS,
      };

      expect(changePromotionSuccess()).toEqual(expectedValue);
    });
  });

  describe('using clear', () => {
    it('should create an action to clear available tickets from state', () => {
      const { clearAvailableTickets } = actions;
      const { CLEAR_AVAILABLE_TICKETS } = types;
      const expectedValue = {
        type: CLEAR_AVAILABLE_TICKETS,
      };

      expect(clearAvailableTickets()).toEqual(expectedValue);
    });

    it('should create an action to clear item from state', () => {
      const { clearItem } = actions;
      const { CLEAR_ITEM } = types;
      const expectedValue = {
        type: CLEAR_ITEM,
      };

      expect(clearItem()).toEqual(expectedValue);
    });

    it('should create an action to clear search results from state', () => {
      const { clearSearchResults } = actions;
      const { CLEAR_SEARCH_RESULTS } = types;
      const expectedValue = {
        type: CLEAR_SEARCH_RESULTS,
      };

      expect(clearSearchResults()).toEqual(expectedValue);
    });
  });

  describe('using createItem', () => {
    it('should create an action with request payload', () => {
      const { createItem } = actions;
      const { CREATE_ITEM } = types;
      const data = { a: 1 };
      const options = { b: 2 };
      const expectedValue = {
        type: CREATE_ITEM,
        payload: {
          url: apiURL,
          method: 'post',
          data,
        },
      };

      expect(createItem({ data })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(createItem({ data, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(createItem({
        data, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { createItemFailure } = actions;
      const { CREATE_ITEM_FAILURE } = types;
      const expectedValue = {
        type: CREATE_ITEM_FAILURE,
        error: {},
      };

      expect(createItemFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(createItemFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { createItemSuccess } = actions;
      const { CREATE_ITEM_SUCCESS } = types;
      const data = { a: 1 };
      const expectedValue = {
        type: CREATE_ITEM_SUCCESS,
        data,
      };

      expect(createItemSuccess(data)).toEqual(expectedValue);
    });
  });

  describe('using createMainImage', () => {
    it('should create an action with request payload', () => {
      const { createMainImage } = actions;
      const { CREATE_MAIN_IMAGE } = types;
      const id = 1;
      const data = 'omfrefiywuyuwef';
      const options = {
        a: 1,
        headers: {
          b: 2,
        },
      };
      const expectedValue = {
        type: CREATE_MAIN_IMAGE,
        payload: {
          url: `${apiURL}/${id}/mainImage`,
          method: 'put',
          headers: {
            'content-type': 'image/jpeg',
          },
          data,
        },
      };

      expect(createMainImage({ id, data })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
        headers: {
          ...expectedValue.payload.headers,
          ...options.headers,
        },
      };

      expect(createMainImage({ id, data, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(createMainImage({
        id, data, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { createMainImageFailure } = actions;
      const { CREATE_MAIN_IMAGE_FAILURE } = types;
      const expectedValue = {
        type: CREATE_MAIN_IMAGE_FAILURE,
        error: {},
      };

      expect(createMainImageFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(createMainImageFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { createMainImageSuccess } = actions;
      const { CREATE_MAIN_IMAGE_SUCCESS } = types;
      const expectedValue = {
        type: CREATE_MAIN_IMAGE_SUCCESS,
      };

      expect(createMainImageSuccess()).toEqual(expectedValue);
    });
  });

  describe('using createPDF', () => {
    it('should create an action with request payload', () => {
      const { createPDF } = actions;
      const { CREATE_PDF } = types;
      const id = 1;
      const data = 'omfrefiywuyuwef';
      const options = {
        a: 1,
        headers: {
          b: 2,
        },
      };
      const expectedValue = {
        type: CREATE_PDF,
        payload: {
          url: `${apiURL}/${id}/pdf`,
          method: 'post',
          headers: {
            'content-type': 'application/pdf',
          },
          data,
        },
      };

      expect(createPDF({ id, data })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
        headers: {
          ...expectedValue.payload.headers,
          ...options.headers,
        },
      };

      expect(createPDF({ id, data, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(createPDF({
        id, data, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { createPDFFailure } = actions;
      const { CREATE_PDF_FAILURE } = types;
      const expectedValue = {
        type: CREATE_PDF_FAILURE,
        error: {},
      };

      expect(createPDFFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(createPDFFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { createPDFSuccess } = actions;
      const { CREATE_PDF_SUCCESS } = types;
      const expectedValue = {
        type: CREATE_PDF_SUCCESS,
      };

      expect(createPDFSuccess()).toEqual(expectedValue);
    });
  });

  describe('using createTranslation', () => {
    it('should create an action with request payload', () => {
      const { createTranslation } = actions;
      const { CREATE_TRANSLATION } = types;
      const data = { a: 1 };
      const options = { b: 2 };
      const expectedValue = {
        type: CREATE_TRANSLATION,
        payload: {
          url: apiURL,
          method: 'post',
          data,
        },
      };

      expect(createTranslation({ data })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(createTranslation({ data, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(createTranslation({
        data, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { createTranslationFailure } = actions;
      const { CREATE_TRANSLATION_FAILURE } = types;
      const expectedValue = {
        type: CREATE_TRANSLATION_FAILURE,
        error: {},
      };

      expect(createTranslationFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(createTranslationFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { createTranslationSuccess } = actions;
      const { CREATE_TRANSLATION_SUCCESS } = types;
      const data = { a: 1 };
      const expectedValue = {
        type: CREATE_TRANSLATION_SUCCESS,
        data,
      };

      expect(createTranslationSuccess(data)).toEqual(expectedValue);
    });
  });

  describe('using deleteItem', () => {
    it('should create an action with request payload', () => {
      const { deleteItem } = actions;
      const { DELETE_ITEM } = types;
      const id = 1;
      const options = { b: 2 };
      const expectedValue = {
        type: DELETE_ITEM,
        payload: {
          url: `${apiURL}/${id}`,
          method: 'delete',
        },
      };

      expect(deleteItem({ id })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(deleteItem({ id, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(deleteItem({
        id, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { deleteItemFailure } = actions;
      const { DELETE_ITEM_FAILURE } = types;
      const expectedValue = {
        type: DELETE_ITEM_FAILURE,
        error: {},
      };

      expect(deleteItemFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(deleteItemFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { deleteItemSuccess } = actions;
      const { DELETE_ITEM_SUCCESS } = types;
      const expectedValue = {
        type: DELETE_ITEM_SUCCESS,
      };

      expect(deleteItemSuccess()).toEqual(expectedValue);
    });
  });

  describe('using deletePDF', () => {
    it('should create an action with request payload', () => {
      const { deletePDF } = actions;
      const { DELETE_PDF } = types;
      const id = 1;
      const options = { b: 2 };
      const expectedValue = {
        type: DELETE_PDF,
        payload: {
          url: `${apiURL}/${id}/pdf`,
          method: 'delete',
        },
      };

      expect(deletePDF({ id })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(deletePDF({ id, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(deletePDF({
        id, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });


    it('should create an action for failed request', () => {
      const { deletePDFFailure } = actions;
      const { DELETE_PDF_FAILURE } = types;
      const expectedValue = {
        type: DELETE_PDF_FAILURE,
        error: {},
      };

      expect(deletePDFFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(deletePDFFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { deletePDFSuccess } = actions;
      const { DELETE_PDF_SUCCESS } = types;
      const expectedValue = {
        type: DELETE_PDF_SUCCESS,
      };

      expect(deletePDFSuccess()).toEqual(expectedValue);
    });
  });

  describe('using deletePromotion', () => {
    it('should create an action with request payload', () => {
      const { deletePromotion } = actions;
      const { DELETE_PROMOTION } = types;
      const id = 1;
      const options = { b: 2 };
      const expectedValue = {
        type: DELETE_PROMOTION,
        payload: {
          url: `${apiURL}/${id}/promotion`,
          method: 'delete',
        },
      };

      expect(deletePromotion({ id })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(deletePromotion({ id, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(deletePromotion({
        id, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });


    it('should create an action for failed request', () => {
      const { deletePDFFailure } = actions;
      const { DELETE_PDF_FAILURE } = types;
      const expectedValue = {
        type: DELETE_PDF_FAILURE,
        error: {},
      };

      expect(deletePDFFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(deletePDFFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { deletePDFSuccess } = actions;
      const { DELETE_PDF_SUCCESS } = types;
      const expectedValue = {
        type: DELETE_PDF_SUCCESS,
      };

      expect(deletePDFSuccess()).toEqual(expectedValue);
    });
  });

  describe('using deleteTranslation', () => {
    it('should create an action with request payload', () => {
      const { deleteTranslation } = actions;
      const { DELETE_TRANSLATION } = types;
      const id = 1;
      const pathParams = { languageVersion: 'pl-PL' };
      const options = { b: 2 };
      const expectedValue = {
        type: DELETE_TRANSLATION,
        payload: {
          url: `${apiURL}/${id}/languageVersion/${pathParams.languageVersion}`,
          method: 'delete',
        },
      };

      expect(deleteTranslation({ id, pathParams })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(deleteTranslation({ id, pathParams, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(deleteTranslation({
        id, pathParams, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });


    it('should create an action for failed request', () => {
      const { deleteTranslationFailure } = actions;
      const { DELETE_TRANSLATION_FAILURE } = types;
      const expectedValue = {
        type: DELETE_TRANSLATION_FAILURE,
        error: {},
      };

      expect(deleteTranslationFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(deleteTranslationFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { deleteTranslationSuccess } = actions;
      const { DELETE_TRANSLATION_SUCCESS } = types;
      const expectedValue = {
        type: DELETE_TRANSLATION_SUCCESS,
      };

      expect(deleteTranslationSuccess()).toEqual(expectedValue);
    });
  });

  describe('using fetchAvailableTickets', () => {
    it('should create an action with request payload', () => {
      const { fetchAvailableTickets } = actions;
      const { FETCH_AVAILABLE_TICKETS } = types;
      const id = 1;
      const params = {
        date: format(new Date(2011, 4, 12), 'YYYY-MM-DDTHH:MMZ'),
      };
      const options = { a: 1, params };
      const expectedValue = {
        type: FETCH_AVAILABLE_TICKETS,
        payload: {
          url: `${apiURL}/${id}/available-tickets`,
          method: 'get',
          ...options,
        },
        sightEventId: id,
      };

      expect(fetchAvailableTickets({ id, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(fetchAvailableTickets({
        id, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for cancelled request', () => {
      const { fetchAvailableTicketsCancel } = actions;
      const { FETCH_AVAILABLE_TICKETS_CANCEL } = types;
      const expectedValue = {
        type: FETCH_AVAILABLE_TICKETS_CANCEL,
      };

      expect(fetchAvailableTicketsCancel()).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { fetchAvailableTicketsFailure } = actions;
      const { FETCH_AVAILABLE_TICKETS_FAILURE } = types;
      const expectedValue = {
        type: FETCH_AVAILABLE_TICKETS_FAILURE,
        error: {},
      };

      expect(fetchAvailableTicketsFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(fetchAvailableTicketsFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { fetchAvailableTicketsSuccess } = actions;
      const { FETCH_AVAILABLE_TICKETS_SUCCESS } = types;
      const data = { a: 1 };
      const expectedValue = {
        type: FETCH_AVAILABLE_TICKETS_SUCCESS,
        data,
      };

      expect(fetchAvailableTicketsSuccess(data)).toEqual(expectedValue);
    });
  });

  describe('using fetchItem', () => {
    it('should create an action with request payload', () => {
      const { fetchItem } = actions;
      const { FETCH_ITEM } = types;
      const id = 1;
      const options = { a: 1 };
      const expectedValue = {
        type: FETCH_ITEM,
        payload: {
          url: `${apiURL}/${id}`,
          method: 'get',
        },
      };

      expect(fetchItem({ id })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(fetchItem({ id, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(fetchItem({
        id, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for cancelled request', () => {
      const { fetchItemCancel } = actions;
      const { FETCH_ITEM_CANCEL } = types;
      const expectedValue = {
        type: FETCH_ITEM_CANCEL,
      };

      expect(fetchItemCancel()).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { fetchItemFailure } = actions;
      const { FETCH_ITEM_FAILURE } = types;
      const expectedValue = {
        type: FETCH_ITEM_FAILURE,
        error: {},
      };

      expect(fetchItemFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(fetchItemFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { fetchItemSuccess } = actions;
      const { FETCH_ITEM_SUCCESS } = types;
      const data = { a: 1 };
      const expectedValue = {
        type: FETCH_ITEM_SUCCESS,
        data,
      };

      expect(fetchItemSuccess(data)).toEqual(expectedValue);
    });
  });

  describe('using fetchList', () => {
    it('should create an action with request payload', () => {
      const { fetchList } = actions;
      const { FETCH_LIST } = types;
      const data = { a: 1 };
      const options = { b: 2 };
      const expectedValue = {
        type: FETCH_LIST,
        payload: {
          url: apiURL,
          method: 'get',
        },
      };

      expect(fetchList()).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        data,
        ...options,
      };

      expect(fetchList({ data, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(fetchList({
        data, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for cancelled request', () => {
      const { fetchListCancel } = actions;
      const { FETCH_LIST_CANCEL } = types;
      const expectedValue = {
        type: FETCH_LIST_CANCEL,
      };

      expect(fetchListCancel()).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { fetchListFailure } = actions;
      const { FETCH_LIST_FAILURE } = types;
      const expectedValue = {
        type: FETCH_LIST_FAILURE,
        error: {},
      };

      expect(fetchListFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(fetchListFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { fetchListSuccess } = actions;
      const { FETCH_LIST_SUCCESS } = types;
      const data = { a: 1 };
      const expectedValue = {
        type: FETCH_LIST_SUCCESS,
        data,
      };

      expect(fetchListSuccess(data)).toEqual(expectedValue);
    });
  });

  describe('using fetchSearchResults', () => {
    it('should create an action with request payload', () => {
      const { fetchSearchResults } = actions;
      const { FETCH_SEARCH_RESULTS } = types;
      const params = { a: 1 };
      const options = { b: 2 };
      const expectedValue = {
        type: FETCH_SEARCH_RESULTS,
        payload: {
          url: `${apiURL}/search`,
          method: 'get',
          params,
        },
      };

      expect(fetchSearchResults({ params })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(fetchSearchResults({ options, params })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(fetchSearchResults({
        options, params, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for cancelled request', () => {
      const { fetchSearchResultsCancel } = actions;
      const { FETCH_SEARCH_RESULTS_CANCEL } = types;
      const expectedValue = {
        type: FETCH_SEARCH_RESULTS_CANCEL,
      };

      expect(fetchSearchResultsCancel()).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { fetchSearchResultsFailure } = actions;
      const { FETCH_SEARCH_RESULTS_FAILURE } = types;
      const expectedValue = {
        type: FETCH_SEARCH_RESULTS_FAILURE,
        error: {},
      };

      expect(fetchSearchResultsFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(fetchSearchResultsFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { fetchSearchResultsSuccess } = actions;
      const { FETCH_SEARCH_RESULTS_SUCCESS } = types;
      const data = { a: 1 };
      const expectedValue = {
        type: FETCH_SEARCH_RESULTS_SUCCESS,
        data,
      };

      expect(fetchSearchResultsSuccess(data)).toEqual(expectedValue);
    });
  });

  describe('using updateItem', () => {
    it('should create an action with request payload', () => {
      const { updateItem } = actions;
      const { UPDATE_ITEM } = types;
      const id = 1;
      const data = { a: 1 };
      const pathParams = { languageVersion: 'pl-PL' };
      const options = { b: 2 };
      const expectedValue = {
        type: UPDATE_ITEM,
        payload: {
          url: `${apiURL}/${id}/languageVersion/${pathParams.languageVersion}`,
          method: 'put',
          data,
        },
      };

      expect(updateItem({ id, data, pathParams })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(updateItem({
        id, data, pathParams, options,
      })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(updateItem({
        id, data, pathParams, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { updateItemFailure } = actions;
      const { UPDATE_ITEM_FAILURE } = types;
      const expectedValue = {
        type: UPDATE_ITEM_FAILURE,
        error: {},
      };

      expect(updateItemFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(updateItemFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { updateItemSuccess } = actions;
      const { UPDATE_ITEM_SUCCESS } = types;
      const data = { a: 1 };
      const expectedValue = {
        type: UPDATE_ITEM_SUCCESS,
        data,
      };

      expect(updateItemSuccess(data)).toEqual(expectedValue);
    });
  });

  describe('using stopSell', () => {
    it('should create an action with request payload', () => {
      const { stopSell } = actions;
      const { STOP_SELL } = types;
      const sightEventId = 1;
      const ticketPoolId = 2;
      const date = '1999-01-01';
      const expectedValue = {
        type: STOP_SELL,
        payload: {
          url: `${apiURL}/${sightEventId}/sale?tpdId=${ticketPoolId}&date=${date}`,
          method: 'delete',
        },
      };

      expect(stopSell({ sightEventId, ticketPoolId, date })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(stopSell({
        sightEventId, ticketPoolId, date, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { stopSellFailure } = actions;
      const { STOP_SELL_FAILURE } = types;
      const expectedValue = {
        type: STOP_SELL_FAILURE,
        error: {},
      };

      expect(stopSellFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(stopSellFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { stopSellSuccess } = actions;
      const { STOP_SELL_SUCCESS } = types;
      const expectedValue = {
        type: STOP_SELL_SUCCESS,
      };

      expect(stopSellSuccess()).toEqual(expectedValue);
    });
  });
});

describe('selectors', () => {
  describe('using getState', () => {
    const { getState } = selectors;

    it(`should return ${name} state`, () => {
      expect(getState(appState)).toEqual(initialState);
    });
  });

  describe('using getError', () => {
    const { getError } = selectors;

    it('should return null if there was no error', () => {
      expect(getError(appState)).toBeNull();
    });

    it('should return some error message if there was an error', () => {
      const error = 'omg';
      const state = generateAppState({ error });

      expect(getError(state)).toEqual(error);
    });
  });

  describe('using getSightEvent', () => {
    const { getSightEvent } = selectors;

    it('should return null if there is no item data', () => {
      expect(getSightEvent(appState)).toBeNull();
    });

    it('should return item data', () => {
      const expectedValue = { id: 1 };
      const state = generateAppState({ item: expectedValue });

      expect(getSightEvent(state)).toEqual(expectedValue);
    });
  });

  describe('using getSightEvents', () => {
    const { getSightEvents } = selectors;

    it('should return null if there is no list data', () => {
      expect(getSightEvents(appState)).toBeNull();
    });

    it('should return list data', () => {
      const expectedValue = [
        { id: 1 },
        { id: 2 },
      ];
      const state = generateAppState({ list: expectedValue });

      expect(getSightEvents(state)).toEqual(expectedValue);
    });
  });

  describe('using getSightEventById', () => {
    const { getSightEventById } = selectors;

    it('should return null if there is no item data', () => {
      expect(getSightEventById(appState)).toBeNull();
      expect(getSightEventById(appState, 1)).toBeNull();
    });

    it('should return list data', () => {
      const id = 1;
      const expectedValue = [
        { id: 1 },
        { id: 2 },
      ];
      const state = generateAppState({ list: expectedValue });

      expect(getSightEventById(state, id)).toEqual(expectedValue[0]);
    });
  });

  describe('using getAvailableTickets', () => {
    const { getAvailableTickets } = selectors;

    it('should return empty object if no pools are present', () => {
      const expectedValue = {};
      const state = generateAppState({ availableTickets: expectedValue });

      expect(getAvailableTickets(state)).toEqual(expectedValue);
    });

    it('should return TicketPools with Tickets instances', () => {
      const expectedValue = {
        sightEventId: 1,
        tickets: [
          { id: 1 },
          { id: 2 },
        ],
      };

      const state = generateAppState({ availableTickets: expectedValue });

      expect(getAvailableTickets(state)).toEqual(expectedValue);
    });
  });
});

describe('reducer', () => {
  it('should return default initial state', () => {
    expect(reducer()(undefined, {})).toEqual(defaultInitialState);
  });

  it('should return custom initial state', () => {
    expect(reducer(initialState)(undefined, {})).toEqual(initialState);
  });

  it('should return current state if action type was not found', () => {
    expect(reducer()(undefined, { type: 'INVALID_TYPE' })).toEqual(defaultInitialState);
  });

  it('should handle CLEAR_AVAILABLE_TICKETS', () => {
    const action = actions.clearAvailableTickets();
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle CLEAR_SEARCH_RESULTS', () => {
    const action = actions.clearSearchResults();
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle CLEAR_ITEM', () => {
    const action = actions.clearItem();
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle CREATE_ITEM_FAILURE', () => {
    let action = actions.createItemFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.createItemFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle CREATE_MAIN_IMAGE_FAILURE', () => {
    let action = actions.createMainImageFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.createMainImageFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle CREATE_PDF_FAILURE', () => {
    let action = actions.createPDFFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.createPDFFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle DELETE_ITEM_FAILURE', () => {
    let action = actions.deleteItemFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.deleteItemFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_AVAILABLE_TICKETS_FAILURE', () => {
    let action = actions.fetchAvailableTicketsFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.fetchItemFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_ITEM_FAILURE', () => {
    let action = actions.fetchItemFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.fetchItemFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_LIST_FAILURE', () => {
    let action = actions.fetchListFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.fetchListFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_SEARCH_RESULTS_FAILURE', () => {
    let action = actions.fetchSearchResultsFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.fetchSearchResultsFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle UPDATE_ITEM_FAILURE', () => {
    let action = actions.updateItemFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.updateItemFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle CREATE_ITEM_SUCCESS', () => {
    const data = { id: 1 };
    const action = actions.createItemSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle CREATE_MAIN_IMAGE_SUCCESS', () => {
    const data = { id: 1 };
    const action = actions.createMainImageSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle CREATE_PDF_SUCCESS', () => {
    const data = { id: 1 };
    const action = actions.createPDFSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle UPDATE_ITEM_SUCCESS', () => {
    const data = { id: 1 };
    const action = actions.updateItemSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_AVAILABLE_TICKETS_SUCCESS', () => {
    const data = {
      date: '2018-01-01',
      sightEventId: 123,
      ticketPools: [{ id: 1 }],
    };
    const action = actions.fetchAvailableTicketsSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
      availableTickets: {
        ...data,
      },
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_ITEM_SUCCESS', () => {
    const data = { id: 1 };
    const action = actions.fetchItemSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
      item: data,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_ITEM_SUCCESS', () => {
    const data = {
      config: {},
      items: [
        { id: 1 },
        { id: 2 },
      ],
    };
    const action = actions.fetchListSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
      list: data.items,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_SEARCH_RESULTS_SUCCESS', () => {
    const data = {
      config: {},
      items: [
        { id: 1 },
        { id: 2 },
      ],
    };
    const action = actions.fetchSearchResultsSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
      list: data.items,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });
});
