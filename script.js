const button = document.getElementById("enter");		//get the 'enter' button by ID
const input = document.getElementById("userinput");	// get the input text field by ID
let   ul = document.querySelector("ul");				// use of new ES5 Syntax to get HTML DOM ELEMENT
const bunchOfLi= document.querySelectorAll("li");		// use of new ES5 Syntax to get a Nodelist 


const inputLength = () => {
	//returns the count of characters from the input text field
	return input.value.length;
}

// create to new todo task
const createListElement = () => {
	let li = document.createElement("li");	//create the List element
	let span = document.createElement("span"); // create a span for text, otherwise the button text get crossed too

	span.appendChild(document.createTextNode(input.value)); // create the text from input field and append it to 'safty-span'
	li.classList.add("list-group-item", "d-flex", "justify-content-between"); // do some bootstrap magic

	li.appendChild(span)	//append the span which holds the text
	  .parentElement		//move up to the li again. Otherwise the button is nested inside the span too
	  .appendChild(addDeleteButton(li));	// append the delete Button to

	ul.appendChild(li);	// append the new LI element which holds the span and the delete button to UL element
	input.value = "";	// delete everthing from input text field
}

//handle click on 'enter'-Button
const addListAfterClick = () => {
	//checks if the input isn't empty
	if (inputLength() > 0) {
		createListElement();
	}
}

//handle keypress on KEY: ENTER(keycode:13)
const addListAfterKeypress =(event) => {
	//checks if the input isn't empty and 'Enter' was pressed
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

const workWithLi = (event) => {
	const childTarget= event.target;	//contains the target which one was clicked
										// follows the path from existing ul
	
	//if the SPAN element within the ul was clicked
	if(childTarget.nodeName === 'SPAN'){
		childTarget.classList.toggle('done');
	}

	//if the BUTTON element within the ul->li was clicked
	if(childTarget.nodeName === 'BUTTON'){
		childTarget			//PATH starts at Button
			.parentElement	//move up to parent LI
			.parentElement	//move up to parent UL
			.removeChild(childTarget.parentElement); //remove the Child of UL which is the parent of the button
	}												 
}

const addDeleteButton= (li) =>{
		var delBtn= document.createElement("button");			//create the Element
		delBtn.appendChild(document.createTextNode("Delete"));	//create the text node and then apppend it to the elemt
		delBtn.classList.add("btn","btn-danger");				// does Bootstrap magic with classes

		return delBtn;
}

//adding Delete Buttons for existing elements
bunchOfLi.forEach((li, i) => {
		li.appendChild(addDeleteButton(li));
});

//add Event Listener to the enter button
button.addEventListener("click", addListAfterClick);
//add Event Listener to Keyboard. Only executed if something is typed in the input field and the curser is still active there
input.addEventListener("keypress", addListAfterKeypress);
//add Event Listener to UL element which holds all the tasks 
ul.addEventListener("click", workWithLi);
