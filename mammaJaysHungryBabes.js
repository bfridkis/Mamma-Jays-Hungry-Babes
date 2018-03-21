//Establishes chronicles scroll window height based on innerHeight property
//(Scroll window height is total window height minus banner height.)
var chronicles = document.querySelector("#chronicles");
chronicles.style.height = String(innerHeight - 241) + "px";

//Locks the navbar at the top of the screen after
//the user scrolls past the top banner. Adds logo
//to navbar when navbar is locked at the top of the page.
var navbar = document.querySelector(".navbar");
var chroniclesContainer = document.querySelector("#chronicles-container");
var previousPageYOffset = 0;
var bannerLogo = document.getElementById("banner-logo");
bannerLogo.style.borderRadius = "25px";
bannerLogoForNavBar = document.createElement("img");
bannerLogoForNavBar.setAttribute("src", "Logo.png");
bannerLogoForNavBar.style.marginLeft = "-75px";
bannerLogoForNavBar.style.height = "60px";
bannerLogoForNavBar.style.borderRadius = "10px";
bannerLogoForNavBar.style.transition = "opacity .5s";
bannerLogoForNavBar.style.opacity = "0";
var firstNavBarGroup = 
	document.getElementsByClassName("navbar-nav")[0];
insertAfter(bannerLogoForNavBar, firstNavBarGroup);
addEventListener("scroll", function(){
	if(pageYOffset > 150 && previousPageYOffset < 150){
		navbar.classList.toggle("LockTop");
		chroniclesContainer.classList.toggle("chronicles");
		chronicles.style.position = "fixed";
		previousPageYOffset = pageYOffset;
		if(innerWidth > 1175){
			bannerLogoForNavBar.style.opacity = "1";
		}
	}
	if(previousPageYOffset > 150 && pageYOffset < 150){
		navbar.classList.toggle("LockTop");
		chroniclesContainer.classList.toggle("chronicles");
		chronicles.style.position = "absolute";
		previousPageYOffset = pageYOffset;
		bannerLogoForNavBar.style.opacity = "0";
	}
	if(!navbar.classList.contains("LockTop")){
		var newHeight = innerHeight - 230 + pageYOffset;
		chronicles.style.height = String(newHeight) + "px";
	}
	else{
		chronicles.style.height = String(innerHeight - 80) + "px";
	}
})
//Regulates navbar banner placement on window resize
var previousWindowWidth = window.innerWidth;
addEventListener("resize", function(){
	if(window.innerWidth < 1175 && previousWindowWidth >= 1175){
		bannerLogoForNavBar.remove();
		previousWindowWidth = window.innerWidth;
	}
	if(window.innerWidth > 1175 && previousWindowWidth <= 1175){
		insertAfter(bannerLogoForNavBar, firstNavBarGroup);
		previousWindowWidth = window.innerWidth;
	}
})

var chronicleButton = document.querySelector(".fas");
chronicleButton.addEventListener("click", function(){
	if(chronicleButton.style.marginLeft != "196.19px"){
		chronicleButton.style.marginLeft = "196.19px";
		chronicles.style.marginLeft = "0";
		localStorage.setItem("sideBarOpen", "yes");
	}
	else{
		chronicleButton.style.marginLeft = "0";
		chronicles.style.marginLeft = "-200px";
		localStorage.setItem("sideBarOpen", "no");
	}
})

//Use local storage to keep the sidebar chronicle selector visible until closed
var chroniclesSideBarSelector = document.getElementById("chronicles");
if(localStorage.getItem("sideBarOpen") === null){
	localStorage.setItem("sideBarOpen", "no");
}
else if(localStorage.getItem("sideBarOpen") === "yes"){
	chroniclesSideBarSelector.style.marginLeft = "0";
	chronicleButton.style.marginLeft = "196.19px";
}
else{
	chroniclesSideBarSelector.style.marginLeft = "-200px";
	chronicleButton.style.marginLeft = "0";
}
//Reload current scrollTop for chronicles sidebar
if(localStorage.getItem("chroniclesScrollTop") === null){
	localStorage.setItem("chroniclesScrollTop", "0");
}
chronicles.scrollTop = Number(localStorage.getItem("chroniclesScrollTop"));
chronicles.addEventListener("scroll", function(){
	localStorage.setItem("chroniclesScrollTop", chronicles.scrollTop);
})

