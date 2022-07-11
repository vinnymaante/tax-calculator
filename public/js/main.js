(function() {

    //global variables
    let getStarted = document.querySelector("#start");
    let check_month = document.querySelector("#month");
    let check_year = document.querySelector("#year");
    let y_NSSF = document.querySelector("#yes-nssf");
    let n_NSSF = document.querySelector("#no-nssf");
    let y_NHIF = document.querySelector("#yes-nhif");
    let n_NHIF = document.querySelector("#no-nhif");
    let new_rates = document.querySelector("#new-rates");
    let old_rates = document.querySelector("#old-rates")
    let b_input = document.querySelector("#benefits-input");
    let s_input = document.querySelector("#salary-input");
    let calc_btn = document.querySelector(".calc-btn");

    let period = document.getElementsByName('period');
   
    //events
    window.addEventListener('DOMContentLoaded', () => {
        console.log("Loaded js");
        console.log(b_input);
        console.log(s_input);
        console.log(check_month);
        console.log(check_year);

        //variables
        let salary;
        let benefits;
        let deduct_nssf;
        let deduct_nhif;
        let monthly;
        let isNewRates;

        document.querySelectorAll("input[type=text]").forEach((input, i) => {
            console.log(input)
            input.addEventListener('change', () => {
                if (i === 0){
                    salary = parseInt(input.value);
                    console.log(salary)
                }

                if(i === 1){
                    benefits = parseInt(input.value);
                    console.log(benefits)
                }
            })
        })
        
        //handler for checkboxes
        y_NHIF.addEventListener('change', function(){
            if(this.checked){
                deduct_nhif = true;
            }
        })

        n_NHIF.addEventListener('change', function () {
            if (this.checked) {
                deduct_nhif = false;
            }
        })

        y_NSSF.addEventListener('change', function () {
            if (this.checked) {
                deduct_nssf = true;
            }
        })

        n_NSSF.addEventListener('change', function () {
            if (this.checked) {
                deduct_nssf = false;
            }
        })

        new_rates.addEventListener('change', function () {
            if (this.checked) {
                isNewRates = true;
            }
        });

        old_rates.addEventListener('change', function () {
            if (this.checked) {
                isNewRates = false;
            }
        });
        
        check_month.addEventListener('change', function () {
            if (this.checked) {
                monthly = true;
            }
        });

        check_year.addEventListener('change', function () {
            if (this.checked) {
                monthly = false;
            }
        });

        //total income
        const totalIncome = () => {
            let total = 0;
            //check if value is null or less than zero
            if (salary !== null && benefits !== null) {
                if (salary >= 0 && benefits >= 0) {
                    total += salary + benefits;
                }
            }
            document.querySelector(".val1").textContent = total;
            //console.log(`Total income: ${total}`); //dom output 1
            return total;
        }

        //deduct NSSF/////////
        const deductNSSF = () => {
            let deduction = 0;
            if (deduct_nssf) { //true
                //perform deduction operation
                deduction += nssfDeduction();
                //console.log(`NSSF amount: ${deduction}`) //dom output 2

            } else {
                //set NSSF deduction to zero
                deduction = 0; //flag
                //console.log(`NSSF not deducted: ${deduction}`) //dom output 2
            }

            document.querySelector(".val2").textContent = deduction;
            return deduction;
        }

        //deduct NSSF//////
        const deductNHIF = () => {
            let deduction = 0;
            if (deduct_nhif) { //true
                //perform deduction operation
                deduction += nhifDeduction();

                //console.log(`NHIF amount: ${deduction}`) //dom output 11
            } else {
                //set NSSF deduction to zero
                deduction = 0;
                //console.log(`NHIF not deducted: ${deduction}`) //dom output 11
            }

            document.querySelector(".val11").textContent = deduction;
            return deduction;
        }

        ///////////////////////////////////////////////////////////////////
        //not sending output to dom
        const nssfDeduction = () => {
            let salary = totalIncome();
            let nssfAmount = 0;

            if (isNewRates) {//new rates
                if (salary > 18000) { //when pensionable salary > 18000 deuct flat rate = 2160
                    nssfAmount += 2160;
                } else {
                    nssfAmount += salary * 0.12;
                }
            } else { //old rates
                nssfAmount += 200;
            }

            return nssfAmount;
        }

        const nhifDeduction = () => {
            let salary = totalIncome();
            let nhifAmount = 0;

            if (salary >= 1000) {

                if (salary >= 1000 && salary <= 5999) {
                    nhifAmount += 150;
                } else if (salary >= 6000 && salary <= 7999) {
                    nhifAmount += 300;
                } else if (salary >= 8000 && salary <= 11999) {
                    nhifAmount += 400;
                } else if (salary >= 12000 && salary <= 14999) {
                    nhifAmount += 500;
                } else if (salary >= 15000 && salary <= 19999) {
                    nhifAmount += 600;
                } else if (salary >= 20000 && salary <= 24999) {
                    nhifAmount += 750;
                } else if (salary >= 25000 && salary <= 29999) {
                    nhifAmount += 850;
                } else if (salary >= 30000 && salary <= 34999) {
                    nhifAmount += 900;
                } else if (salary >= 35000 && salary <= 39999) {
                    nhifAmount += 950;
                } else if (salary >= 40000 && salary <= 44999) {
                    nhifAmount += 1000;
                } else if (salary >= 45000 && salary <= 49999) {
                    nhifAmount += 1100;
                } else if (salary >= 50000 && salary <= 59999) {
                    nhifAmount += 1200;
                } else if (salary >= 60000 && salary <= 69999) {
                    nhifAmount += 1300;
                } else if (salary >= 70000 && salary <= 79999) {
                    nhifAmount += 1400;
                } else if (salary >= 80000 && salary <= 89999) {
                    nhifAmount += 1500;
                } else if (salary >= 90000 && salary <= 99999) {
                    nhifAmount += 1600;
                } else if (salary >= 100000) {
                    nhifAmount += 1700;
                }

            } else {
                nhifAmount += 0;
            }

            return nhifAmount;
        }

        const getIncomeAfterPension = () => {
            let newIncome = totalIncome() - deductNSSF();

            document.querySelector(".val3").textContent = newIncome;
            return newIncome;
        }

        const getBenefitsInKind = () => {
            if (benefits !== null && benefits > 0) {
                document.querySelector(".val4").textContent = benefits;

            } else {
                document.querySelector(".val4").textContent = 0;
            }
        }

        const getTaxableIncome = () => {
            let taxableIncome = totalIncome() - deductNSSF();
            document.querySelector(".val5").textContent = taxableIncome;
            return taxableIncome;
        }

        const getTaxOnTaxableIncome = () => {

            let income = totalIncome();
            let amount = 0;
            if (income <= 12, 298) {
                amount += income * 0.1;
            } else if (income >= 12999 && income <= 23885) {
                amount += income * 0.15;
            } else if (income >= 23886 && income <= 35472) {
                amount += income * 0.2;
            } else if (income >= 35473 && income <= 47059) {
                amount += income * 0.25;
            } else if (income > 47059) {
                amount += income * 0.3;
            }

            document.querySelector(".val6").textContent = amount;
            return amount;
        }

        const getPersonalRelief = () => {
            let relief = 0;

            if (monthly) {
                relief += 2400;
            } else {
                relief += 28800;
            }
            document.querySelector(".val7").textContent = relief;
            return relief;
        }

        const getTaxOffRelief = () => {
            let amount = getTaxOnTaxableIncome() - getPersonalRelief();
            document.querySelector(".val8").textContent = amount;
            return amount;
        }

        const getPAYE = () => {
            let amount = getTaxOnTaxableIncome() - getPersonalRelief();
            document.querySelector(".val9").textContent = amount;
            return amount;
        }

        const getChargeableIncome = () => {
            let amount = totalIncome() - deductNSSF();
            document.querySelector(".val10").textContent = amount;
            return amount;
        }

        const getNetPay = () => {
            let paye = getPAYE();
            let nhif = deductNHIF()
            let relief = getPersonalRelief();
            let nssf = deductNSSF()
            let totalAmount = totalIncome();

            let pay = totalAmount - (paye + nhif + relief + nssf);
            document.querySelector(".val12").textContent = pay;
            return pay;
        }

        const calculate = () => {
            //invoke all methods
            totalIncome();
            deductNSSF();
            getIncomeAfterPension()
            getBenefitsInKind();
            getTaxableIncome();
            getTaxOnTaxableIncome()
            getPersonalRelief();
            getTaxOffRelief();
            getPAYE();
            getChargeableIncome();
            deductNHIF();
            getNetPay();
        }

 
    
        calc_btn.addEventListener('click', () => {
            console.log("starting calculation")
            console.log(salary)
            console.log(benefits)
            calculate();
        });


        getStarted.addEventListener('click', () => {
            document.querySelector(".info").style.display = 'block';
        });
        
    });
    
})();