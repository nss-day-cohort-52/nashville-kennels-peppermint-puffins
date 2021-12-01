import React, { useState, useEffect } from "react"
import {Employee} from "./Employee"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import "./EmployeeList.css"


export const EmployeeList = () => {
    const [emps, setEmployees] = useState([])

    useEffect(
        () => {
            EmployeeRepository.getAll().then(setEmployees)
        }, []
    )

    return (
        <>
            <div className="employees">
                {
                    emps.map(a => <Employee key={a.id} employee={a} setter={setEmployees} />)
                }
            </div>
        </>
    )
}