//Establishes and maintains jumbotron text spacing based on window height
//(Only needed if multiple spans used for jumbotron text.)
var jumbotronSpans = document.querySelectorAll(".jumbotron-span");
addEventListener("DOMContentLoaded", function(){
	if(window.innerWidth < 1606 && jumbotronSpans[2] !== undefined){
		for(var i = 0; i < jumbotronSpans.length; i++){
			insertAfter(document.createElement("br"), jumbotronSpans[i])
		}
		heading2.style.marginLeft = "140px";
	}
	if(window.innerWidth < 716 && jumbotronSpans[2] !== undefined){
		jumbotronSpans[2].style.float = "none";
	}
})
var heading2 = document.getElementById("heading2");
if(jumbotronSpans[2] !== undefined){
	addEventListener("resize", addBrsAfterJumbotronSpans);
}
function addBrsAfterJumbotronSpans(){
	if(window.innerWidth < 1606 && previousWindowWidth >= 1606){
		for(var i = 0; i < jumbotronSpans.length; i++){
			insertAfter(document.createElement("br"), jumbotronSpans[i])
		}
		previousWindowWidth = window.innerWidth;
		heading2.style.marginLeft = "140px";	
	}
	if(window.innerWidth > 1606 && previousWindowWidth <= 1606){
		for(var i = 0; i < jumbotronSpans.length; i++){
			jumbotronSpans[i].nextSibling.remove();
		}
		previousWindowWidth = window.innerWidth;
		heading2.style.marginLeft = "0";	
	}
	if(window.innerWidth < 886 && previousWindowWidth >= 886 
		&& jumbotronSpans[2] !== undefined){
		jumbotronSpans[2].style.float = "none";
		previousWindowWidth = window.innerWidth;
		heading2.style.marginLeft = "0";
	}	
	if(window.innerWidth > 886 && previousWindowWidth <= 886
		&& jumbotronSpans[2] !== undefined){
		jumbotronSpans[2].style.float = "right";
		previousWindowWidth = window.innerWidth;
		heading2.style.marginLeft = "140px";
	}	
}

//Double-clicking the background image (on which the main text is displayed)
//toggles its opacity between 0 and 1.
//Note: May not work in all browsers.
var backgroundImg = document.querySelector('.image-wrap-top');
var backgroundImgTopped = false;
if(backgroundImg !== null) {
	backgroundImg.addEventListener("dblclick", function(){
		if(!backgroundImgTopped){
		backgroundImg.style.opacity = 1;
		backgroundImgTopped = true;
		}
		else{
			backgroundImg.style.opacity = 0;
			backgroundImgTopped = false;
		}
	})
}

//Function to insert a a node immediately after a sibling node
//Reference: https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//Setup for meal planner select inputs
var weeklyMealPlannerContainer = 
	document.getElementById("weekly-meal-planner-container");

