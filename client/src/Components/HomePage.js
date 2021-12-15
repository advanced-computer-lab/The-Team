import React from 'react'
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div>
            <h1>Welcome to the home page</h1>
            <br/>
                          <Link to="/home/adminpanel" className="btn btn-outline-warning float-left">
                          Admin log in
                      </Link>
        </div>

    )
}