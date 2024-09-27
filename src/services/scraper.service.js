import axios from "axios";
const baseUrl = process.env.REACT_APP_SCRAPER_URL;

export const scrapeText = (url) => {
  return axios.post(baseUrl + "scrape-text/", { url });
};