var brunchCaptions = ["Plantain Waffles","Eggs Benedict","Loaded Breakfast Sandwich","Banana Waffles",
					  "Feta-Topped Eggs & Veggies Over Quinoa","Cinnamon Hot Buns with Icing",
					  "Lox and Avocado Sandwich","Fried Millet with Maple Syrup and Eggs",
					  "Chicken & Waffles with Purple Cabbage", "Cheese Omelet with Fresh Basil"],
	dinnerCaptions = ["Mushroom-Topped Salmon","Snapper Tacos","Braised Lamb Pot Roast",
					  "Salmon Cheddar Casserole with Zucchini and Fried Plantains",
					  "Salmon Patties with Fresh Garden Veggies and Special Sauce",
					  "Baked Chicken with Carrots and Mushroom Rice Pilaf","Zucchini Lasagna",
					  '"Heap-O-Good-Stuff" Salad',"Open-Faced Kosher Beef Dog with Gauc on Sourdough",
					  "Baked Quinoa Mac N' Cheese"],
	sweetsCaptions = ["Assorted Truffles","Chocolate-Frosted Birthday Cheesecake","Dewberry Pie",
					  "Frozen Dual-Layered Banana Cake","Apple Crisp","Apple Cake",
					  "Tri-Layered Grape Lemon-Lime Sour Gummies","Chocolate Pumpkin Pie",
					  "Banana Muffins with Homemade Vanilla Ice Cream", "Maple and Chocolate Sourdough Donuts"],
	fermentsCaptions = ["Raw-Milk Cheddar","Sourdough","Raw Milk Kefir","Kombucha","Sauerkraut","Cheese Cave"];

var chronicleSelectContainer = document.createElement("div");
chronicleSelectContainer.className = "chronicleSelectContainer";
chronicleSelectContainer.style.display = "flex";
function createChronicleSelector(mealType, captions) {
	var chronicleSelect = document.createElement("select");
	chronicleSelect.className = mealType;
	chronicleSelect.style.backgroundColor = "rgb(237, 227, 171)";
	chronicleSelect.style.fontSize = "1.5rem";
	chronicleSelect.style.color = "rgb(54, 130, 28)";
	chronicleSelect.style.borderRadius = "10px"
	chronicleSelect.style.display = "none";
	chronicleSelect.style.marginLeft = "20px";
	chronicleSelect.style.marginRight = "auto";
	chronicleSelect.style.marginTop = "22.5px";
	chronicleSelect.style.height = "30px";
	chronicleSelect.setAttribute("name", mealType);

	var chronicleSelectLabel = document.createElement("label");
	chronicleSelectLabel.className = mealType;
	chronicleSelectLabel.setAttribute("for", mealType);
	chronicleSelectLabel.style.fontSize = "1.75rem";
	chronicleSelectLabel.style.marginLeft = "auto";
	chronicleSelectLabel.style.marginTop = "20px"
	chronicleSelectLabel.textContent = 
		mealType.charAt(0).toUpperCase() + 
		mealType.substring(1, mealType.indexOf('S')) + " Picker";
	
	for(var i = 0, el; i < captions.length; i++){
		el = document.createElement("option");
		el.setAttribute("value", i + 1);
		el.textContent = captions[i];
		chronicleSelect.appendChild(el);
	}

	chronicleSelectContainer.appendChild(chronicleSelectLabel);
	chronicleSelectContainer.appendChild(chronicleSelect);

	return chronicleSelect;
}
//Setup for image display based on select value
var imageSelectorCell = document.getElementsByClassName("image-selector-cell")[0];
imageSelectorCell.appendChild(chronicleSelectContainer);
var imgDiv = document.createElement("div");
var chronicleSelected = document.createElement("img");
chronicleSelected.className = "imageSelected";
chronicleSelected.style.marginBottom = "20px";
chronicleSelected.style.marginTop = "10px";
chronicleSelected.style.height = "150px";
chronicleSelected.style.borderRadius = "10px";
imgDiv.appendChild(chronicleSelected);
var imageSelectorImageCell = document.getElementsByClassName("image-selector-image-cell")[0];
imageSelectorImageCell.style.textAlign = "center";
imageSelectorImageCell.appendChild(imgDiv);

var selectors = [createChronicleSelector("brunchSelector", brunchCaptions),
				 createChronicleSelector("dinnerSelector", dinnerCaptions),
				 createChronicleSelector("sweetsSelector", sweetsCaptions),
				 createChronicleSelector("fermentsSelector", fermentsCaptions)];			 

