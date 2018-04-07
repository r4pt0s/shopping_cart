var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var bunchOfLi= document.querySelectorAll("li");

function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	li.classList.add("list-group-item", "d-flex", "justify-content-between");
	li.appendChild(addDeleteButton(li));


	ul.appendChild(li);
	input.value = "";

}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

bunchOfLi.forEach(function(li, i){
		li.addEventListener("click", function(e){
			li.classList.toggle('done');
		});
		li.appendChild(addDeleteButton(li));

	});

function addDeleteButton(li){

		var delBtn= document.createElement("button");
		delBtn.appendChild(document.createTextNode("Delete"));
		delBtn.classList.add("btn","btn-danger");

		delBtn.addEventListener("click", function(e){

			this.parentElement.parentElement.removeChild(li);
			//or
            //e.target.parentElement.parentElement.removeChild(li);
		});

		return delBtn;
}