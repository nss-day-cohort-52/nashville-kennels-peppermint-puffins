import React from "react"
import { useLocation } from "react-router-dom";
import { Animal } from "../animals/Animal";
import { Employee } from "../employees/Employee";
import Location from "../locations/Location";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./SearchResults.css"


export default () => { 
    const location = useLocation()
    const { getCurrentUser } = useSimpleAuth() // imported this so we can get access to only the user that is logged in
    
    const displayAnimals = () => {
        if (location.state?.animals.length && getCurrentUser().employee) { // if the animals array that is in the state is not 0 and the current user is an employee then they can return a search for an animal.
            return (
                <React.Fragment>
                    <h2>Matching Animals</h2>
                    <section className="animals">
                        {location.state.animals.map(animal =><Animal key={`animal--${animal.id}`} animal={animal} // this will display the animal card after mapping through the animals array and finding the animal searched
                        // the Animal key above is a component from the animal list module that grabs a specific animal object
                        />)} 
                    </section>
                </React.Fragment>
            )
        }
    }

    const displayEmployees = () => {
        if (location.state?.employees.length) { // the Employee key below is a component from the employee list module that grabs a specific employee object
            return (
                <React.Fragment>
                    <h2>Matching Employees</h2>
                    <section className="employees"> 
                        {location.state.employees.map(employee =><Employee key={employee.id} employee={employee} />)} 
                    </section> 
                </React.Fragment>
            )
        }
    }

    const displayLocations = () => {
        if (location.state?.locations.length) { // the Location key below is a component from the Location list module that grabs a specific Location object
            return (
                <React.Fragment>
                    <h2>Matching Locations</h2>
                    <section className="locations">
                        {location.state.locations.map(location =><Location key={location.id} location={location} />)}
                    </section>
                </React.Fragment>
            )
        }
    }
        // below is where the display functions are invoked for the search results
    return (
        <React.Fragment>
            <article className="searchResults">
                {displayAnimals()}
                {displayEmployees()}
                {displayLocations()}
            </article>
        </React.Fragment>
    )
}