selectors.forEach(function(selector, i){
	var chronicleSelected = 
				 document.getElementsByClassName("imageSelected")[0];
	switch(i){
		case 0 : selector.addEventListener("change", function(){
					 var optSelected = document.querySelector(".brunchSelector option:checked").value;
					 chronicleSelected.setAttribute("src", "Brunch/BrunchChronicles/"+ optSelected + ".jpg");
					 localStorage.setItem("currentBrunchSelectorValue", optSelected - 1);
				 })
				 break;
		case 1 : selector.addEventListener("change", function(){
					 var optSelected = document.querySelector(".dinnerSelector option:checked").value;
					 chronicleSelected.setAttribute("src", "Dinner/DinnerChronicles/"+ optSelected + ".jpg");
					 localStorage.setItem("currentDinnerSelectorValue", optSelected - 1);
				 })
				 break;
		case 2 : selector.addEventListener("change", function(){
					 var optSelected = document.querySelector(".sweetsSelector option:checked").value;
					 chronicleSelected.setAttribute("src", "Sweets/SweetsChronicles/"+ optSelected + ".jpg");
					 localStorage.setItem("currentSweetsSelectorValue", optSelected - 1);
				 })
				 break;
		case 3 : selector.addEventListener("change", function(){
					 var optSelected = document.querySelector(".fermentsSelector option:checked").value;
					 chronicleSelected.setAttribute("src", "Ferments/FermentsChronicles/"+ optSelected + ".jpg");
					 localStorage.setItem("currentFermentsSelectorValue", optSelected - 1);
				 })
				 break;		 
	}
});

//Setup the weekly meal planner on page load
var weeklyMealPlanner = document.getElementById("calendar-activator");
if(localStorage.getItem("plannerOn") === "true"){
	weeklyMealPlanner.classList.add("activator-on");
	weeklyMealPlannerContainer.style.display = "block";
}
else{
	weeklyMealPlanner.classList.add("activator-off");
}
if(localStorage.getItem("active-cell-number") === null){
	localStorage.setItem("active-cell-number", "0");
}
if(localStorage.getItem("active-indicator-switch") === null){
	localStorage.setItem("active-indicator-switch", "on");
}
var activeCellIndicator = 
	document.getElementsByClassName("active-cell-indicator-switch-button-on")[0];
if(localStorage.getItem("active-indicator-switch") === "off"){
	activeCellIndicator.className = "active-cell-indicator-switch-button-off";
	activeCellIndicator.textContent = "Selected Cell Indicator Switch: Off";
}
if(localStorage.getItem("currentBrunchSelectorValue") === null){
	localStorage.setItem("currentBrunchSelectorValue", "0");
}
if(localStorage.getItem("currentDinnerSelectorValue") === null){
	localStorage.setItem("currentDinnerSelectorValue", "0");
}
if(localStorage.getItem("currentSweetsSelectorValue") === null){
	localStorage.setItem("currentSweetsSelectorValue", "0");
}
if(localStorage.getItem("currentFermentsSelectorValue") === null){
	localStorage.setItem("currentFermentsSelectorValue", "0");
}

var activeCellNumber = Number(localStorage.getItem("active-cell-number"));
var activeCell = 
	document.getElementsByClassName("weekly-meal-planner-data-cell")[activeCellNumber];
if(localStorage.getItem("active-indicator-switch") === "on"){
	activeCell.style.backgroundColor = "rgb(237, 227, 171)";
}

document.querySelectorAll(".brunchSelector > option")
	[localStorage.getItem("currentBrunchSelectorValue")]
		.setAttribute("selected", "");	
document.querySelectorAll(".dinnerSelector > option")
	[localStorage.getItem("currentDinnerSelectorValue")]
		.setAttribute("selected", "");	
document.querySelectorAll(".sweetsSelector > option")
	[localStorage.getItem("currentSweetsSelectorValue")]
		.setAttribute("selected", "");	
document.querySelectorAll(".fermentsSelector > option")
	[localStorage.getItem("currentFermentsSelectorValue")]
		.setAttribute("selected", "");

chronicleSelectDisplayToggler();

