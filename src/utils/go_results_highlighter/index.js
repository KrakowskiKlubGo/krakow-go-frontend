/*
This is modified version of the original go_results_highlighter
https://github.com/barcicki/go-results-highlighter
 */
import GoResultsHighlighter from "./lib/wrapper";
import { init, initWithJQuery } from "./init";
// import './styles/highlighter.scss';

export default GoResultsHighlighter;

if (typeof jQuery !== "undefined") {
  initWithJQuery(jQuery);
} else if (document) {
  init(document);
}
