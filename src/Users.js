import React, { useContext } from 'react';
import usersContext from './contexts/usersContext'

const Users = () => {
    const users = useContext(usersContext)
    console.log(users)
    return (
        <div>
            {users.map(user => (
                <>
                <p>{user.first_name}</p>
                <p>{user.email}</p>
                </>
            ))}
        </div>
    )
}

export default Users;