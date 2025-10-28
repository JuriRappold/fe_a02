import Factory from "./factory.js";

const byID = (id) => document.getElementById(id);
const clear = (el) => el.textContent="";

//form elements
const form = byID("contact_form");
const formName = byID("form_name");
const formEmail = byID("form_email");
const formInfo = byID("info");
const checkbox = byID("form_check");
const formSubmit = byID("form_submit");
const errorInput = byID("error");
const checkMissing = byID("check_missing");


// validating inputs

//returns true if there are numbers, returns false if there are no numbers
//removed the g modifier, as it somehow interferes with the check
//https://stackoverflow.com/questions/13233654/javascript-regular-expression-is-working-fine-first-time-but-not-second-time-wo
const hasNumbers = /\d/; //works as intended

const hasAtSymbol = /@/; //works as intended
const hasPeriod = /\./; //works as intended

function checkNameNoNumbers(name){
    return !hasNumbers.test(name);
}

function checkEmail(email){
    return hasPeriod.test(email) && hasAtSymbol.test(email);
}




document.addEventListener("DOMContentLoaded", async () => {
    checkbox.checked = false;
    form.addEventListener("submit", (event) => {
        // prevent default submission
        event.preventDefault();
        checkMissing.innerText = "";
        if(checkbox.checked){
            errorInput.innerText = "";
            const name = formName.value
            const email = formEmail.value
            const info = formInfo.value
            console.log(email);
            if(checkNameNoNumbers(name)){
                if(checkEmail(email)){
                    console.log(Factory.form(name, email, info));
                }
                else{
                    errorInput.innerText = "Your email address needs an '@' and a '.' symbol."
                }
            }
            else{
                errorInput.innerText = "Your Name can't have numbers."
            }
        } else{
            checkMissing.innerText = "Please check the Checkbox next to the submit button to submit your Form."
        }


    })
    checkbox.onclick = () => {
        if(checkbox.checked){
            formSubmit.classList.add("checked");
            checkMissing.innerText = "";
        }
        else {
            formSubmit.classList.remove("checked")
        }

        //formSubmit.disabled = false
    }
})