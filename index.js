// 
/* 
    Object (type,description,value)
        incomeObject = (description, value)
        expenseObject = (description,value)
        if type = "+"
            this.income(description,value);
            else if type === "-"
                this.expense(description,value)

        getTotalIncome(income) => this.income + income
        getTotalExpense(expense) => this.expense + expense
        getTotalAmount(totalIncome,totalExpense) => totalIncome - totalExpense
        addToList / addToIncome/ addToExpense => append the list : description and value
        removeFromList => remove item

    -----close object

    Event Listener

    a. + 
        STORE id choice
        STORE id description-input
        STORE id value-input

        if choice = "+"
            STORE in INCOME OBJECT
            CALL object.totalIncome
                else if choice = "-"
                    STORE in EXPENSE OBJECT
                    CALL object.totalExpense
        end if

          CALL object getTotalAmount
            CALL addToList
    b. delete
        CALL removeFromList()
*/

// constructor function

// getTotalIncome(income) => this.income + income
// getTotalExpense(expense) => this.expense + expense
// getTotalAmount(totalIncome,totalExpense) => totalIncome - totalExpense
// addToList / addToIncome/ addToExpense => append the list : description and value
// removeFromList => remove item

// IF newitem vartype = 20334
        // turn to toInteger
        // turn to currency to output
        // ELSE  if remove item vartype = $2,000.00
        //     turn to integer 

    
var budgetApp = function(type,description,value) {
    this.value = parseFloat(value);
    var income = document.getElementById('income-amount');
    var expenses = document.getElementById('expenses-amount');
    var total = document.getElementById('total-amount');
    
    
    budgetApp.prototype.appendApp = function(cb) {
        //converts all to integer
        income.innerHTML = this.toInteger(income.innerHTML)
        expenses.innerHTML = this.toInteger(expenses.innerHTML)
        total.innerHTML = this.toInteger(total.innerHTML)
        //checks function required
        if (cb === "getTotalIncome") {
            console.log('get income')
            this.getTotalIncome()

        } else if (cb === "removeFromList"){
            console.log('remove')
            this.removeFromList()
        }
        //converts all to integer
        income.innerHTML = this.toCurrency(income.innerHTML)
        expenses.innerHTML = this.toCurrency(expenses.innerHTML)
        total.innerHTML = this.toCurrency(total.innerHTML)
    }

    budgetApp.prototype.toCurrency = function(x) {
       var num =  new Intl.NumberFormat('en-US', {
            style:'currency',
            currency:'USD'
          }); 
          return num.format(x)
    }

    budgetApp.prototype.toInteger = function(num) {
        return parseFloat((num).replace(/[^0-9.-]+/g,""));
    }

    // -------------------------------------------------------------------------------------
    //                              GET TOTAL INCOME FUNCTION        
    // -------------------------------------------------------------------------------------

    budgetApp.prototype.getTotalIncome = function() {
        let newElement =  `<li> <p>${description}</p> <p>${this.toCurrency(value)}</p> <div class = "delete-button">⌫</div> </li>`     //newElement Format
        let status = ''

        if (type === "+") {
          income.innerHTML = parseFloat(income.innerHTML) + this.value;        //TAKE TOTAL EXPENSES
          status = `income`;

        } else if (type === "-") {
          expenses.innerHTML = parseFloat(expenses.innerHTML) + this.value;     //TAKES IN TOTAL EXPENSES
          status = `expenses`;
        }

        document.getElementById(`${status}-list`).insertAdjacentHTML('beforeend', newElement ); //ADD ELEMENT TO END
        total.innerHTML = income.innerHTML - expenses.innerHTML;                               // GET TOTAL MONEY
      }

    // -------------------------------------------------------------------------------------
    //                              REMOVE FROM LIST FUNCTION       
    // -------------------------------------------------------------------------------------

    budgetApp.prototype.removeFromList = function() {
        var currentItem = document.getElementById('delete');
        var currentAmount = parseFloat(currentItem.children[1].innerHTML);
        var parentID = currentItem.parentElement.id;

        if (parentID  === "income-list"){                                       //ADJUST TOTAL INCOME
            income.innerHTML = parseFloat(income.innerHTML) - currentAmount;
        } else if (parentID === "expenses-list"){                               //ADJUST TOTAL EXPENSES
            expenses.innerHTML = parseFloat(expenses.innerHTML) - currentAmount;
        }

        total.innerHTML = (income.innerHTML - expenses.innerHTML);             //ADJUST TOTAL MONEY
        currentItem.remove();                                                   //REMOVE ELEMENT
    }
    
}
    // -------------------------------------------------------------------------------------
    //                              MAIN
    // -------------------------------------------------------------------------------------
let budgetInput = null; 

document.addEventListener('click', e => {
    
    var type = document.getElementById('choice').value;                          // INPUT : TYPE, DESCRIPTION AND VALUE
    var description = document.getElementById('description-input').value;
    var value = document.getElementById('value-input').value;

    const button = e.target.className;                                         // INPUT: BUTTON

    if (button === 'delete-button'){
        e.target.parentElement.id = 'delete';
        budgetInput.appendApp('removeFromList')
    } else if (button === 'submit-button'){

        if (value === '' || description ===''){                         // CHECKS WHETHER IT'S EMPTY
            alert("Please enter a value");
        } else {
            budgetInput = new budgetApp(type,description,value);
            budgetInput.appendApp('getTotalIncome')
        }
    }
}
)