/*
    lsof -i :3505
    kill -9 96821


*/

import { useQuery } from '@apollo/client'
import { MULT } from '../utils/GQL'

export default function Mult() {

    const { data, error, loading } = useQuery(MULT, { variables: {x: 5, y: 10}})
    // const [ addUser, { error, loading, data }] = useMutation(ADD_USER)
    /*
        useQuery returns an object with { error, loading, data }
        useMutation returns an array with [ a funciton, { error, loading, data }]

        Why are they different?
            when you call useQuery, it makes the request immediately
            when you call useMutation, it gives you the function so you can make the request exactly when you want to
    */

    if (error) {
        console.log("Error multiplying")
        console.log(error)
        // Apollo will give you error 400 if there was something wrong with your query!
        // 500 if there is something wrong on the server side
    } else {
        console.log(data)
    }

    return (
        <>
            <button>
                5 by 2 is: 
            </button>
        </>
    )
}