var dataCells = document.getElementsByClassName("weekly-meal-planner-data-cell");

for(var i = 0; i < 28; i++){
	if(i < 7 && localStorage.getItem(String(i)) !== "-1" && 
			localStorage.getItem(String(i)) !== null){
		var selectedCell = dataCells[i];
	 	var imgToAdd = document.createElement("img");
	 	imgToAdd.setAttribute("src", "Brunch/BrunchChronicles/" + localStorage.getItem(String(i))
	 		+ ".jpg");
	 	imgToAdd.style.height = "125px";
	 	imgToAdd.style.borderRadius = "5px";
	 	var linkToAdd = document.createElement("a");
	 	linkToAdd.setAttribute("href", "Brunch/BrunchChronicles/" + localStorage.getItem(String(i))
	 		+ ".html");
	 	linkToAdd.appendChild(imgToAdd);
	 	selectedCell.appendChild(linkToAdd);
	}
	else if(i < 14 && localStorage.getItem(String(i)) !== "-1" && 
			localStorage.getItem(String(i)) !== null){
		var selectedCell = dataCells[i];
	 	var imgToAdd = document.createElement("img");
	 	imgToAdd.setAttribute("src", "Dinner/DinnerChronicles/" + localStorage.getItem(String(i))
	 		+ ".jpg");
	 	imgToAdd.style.height = "125px";
	 	imgToAdd.style.borderRadius = "5px";
	 	var linkToAdd = document.createElement("a");
	 	linkToAdd.setAttribute("href", "Dinner/DinnerChronicles/" + localStorage.getItem(String(i))
	 		+ ".html");
	 	linkToAdd.appendChild(imgToAdd);
	 	selectedCell.appendChild(linkToAdd);
	}
	else if(i < 21 && localStorage.getItem(String(i)) !== "-1" && 
			localStorage.getItem(String(i)) !== null){
		var selectedCell = dataCells[i];
	 	var imgToAdd = document.createElement("img");
	 	imgToAdd.setAttribute("src", "Sweets/SweetsChronicles/" + localStorage.getItem(String(i))
	 		+ ".jpg");
	 	imgToAdd.style.height = "125px";
	 	imgToAdd.style.borderRadius = "5px";
	 	var linkToAdd = document.createElement("a");
	 	linkToAdd.setAttribute("href", "Sweets/SweetsChronicles/" + localStorage.getItem(String(i))
	 		+ ".html");
	 	linkToAdd.appendChild(imgToAdd);
	 	selectedCell.appendChild(linkToAdd);
	}
	else if(localStorage.getItem(String(i)) !== "-1" && localStorage.getItem(String(i)) !== null){
		var selectedCell = dataCells[i];
	 	var imgToAdd = document.createElement("img");
	 	imgToAdd.setAttribute("src", "Ferments/FermentsChronicles/" + localStorage.getItem(String(i))
	 		+ ".jpg");
	 	imgToAdd.style.height = "125px";
	 	imgToAdd.style.borderRadius = "5px";
	 	var linkToAdd = document.createElement("a");
	 	linkToAdd.setAttribute("href", "Ferments/FermentsChronicles/" + localStorage.getItem(String(i))
	 		+ ".html");
	 	linkToAdd.appendChild(imgToAdd);
	 	selectedCell.appendChild(linkToAdd);
	}
}

//Button ("Add", "Remove", "Clear") setup for planner interaction.
var plannerButtonDiv = document.createElement("div");
var plannerButtons = [document.createElement("button"),
					  document.createElement("button"),
					  document.createElement("button")];
