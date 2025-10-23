

    let myLeads = []
    const inputEl = document.getElementById("input-el")
    const inputbtn = document.getElementById("input-btn")
    const ulEl = document.getElementById("ul-el")
    const deletebtn = document.getElementById("delete-btn")
    const tabbtn = document.getElementById("tab-btn")

    const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

    if (leadsFromLocalStorage){
        myLeads = leadsFromLocalStorage
        render(myLeads)

    } 

    tabbtn.addEventListener("click", function(){
        //grab the url of the current tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ //using chrome API to get the current tab in our extension
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })
        
    })

    function render(leads) {

        let listItems = ""

        for (let i = 0; i < leads.length; i++) {
            //templete string 
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'> 
                        ${leads[i]} 
                    </a>
                </li>`
            
        }

        ulEl.innerHTML = listItems
    }

    deletebtn.addEventListener('dblclick', function(){
        localStorage.clear()
        myLeads = []
        render(myLeads)
    })

    //This function will be envoked when input button is clicked
    inputbtn.addEventListener("click", function () {
        myLeads.push(inputEl.value) //pushing links in an array with .value
        inputEl.value = ""
        
        //JSON.stringify() converts an array into a string
        //JSON.parse() converts a string back to an array
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) //We are doing this because localstorage only supports strings
        render(myLeads)

    })

