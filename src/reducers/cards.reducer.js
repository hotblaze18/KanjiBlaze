import { mapKeys } from "lodash";
import { FETCH_CARDS, UPDATE_CARD, UNLOCK_CARDS } from "./action_names";

export default (cards = {}, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return mapKeys(action.cards, "cardNo");
    case UPDATE_CARD:
      return { ...cards, [action.card.cardNo]: action.card };
    case UNLOCK_CARDS:
      return action.cards;
    default:
      return cards;
  }
};