document.body.addEventListener("mouseup", function(){
	plannerButtons.forEach(function(button){
		button.style.color = "rgb(49, 109, 69)";
		button.style.backgroundColor = "rgb(237, 227, 171)";
	})
})
plannerButtons.forEach(function(button, i){
	button.style.color = "rgb(49, 109, 69)";
	button.style.backgroundColor = "rgb(237, 227, 171)";
	button.style.fontSize = "1.4rem";
	button.addEventListener("mousedown", function(){
		button.style.color = "rgb(237, 227, 171)";
		button.style.backgroundColor = "rgb(49, 109, 69)";
	});
	button.addEventListener("mouseup", function(){
		button.style.color = "rgb(49, 109, 69)";
		button.style.backgroundColor = "rgb(237, 227, 171)";
	});
	switch(i){
		case 0 : button.textContent = "Add";
				 button.addEventListener("click", function(){
				 	var selectedCell = dataCells[activeCellNumber];
				 	if(selectedCell.childNodes.length > 0){
						selectedCell.removeChild(selectedCell.childNodes[0]);
					}
					var chronicleSelected = 
						document.getElementsByClassName("imageSelected")[0];
					var imgToAdd = document.createElement("img");
					imgToAdd.setAttribute("src", chronicleSelected.getAttribute("src"));
					imgToAdd.style.height = "125px";
					imgToAdd.style.borderRadius = "5px";
					var linkToAdd = document.createElement("a");
					linkToAdd.appendChild(imgToAdd);
					selectedCell.appendChild(linkToAdd);
					if(document.getElementsByClassName("brunchSelector")[0]
						.style.display === "block"){
						localStorage.setItem(String(activeCellNumber), 
							document.querySelector(".brunchSelector option:checked").value);
						linkToAdd.setAttribute("href", 
							chronicleSelected.getAttribute("src").substring(0, 
							/\.jpe*g/.exec(chronicleSelected.getAttribute("src")).index) + ".html");
					}
					else if(document.getElementsByClassName("dinnerSelector")[0]
						.style.display === "block"){
						localStorage.setItem(String(activeCellNumber), 
							document.querySelector(".dinnerSelector option:checked").value);
						linkToAdd.setAttribute("href", 
							chronicleSelected.getAttribute("src").substring(0, 
							/\.jpe*g/.exec(chronicleSelected.getAttribute("src")).index) + ".html");
					}
					else if(document.getElementsByClassName("sweetsSelector")[0]
						.style.display === "block"){
						localStorage.setItem(String(activeCellNumber), 
							document.querySelector(".sweetsSelector option:checked").value);
						linkToAdd.setAttribute("href", 
							chronicleSelected.getAttribute("src").substring(0, 
							/\.jpe*g/.exec(chronicleSelected.getAttribute("src")).index) + ".html");
					}
					else if(document.getElementsByClassName("fermentsSelector")[0]
						.style.display === "block"){
						localStorage.setItem(String(activeCellNumber), 
							document.querySelector(".fermentsSelector option:checked").value);
						linkToAdd.setAttribute("href", 
							chronicleSelected.getAttribute("src").substring(0, 
							/\.jpe*g/.exec(chronicleSelected.getAttribute("src")).index) + ".html");
					}
				 });
				 break;
		case 1 : button.textContent = "Remove";
				 button.style.marginLeft = "30px";
				 button.addEventListener("click", function(){
				 	var selectedCell = dataCells[activeCellNumber];
				 	selectedCell.removeChild(selectedCell.childNodes[0]);
				 	localStorage.setItem(String(activeCellNumber), "-1");
				 });
				 break;
		case 2 : button.textContent = "Clear";
				 button.style.marginLeft = "30px";
				 button.addEventListener("click", function(){
				 	for(var i = 0; i < dataCells.length; i++){
				 		if(dataCells[i].childNodes.length > 0){
				 			dataCells[i].removeChild(dataCells[i].childNodes[0])
				 		}
				 		localStorage.setItem(String(i), "-1");
				 	}
				 });
	}
	plannerButtonDiv.appendChild(button);
});
var imageSelectorButtonsCell = document.getElementsByClassName("image-selector-buttons-cell")[0];
imageSelectorButtonsCell.style.textAlign = "center";
imageSelectorButtonsCell.appendChild(plannerButtonDiv);

