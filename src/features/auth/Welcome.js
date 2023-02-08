import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentToken } from "./authSlice"
import { Link } from "react-router-dom"

const Welcome = () => {
    // const AdminEmail = useSelector(selectCurrentUser)
    // const JwtKeyz = useSelector(selectCurrentToken)
    // console.log(token)
    // console.log(user)

    // const welcome = user ? `Welcome ${user}!` : 'Welcome!'
    // const tokenAbbr = `${token.slice(0, 9)}...`

    // const content = (
    //     <section className="welcome">
    //         {/* <h1>{welcome}</h1>
    //         <p>Token: {tokenAbbr}</p>
    //         <p><Link to="/userslist">Go to the Users List</Link></p> */}
    //         <h1>Hello,Welcome to....</h1>
    //     </section>
    // )

    // return content
    return (
        <h1>
            Welcome to Dashboard
        </h1>
    )

   
}
export default Welcome