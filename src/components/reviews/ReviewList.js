
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ReviewList.css"

export const ReviewList = () => {
   
     const [reviews, setReviews] = useState([])
     const navigate = useNavigate()

    
     const localSiteUser = localStorage.getItem("site_user")
     const userObject = JSON.parse(localSiteUser)
 
        

     useEffect(
        () => {
            fetch('http://localhost:8088/reviews')
            .then(response => response.json())
            .then((reviewsArray) => {
                setReviews(reviewsArray)
            }) 

            },
            []
     )

/* const handleDelete = () => {
    fetch(`http://localhost:8088/reviews/${review.id}`, {
        method: "DELETE",
    })
    .then (() => {
        const updatedReviews = reviewsArray.filter(review => review.id !== reviewId)
        setReviews(updatedReviews)
    } )
} */

 const handleDelete = (event, reviewId) => {
    fetch(`http://localhost:8088/reviews/${reviewId}`, {
        method: "DELETE",
    })
    .then((res) => res.json())
    .then(() => {
        fetch(`http://localhost:8088/reviews`)
        .then((res) => res.json())
        .then((reviewsArray) => {
            setReviews(reviewsArray)
        })
    })
} 

     return <>

    <h2>List of Reviews</h2>

     <article className="reviews">
         {
             reviews.map(
                 (review) => {
                     return( <section className="review" key={`review--${review.id}`}>
                   <div className="reviewContainer"> <img className="image" src={review.image} />
                   <div className="review-text">User Submitted Review: {review.review}</div>
                 </div><button
                 onClick={(event) => handleDelete(event,review.id)}>Delete</button>
                     </section>)
                 }
             )
         }
     </article>

     </>
    
} 