//To toggle and interact with weekly meal planner:
weeklyMealPlanner.addEventListener("click", function(){
	weeklyMealPlanner.classList.toggle("activator-off");
	weeklyMealPlanner.classList.toggle("activator-on");
	if(localStorage.getItem("plannerOn") === "true"){
		localStorage.setItem("plannerOn", "false")
	}
	else{
		localStorage.setItem("plannerOn", "true");
	}
	if (localStorage.getItem("plannerOn") === "true"){
		document.getElementById("weekly-meal-planner-container")
			.style.display = "block";
	}
	else{
		document.getElementById("weekly-meal-planner-container")
			.style.display = "none";
	}
})

activeCellIndicator.addEventListener("click", function(){
	activeCellIndicator.classList.toggle("active-cell-indicator-switch-button-on");
	activeCellIndicator.classList.toggle("active-cell-indicator-switch-button-off");
	if(localStorage.getItem("active-indicator-switch") === "off"){
		localStorage.setItem("active-indicator-switch", "on");
		activeCell.style.backgroundColor = "rgb(237, 227, 171)";
		activeCellIndicator.textContent = "Selected Cell Indicator Switch: On";
	}
	else{
		localStorage.setItem("active-indicator-switch", "off");
		activeCell.style.backgroundColor = "rgb(255, 254, 244)";
		activeCellIndicator.textContent = "Selected Cell Indicator Switch: Off";
	}
})

function createTableCellListenerWrapper(i, el){
	return function(){
		activeCell.style.backgroundColor = "rgb(255, 254, 244)";
		localStorage.setItem("active-cell-number", i);
		activeCell = el;
		activeCellNumber = i;
		if(localStorage.getItem("active-indicator-switch") === "on"){
			activeCell.style.backgroundColor = "rgb(237, 227, 171)";
		}
		chronicleSelectDisplayToggler();
	}
}
for(var i = 0, el, tableCellListeners = []; 
	i < document.getElementsByClassName("weekly-meal-planner-data-cell").length;
		i++){
	el = document.getElementsByClassName("weekly-meal-planner-data-cell")[i];
	tableCellListeners[i] = createTableCellListenerWrapper(i, el);
	el.addEventListener("click", tableCellListeners[i]);
}

document.body.addEventListener("keydown", arrowKeySelection.bind(null));

function arrowKeySelection(){
	if(localStorage.getItem("plannerOn") === "true"){
		if(arguments[0].keyCode === 37 && activeCellNumber % 7 != 0){
			activeCell.style.backgroundColor = "rgb(255, 254, 244)";
			localStorage.setItem("active-cell-number", activeCellNumber - 1);
			activeCell = document.getElementsByClassName
				("weekly-meal-planner-data-cell")[activeCellNumber - 1];
			activeCellNumber -= 1;
			if(localStorage.getItem("active-indicator-switch") === "on"){
				activeCell.style.backgroundColor = "rgb(237, 227, 171)";
			}
		}
		else if(arguments[0].keyCode === 39 && (activeCellNumber + 1) % 7 != 0){
			activeCell.style.backgroundColor = "rgb(255, 254, 244)";
			localStorage.setItem("active-cell-number", activeCellNumber + 1);
			activeCell = document.getElementsByClassName
				("weekly-meal-planner-data-cell")[activeCellNumber + 1];
			activeCellNumber += 1;
			if(localStorage.getItem("active-indicator-switch") === "on"){
				activeCell.style.backgroundColor = "rgb(237, 227, 171)";
			}
		}
		else if(arguments[0].keyCode === 38 && activeCellNumber > 6){
			activeCell.style.backgroundColor = "rgb(255, 254, 244)";
			localStorage.setItem("active-cell-number", activeCellNumber - 7);
			activeCell = document.getElementsByClassName
				("weekly-meal-planner-data-cell")[activeCellNumber - 7];
			activeCellNumber -= 7;
			if(localStorage.getItem("active-indicator-switch") === "on"){
				activeCell.style.backgroundColor = "rgb(237, 227, 171)";
			}
		}
		else if(arguments[0].keyCode === 40 && activeCellNumber < 21){
			activeCell.style.backgroundColor = "rgb(255, 254, 244)";
			localStorage.setItem("active-cell-number", activeCellNumber + 7);
			activeCell = document.getElementsByClassName
				("weekly-meal-planner-data-cell")[activeCellNumber + 7];
			activeCellNumber += 7;
			if(localStorage.getItem("active-indicator-switch") === "on"){
				activeCell.style.backgroundColor = "rgb(237, 227, 171)";
			}
		}
	}
	chronicleSelectDisplayToggler();
}

