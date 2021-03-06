import React, { useState, useEffect, useImperativeHandle } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import person from "./person.png"
import "./Employee.css"
import { EmployeeForm } from "./EmployeeForm";
import AnimalRepository from "../../repositories/AnimalRepository"

export const Employee = ({ employee, setter }) => {
    const [animalCount, setCount] = useState(0)
    const [location, markLocation] = useState({ name: "" })
    const [classes, defineClasses] = useState("card employee")
    const { employeeId } = useParams()
    const { getCurrentUser } = useSimpleAuth()
    const { resolveResource, resource } = useResourceResolver()
    const history = useHistory()

    useEffect(() => {
        if (employeeId) {
            defineClasses("card employee--single")
        }
        resolveResource(employee, employeeId, EmployeeRepository.get) //(property, param, getter function)
    }, [])

    useEffect(() => {
        if (resource?.employeeLocations?.length > 0) {
            markLocation(resource.employeeLocations[0])
        }
    }, [resource])

    useEffect(() => { // a use effect to get the animals that each employee is taking care of from the emp repository
        if (!("animals" in resource) ) {
            EmployeeRepository.getAnimals(resource.id) // created getAnimals in Emp Repository
            .then((animalArray) => { 
                setCount(animalArray.length)
            })
        }
    }, [resource])

    return (
        <article className={classes}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    {
                        employeeId
                            ? resource.name
                            : <Link className="card-link"
                                to={{
                                    pathname: `/employees/${resource.id}`,
                                    state: { employee: resource }
                                }}>
                                {resource.name}
                            </Link>       
                    }
                </h5>
                
                {
                    employeeId //ternary statement and param to be passed through resource to access employees
                        ? <>
                            <section>
                                Caring for {resource?.animals?.length} animals 
                            </section>
                            <section>
                                Working at {resource?.locations?.map(//mapped through to pull out object in array to access property of 'name'
                                   (location) => { 
                                      return  location.location.name  //location is an array and also an object in that array
                                   }
                                ).join(", ")}
                            </section>
                        </>
                        : <div>
                        Taking care of {animalCount} animals
                    </div>
                }
                {
                    getCurrentUser().employee //get current signed in user and if employee key is true then show 
                    // fire button
                    ? //another ternary statement for the fire button
                    <button className="btn--fireEmployee" onClick={() => {
                        
                        EmployeeRepository.delete(resource.id ) //fetch call to delete employee when fire button is clicked
                        .then(() => EmployeeRepository.getAll().then(setter))//setter function to give this module access to employees that are set in different module
                        .then(()=> history.push("/employees"))//this takes user back to employees page after firing from profile
                        
                    }}>Fire</button>
                    : "" //else show nothing if user is not an employee
        }
            </section>

        </article>
    )
}
