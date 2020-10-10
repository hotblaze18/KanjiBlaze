const defaultUpdates = {
  syncingNow: false,
  unlocks: [],
  cards: {},
  levelsInfo: null,
  currLevel: null,
};

export default (updates = defaultUpdates, action) => {
  switch (action.type) {
    case "ADD_CARD_TO_UPDATE_QUEUE":
      return {
        ...updates,
        cards: { ...updates.cards, [action.card.cardNo]: action.card },
      };
    case "ADD_UNLOCK":
      return { ...updates, unlocks: [...updates.unlocks, action.unlock] };
    case "ADD_UPDATE_LEVELSINFO":
      return { ...updates, levelsInfo: action.levelsInfo };
    case "ADD_UPDATE_LEVEL":
      return { ...updates, currLevel: action.newLevel };
    case "START_UPDATES":
      return { ...updates, syncingNow: true };
    case "END_UPDATES":
      return defaultUpdates;
    default:
      return updates;
  }
};