function chronicleSelectDisplayToggler(){
	if(activeCellNumber < 7){
		document.getElementsByClassName("brunchSelector")[0]
			.style.display = "block";
		document.getElementsByClassName("brunchSelector")[1]
			.style.display = "block";
		document.getElementsByClassName("dinnerSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("dinnerSelector")[1]
			.style.display = "none";
		document.getElementsByClassName("sweetsSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("sweetsSelector")[1]
			.style.display = "none";
		document.getElementsByClassName("fermentsSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("fermentsSelector")[1]
			.style.display = "none";

		var optSelected = document.querySelector(".brunchSelector option:checked").value;
		var chronicleSelected = 
			document.getElementsByClassName("imageSelected")[0];
		chronicleSelected.setAttribute("src", "Brunch/BrunchChronicles/"+ optSelected + ".jpg");
	}
	else if(activeCellNumber >= 7 && activeCellNumber < 14){
		document.getElementsByClassName("brunchSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("brunchSelector")[1]
			.style.display = "none";
		document.getElementsByClassName("dinnerSelector")[0]
			.style.display = "block";
		document.getElementsByClassName("dinnerSelector")[1]
			.style.display = "block";
		document.getElementsByClassName("sweetsSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("sweetsSelector")[1]
			.style.display = "none";
		document.getElementsByClassName("fermentsSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("fermentsSelector")[1]
			.style.display = "none";

		var optSelected = document.querySelector(".dinnerSelector option:checked").value;
		var chronicleSelected = 
			document.getElementsByClassName("imageSelected")[0];
		chronicleSelected.setAttribute("src", "Dinner/DinnerChronicles/"+ optSelected + ".jpg");
	}
	else if(activeCellNumber >= 14 && activeCellNumber < 21){
		document.getElementsByClassName("brunchSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("brunchSelector")[1]
			.style.display = "none";
		document.getElementsByClassName("dinnerSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("dinnerSelector")[1]
			.style.display = "none";
		document.getElementsByClassName("sweetsSelector")[0]
			.style.display = "block";
		document.getElementsByClassName("sweetsSelector")[1]
			.style.display = "block";
		document.getElementsByClassName("fermentsSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("fermentsSelector")[1]
			.style.display = "none";

		var optSelected = document.querySelector(".sweetsSelector option:checked").value;
		var chronicleSelected = 
			document.getElementsByClassName("imageSelected")[0];
		chronicleSelected.setAttribute("src", "Sweets/SweetsChronicles/"+ optSelected + ".jpg");
	}
	else if(activeCellNumber >= 21){
		document.getElementsByClassName("brunchSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("brunchSelector")[1]
			.style.display = "none";
		document.getElementsByClassName("dinnerSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("dinnerSelector")[1]
			.style.display = "none";
		document.getElementsByClassName("sweetsSelector")[0]
			.style.display = "none";
		document.getElementsByClassName("sweetsSelector")[1]
			.style.display = "none";
		document.getElementsByClassName("fermentsSelector")[0]
			.style.display = "block";
		document.getElementsByClassName("fermentsSelector")[1]
			.style.display = "block";

		var optSelected = document.querySelector(".fermentsSelector option:checked").value;
		var chronicleSelected = 
			document.getElementsByClassName("imageSelected")[0];
		chronicleSelected.setAttribute("src", "Ferments/FermentsChronicles/"+ optSelected + ".jpg");
	}
}