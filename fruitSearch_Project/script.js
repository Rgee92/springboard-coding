const suggestions = document.querySelector(".suggestions ul");
const input = document.querySelector("#fruit");
const suggestionDiv = document.querySelector("div.suggestions");

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// array of objects that includes suggestions in different text formats
const suggestionObs = parseArr(fruit);

// maximum number of displayed suggestions; start with 8
const suggestionDisplayCount = 5;

// this function is called by the DOM load event listener
// suggestions will be stored in a UL
// DOM manipulation will be used to create a dynamic UL of items where items in the fruit list are filtered based on text provided by input
function startSearch() {
	// what is run when the search page is loaded?
    // keystrokes will trigger the function searchHandler
	input.addEventListener("keyup", searchHandler);
	input.focus();
}

// this function is called once by startSearch to take the arr of possible result strings and return an arr of result objects
function parseArr(arr) {
	// NOTE: parsing out emojis https://stackoverflow.com/questions/37089427/javascript-find-emoji-in-string-and-parse
	//   let emojiRE = /\p{Emoji}/u;
  
	// change arr of fruit strings to an arr of fruit objects, where keys are simple, display, and emoji
	const newArr = arr.reduce(function (currentArr, nextItem) {
	  let newObj = {};
	  // simple will be lowercase string with spaces removed
	  // simple value will be used for comparing input to fruit name, will be lowercase only with emoji and spaces stripped out
	  newObj["simple"] = nextItem.toLowerCase().replace(" ", "");
		//   .replace(emojiRE, "")
	  newObj["display"] = nextItem;
	  currentArr.push(newObj);
	  return currentArr;
	}, []);
	return newArr;
  }

// function returns HTML which will be displayed for the LI of the suggestion
// function compares the inputVal to the display string at the rank position to determine the innerHTML fo the result
// function is called by search
function getDisplayHTML(displayStr, rank, inputVal) {
	let startBold = null;
	let endBold = null;
	let displayHTML = null;
	let spaceIndex = displayStr.indexOf(" ");
	// check if the input val is in the display
	subStrIndex = displayStr.toLowerCase().indexOf(inputVal.toLowerCase());
	// check if the matching string between inputVal and suggestion is contiguous (doesn't have a space)
	if (subStrIndex !== -1) {
	  // if there is not a space (easy match), return HTML
	  endBold = subStrIndex + inputVal.length;
	  startBold = subStrIndex;
	} else {
	  // if there is a space (mismatch), return HTML
	  subStrIndex = displayStr.toLowerCase().replace(" ", "").indexOf(inputVal.toLowerCase());
	  endBold = subStrIndex + inputVal.length + 1;
	  startBold = subStrIndex;
	}
	// if the match is at the beginning of the suggestion, return HTML
	if (startBold === 0) {
	  return (
		'<span class="match-text">' + displayStr.slice(subStrIndex, endBold) + "</span>" + displayStr.slice(endBold, displayStr.length)
	  );
	} else {
	  // if the match is not at the beginning of the suggestion, return HTML
	  return (
		displayStr.slice(0, startBold) + '<span class="match-text">' + displayStr.slice(startBold, endBold) + "</span>" + displayStr.slice(endBold, displayStr.length)
	  );
	}
  }

// function handles the logic of searching through the fruit list and returning a list of suggestions
// function filters a list of fruit based on user input
function search(str) {
	const results = [];
	const rankedSuggestions = suggestionObs.filter(function (ob) {
		return ob["simple"].indexOf(str) !== -1;
	})
	.reduce(function (rankedSet, ob) {
		ob["rank"] = ob["simple"].indexOf(str);
		rankedSet.push(ob);
		return rankedSet;
	}, []);
	const rankings = Array.from(
		new Set(
			rankedSuggestions.map(function (ob) {
				return ob["rank"];
			})
				.sort()
		)
	);
	for (let i = 0; i < rankings.length; i++) {
		const resultsToAdd = rankedSuggestions.filter(function (obj) {
			return obj["rank"] === rankings[i];
		})
			.map(function (obj) {
				displayStr = obj["display"];
				return getDisplayHTML(obj["display"], obj["rank"], str);
			});
		for (let j = 0; j < resultsToAdd.length; j++) {
			results.push(resultsToAdd[j]);
			if (results.length === suggestionDisplayCount) {
				return results;
			}
		}
	}
	return results;
}

// function is called by the keystroke event listener
function searchHandler(e) {
	let searchStr = input.value.toLowerCase();
	suggestions.classList.remove("has-suggestions");
	suggestions.innerHTML = "";
	if (searchStr.length > 0) {
		results = search(searchStr);
		if (results.length > 0) {
			showSuggestions(results, searchStr);
		}
	}
}

// function handles the UI of displaying suggestions below the search box
// function is called by the searchHandler function
function showSuggestions(results, inputVal) {
	for (item of results) {
		const resultItem = document.createElement("li");
		resultItem.innerHTML = item;
		resultItem.addEventListener("click", useSuggestion);
		suggestions.append(resultItem);
	}
	suggestions.classList.add("has-suggestions");
	return suggestions;
}

// function takes the target of the click and populates the search box with list item from the target
function useSuggestion(e) {
	if (e.target.tagName === "LI") {
		input.value = e.target.innerText;
		suggestions.classList.remove("has-suggestions");
	}
}

// listener which runs when DOM is loaded
document.addEventListener("DOMContentLoaded", startSearch);