
import { useEffect, useState } from "react"
import "./ReviewList.css"

export const ReviewList = () => {
   
     const [reviews, setReviews] = useState([])
     
    
        
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
     const handleDeleteButton = (event, reviewId) => {
        fetch(`http://localhost:8088/reviews/${reviewId.id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            fetch(`http://localhost:8088/reviews?_expand=user`)
              .then((res) => res.json())
              .then((reviewsArray) => {
                setReviews(reviewsArray);
              });
          });
      };


     return <>

    <h2>List of Reviews</h2>

     <article className="reviews">
         {
             reviews.map(
                 (review) => {
                     return( <section className="review" key={`review--${review.id}`}>
                   <div className="reviewContainer"> <img className="image" src={review.image} />
                   <div className="review-text">User Submitted Review: {review.review}</div>
                 </div> <button
                onClick={(event) => handleDeleteButton(event, review.id)}
              >
                Delete
              </button>
                     </section>)
                 }
             )
         }
     </article>

     </>
    
} 
