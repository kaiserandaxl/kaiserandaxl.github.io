import { Menu } from "./Menu.js"

const APR = 4;
const SumLabel = document.getElementById("Total");
const ChangeLabel = document.getElementById("Change");
const CalcLabel = document.getElementById("Calculator");
const History = document.getElementById("History")

var Total = 0;
var AmountGiven = 0;
var Register = {};
var LastSelected = null;

const UpdateTotals = function() {
    if (Number.isInteger(Total)) {
        SumLabel.innerHTML = `$${Total}.00`
    } else {
        SumLabel.innerHTML = `$${Total}0`
    }

    ChangeLabel.innerHTML = "$0.00"

    if (AmountGiven > 0) {
        var Diff = AmountGiven-Total
    
        if (Number.isInteger(Diff)) {
            ChangeLabel.innerHTML = `$${Diff}.00`
        } else {
            ChangeLabel.innerHTML = `$${Diff}0`
        }
    }
}

const NewHistory = function(Text, Price) {
    const Button = document.createElement('button');

    Button.innerHTML = Text
    History.appendChild(Button)

    Button.onclick = function() {
        Total -= Number(Price)
        UpdateTotals()

        History.removeChild(Button)
    }
}

Register.Init = function() {
    var i = 0;

    for (const [Item, Data] of Object.entries(Menu)) {
        const Button = document.createElement('button');

        Button.innerHTML = `${Data.Name}</br>$${Data.Price}.00`;
        Button.className = "MenuItem";
        Button.id = Data.UID;
        Button.setAttribute("Price", Data.Price);
        Button.setAttribute("Name", Data.Name)

        Button.style.left = (175*(i%APR))+(i%APR*5)+9
        Button.style.top = (100*(Math.floor(i/APR)))+(Math.floor(i/APR)*5)+9
        //Button.style.backgroundColor = Data.Color

        document.body.appendChild(Button);

        Button.onclick = function() {
            Total += Number(Button.getAttribute("Price"));
            LastSelected = Button

            NewHistory(`+ ${Button.getAttribute("Name")}`, Button.getAttribute("Price"))
            UpdateTotals();
        }
        
        i += 1
    }

    document.getElementById("Cheese").innerHTML = `Cheese</br>50¢`
    document.getElementById("Cheese").setAttribute("Price",0.50)

    const Filled = ((APR*Math.ceil(i/APR)-1)-(i-1))

    for (let b = 1; b <= Filled; b++) {
        const Button = document.createElement('button');

        Button.innerHTML = `${b+1}x`;
        Button.className = "MenuItem";

        Button.style.left = (175*(i%APR))+(i%APR*5)+9
        Button.style.top = (100*(Math.floor(i/APR)))+(Math.floor(i/APR)*5)+9

        document.body.appendChild(Button);

        Button.onclick = function() {
            if (LastSelected) {
                for (let t = 1; t <= b; t++) {
                    Total += Number(LastSelected.getAttribute("Price"));
                    LastSelected = null

                    NewHistory(`+ ${LastSelected.getAttribute("Name")}`, LastSelected.getAttribute("Price"))
                    UpdateTotals();
                }
            }
        }

        i += 1
    }

    for (const button of document.getElementsByName("CalcButton")) {
        button.onclick = function() {
            AmountGiven += Number(button.innerHTML)
            CalcLabel.innerHTML = AmountGiven

            UpdateTotals()
        }
    }

    document.getElementById("Clear").onclick = function() {
        Total = 0;
        AmountGiven = 0;
        CalcLabel.innerHTML = 0;
        History.innerHTML = null;
        LastSelected = null;
        UpdateTotals();
    }
}

Register.Init();