const Menu = {
    HamburgerBasket: {
        Price: 8,
        Name: "Hamburger Basket",
        UID: "HB"
    },

    HotDogBasket: {
        Price: 7,
        Name: "Hot Dog Basket",
        UID: "HDB"
    },

    NachoBoth: {
        Price: 5,
        Name: "Nachos Cheese & Chili",
        UID: "NB"
    },

    NachoOne: {
        Price: 4,
        Name: "Nachos Cheese or Chili",
        UID: "NO"
    },

    Hamburger: {
        Price: 5,
        Name: "Hamburger",
        UID: "Ham"
    },

    HotDogTop: {
        Price: 5,
        Name: "Hotdog Cheese &/or Chili",
        UID: "HDT"
    },

    HotDog: {
        Price: 4,
        Name: "Hotdog Plain",
        UID: "HD"
    },

    FritoPie: {
        Price: 5,
        Name: "Frito Chili Pie",
        UID: "FCP"
    },

    Candy: {
        Price: 2,
        Name: "Candy",
        UID: "Candy"
    },

    Chips: {
        Price: 2,
        Name: "Chips",
        UID: "Chips"
    },

    SodaGaterade: {
        Price: 2,
        Name: "Soda/Gatorade",
        UID: "SG"
    },

    Pickle: {
        Price: 1,
        Name: "Pickle",
        UID: "Pickle"
    },

    Water: {
        Price: 1,
        Name: "Water",
        UID: "Water"
    },

    HotCocoa: {
        Price: 1,
        Name: "Hot Cocoa",
        UID: "HC"
    },

    Coffee: {
        Price: 1,
        Name: "Coffee",
        UID: "Coffee"
    },

    Popcorn: {
        Price: 1,
        Name: "Popcorn",
        UID: "Popcorn"
    },

    Cheese: {
        Price: 1,
        Name: "Cheese",
        UID: "Cheese"
    }
};

const APR = 4;
const SumLabel = document.getElementById("Total");
const ChangeLabel = document.getElementById("Change");
const CalcLabel = document.getElementById("Calculator");
const History = document.getElementById("History")

var Total = 0;
var AmountGiven = 0;
var Register = {};

const UpdateTotals = function() {
    if (AmountGiven > 0) {
        var Diff = AmountGiven-Total

        if (Number.isInteger(Total)) {
            SumLabel.innerHTML = `$${Total}.00`
        } else {
            SumLabel.innerHTML = `$${Total}0`
        }

        if (Number.isInteger(Diff)) {
            ChangeLabel.innerHTML = `$${Diff}.00`
        } else {
            ChangeLabel.innerHTML = `$${Diff}0`
        }
    } else {
        if (Number.isInteger(Total)) {
            SumLabel.innerHTML = `$${Total}.00`
        } else {
            SumLabel.innerHTML = `$${Total}0`
        }

        ChangeLabel.innerHTML = "$0.00"
    }
}

Register.Init = function() {
    var i = 0;
    var UIDS = {};

    for (const [Item, Data] of Object.entries(Menu)) {
        const Button = document.createElement('button');

        Button.innerHTML = `${Data.Name}</br>$${Data.Price}.00`;
        Button.className = "MenuItem";
        Button.id = Data.UID;
        Button.setAttribute("Price", Data.Price);
        Button.setAttribute("Name", Data.Name)

        Button.style.left = (175*(i%APR))+(i%APR*5)+9
        Button.style.top = (100*(Math.floor(i/APR)))+(Math.floor(i/APR)*5)+9

        document.body.appendChild(Button);

        UIDS[i] = Data.UID
        i += 1
    }

    document.getElementById("Cheese").innerHTML = `Cheese</br>50¢`
    document.getElementById("Cheese").setAttribute("Price",0.50)

    for (const [index, UID] of Object.entries(UIDS)) {
        const Button = document.getElementById(UID)

        const Clicked = function() {
            Total += Number(Button.getAttribute("Price"));

            History.innerHTML += `+ ${Button.getAttribute("Name")}</br>`

            UpdateTotals();
        }

        Button.onclick = Clicked
    }

    for (const button of document.getElementsByName("CalcButton")) {
        const clicked = function() {
            AmountGiven += Number(button.innerHTML)
            CalcLabel.innerHTML = AmountGiven

            UpdateTotals()
        }

        button.onclick = clicked
    }

    {
        const Clear = function() {
            Total = 0;
            AmountGiven = 0;
            CalcLabel.innerHTML = 0;
            History.innerHTML = "";+
            UpdateTotals()
        }

        document.getElementById("Clear").onclick = Clear
    }
}

Register.Init();
