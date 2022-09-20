import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type Game = {
  id: number;
  title: string;
  img: string;
};

type Event = {
  id: number;
  title: string;
  description?: string;
  scheduledAt: string;
  link: string;
  game: Game;
};

interface WatchlistState {
  events: Event[];
}

const initialState: WatchlistState = {
  events: [],
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addEventToWatchlist: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    removeEventfromWatchlist: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
  },
});

export const { addEventToWatchlist, removeEventfromWatchlist } =
  watchlistSlice.actions;

export const getEventWatchlist = (state: RootState) => state.watchlist.events;

export default watchlistSlice.reducer;
